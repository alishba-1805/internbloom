import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FieldBadge from "@/components/FieldBadge";
import InternshipCard from "@/components/InternshipCard";
import SectionHeading from "@/components/SectionHeading";
import { companies } from "@/data/companies";
import { internships } from "@/data/internships";
import { formatDate, formatStipend } from "@/lib/format";

interface InternshipPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: InternshipPageProps): Promise<Metadata> {
  const { id } = await params;
  const internship = internships.find((item) => item.id === id);

  if (!internship) {
    return {
      title: "Internship not found",
      description: "This internship does not exist on InternBloom.",
    };
  }

  const company = companies.find((item) => item.id === internship.companyId);

  return {
    title: `${internship.title} at ${company?.name}`,
    description: internship.description,
  };
}

export default async function InternshipPage({ params }: InternshipPageProps) {
  const { id } = await params;
  const internship = internships.find((item) => item.id === id);

  if (!internship) {
    notFound();
  }

  const company = companies.find((item) => item.id === internship.companyId);

  if (!company) {
    notFound();
  }

  const related = internships.filter(
    (item) => item.field === internship.field && item.id !== internship.id,
  );

  const facts = [
    { label: "City", value: internship.location },
    { label: "Work arrangement", value: internship.workMode },
    { label: "Duration", value: internship.duration },
    { label: "Stipend", value: formatStipend(internship.stipend) },
    { label: "Posted", value: formatDate(internship.postedDate) },
    { label: "Apply before", value: formatDate(internship.deadline) },
  ];

  return (
    <>
      <div className="border-b border-line bg-white">
        <div className="container-page py-8 md:py-12">
          <Link
            href="/internships"
            className="inline-block py-2 text-sm font-semibold text-leaf hover:underline"
          >
            ← All internships
          </Link>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={72}
              height={72}
              loading="eager"
              className="rounded-xl"
            />
            <div>
              <FieldBadge field={internship.field} />
              <h1 className="mt-2 font-display text-3xl text-forest md:text-4xl">
                {internship.title}
              </h1>
              <p className="text-muted">{company.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page grid items-start gap-6 pt-8 lg:grid-cols-3">
        <div className="card space-y-8 lg:col-span-2 lg:p-8">
          <section>
            <h2 className="font-display text-2xl text-forest">Overview</h2>
            <p className="mt-2 leading-7">{internship.description}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-forest">
              Responsibilities
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 leading-7">
              {internship.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-forest">
              Eligibility requirements
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 leading-7">
              {internship.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-forest">
              Required skills
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {internship.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-line px-3 py-1 text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <dl className="space-y-3">
              {facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-4">
                  <dt className="text-muted">{fact.label}</dt>
                  <dd className="text-right font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <Link
              href={`/apply?internship=${internship.id}`}
              className="btn btn-primary mt-5 w-full"
            >
              Apply Now
            </Link>
          </div>

          <div className="card">
            <h2 className="font-display text-xl text-forest">
              About {company.name}
            </h2>
            <p className="mt-2 text-sm leading-6">{company.description}</p>
            <Link
              href={`/companies/${company.id}`}
              className="btn btn-secondary mt-4 w-full"
            >
              View Company
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="container-page pt-14">
          <SectionHeading title={`More in ${internship.field}`} />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => {
              const itemCompany = companies.find(
                (record) => record.id === item.companyId,
              );

              if (!itemCompany) {
                return null;
              }

              return (
                <li key={item.id}>
                  <InternshipCard internship={item} company={itemCompany} />
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
