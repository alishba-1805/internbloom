import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InternshipCard from "@/components/InternshipCard";
import SectionHeading from "@/components/SectionHeading";
import { companies } from "@/data/companies";
import { internships } from "@/data/internships";

interface CompanyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  const { id } = await params;
  const company = companies.find((item) => item.id === id);

  if (!company) {
    return {
      title: "Company not found",
      description: "This company does not exist on InternBloom.",
    };
  }

  return {
    title: company.name,
    description: company.description,
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = await params;
  const company = companies.find((item) => item.id === id);

  if (!company) {
    notFound();
  }

  const openRoles = internships.filter(
    (internship) => internship.companyId === company.id,
  );

  return (
    <>
      <div className="border-b border-line bg-white">
        <div className="container-page py-8 md:py-12">
          <Link
            href="/companies"
            className="inline-block py-2 text-sm font-semibold text-leaf hover:underline"
          >
            ← All companies
          </Link>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={80}
              height={80}
              loading="eager"
              className="rounded-2xl"
            />
            <div>
              <h1 className="font-display text-3xl text-forest md:text-4xl">
                {company.name}
              </h1>
              <p className="text-muted">
                {company.industry} · {company.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-5 pt-8 md:grid-cols-2">
        <section className="card">
          <h2 className="font-display text-2xl text-forest">About</h2>
          <p className="mt-2 leading-7">{company.description}</p>
        </section>
        <section className="card">
          <h2 className="font-display text-2xl text-forest">
            Working environment
          </h2>
          <p className="mt-2 leading-7">{company.culture}</p>
        </section>
      </div>

      <section className="container-page pt-14">
        <SectionHeading
          title="Student internship opportunities"
          description={`${openRoles.length} available at ${company.name}.`}
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {openRoles.map((internship) => (
            <li key={internship.id}>
              <InternshipCard internship={internship} company={company} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
