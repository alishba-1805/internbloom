import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InternshipCard from "@/components/InternshipCard";
import SectionHeading from "@/components/SectionHeading";
import { companies } from "@/data/companies";
import { cities, internshipFields, internships } from "@/data/internships";

export const metadata: Metadata = {
  // The layout's title template does not apply to this page, so write it in full
  title: "Home | InternBloom",
  description:
    "Explore student internships in software, security, data, design, marketing and finance on InternBloom.",
};

const steps = [
  {
    title: "Explore",
    text: "Search and filter internships by field, city and work arrangement.",
  },
  {
    title: "Compare",
    text: "Read the role, requirements, stipend, deadline and company profile.",
  },
  {
    title: "Apply",
    text: "Complete a demo application and follow it in the tracker.",
  },
];

export default function HomePage() {
  // The three most recently posted internships
  const featured = [...internships]
    .sort((first, second) => second.postedDate.localeCompare(first.postedDate))
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-page grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-semibold text-leaf">
              Your first step towards more.
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-forest sm:text-5xl lg:text-6xl">
              Big careers begin with small opportunities.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-muted">
              Find internships that fit your studies, your city and your
              schedule. Built for university students in Pakistan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/internships" className="btn btn-primary">
                Browse Internships
              </Link>
              <Link href="/companies" className="btn btn-secondary">
                Explore Companies
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted">
              Demo data: {internships.length} internships · {companies.length}{" "}
              fictional companies · {cities.length} cities
            </p>
          </div>

          <Image
            src="/images/hero.svg"
            alt="A student with a laptop sitting beside a growing plant and an internship card"
            width={560}
            height={460}
            loading="eager"
            className="mx-auto h-auto w-full max-w-lg"
          />
        </div>
      </section>

      <section className="container-page pt-14">
        <SectionHeading
          title="Featured internships"
          description="The newest opportunities in our demo list."
          linkHref="/internships"
          linkLabel="See all internships"
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((internship) => {
            const company = companies.find(
              (item) => item.id === internship.companyId,
            );

            if (!company) {
              return null;
            }

            return (
              <li key={internship.id}>
                <InternshipCard internship={internship} company={company} />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="container-page pt-14">
        <SectionHeading
          title="Popular fields"
          description="Choose a field to see its internships."
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {internshipFields.map((field) => {
            const count = internships.filter(
              (internship) => internship.field === field,
            ).length;

            return (
              <li key={field}>
                <Link
                  href={`/internships?field=${encodeURIComponent(field)}`}
                  className="card flex h-full items-center justify-between gap-3 hover:border-leaf hover:bg-sage"
                >
                  <span className="font-semibold text-forest">{field}</span>
                  <span className="text-sm text-ink">{count} roles</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="container-page pt-14">
        <SectionHeading title="How it works" />
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="card">
              <span className="flex size-10 items-center justify-center rounded-full bg-forest font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-forest">
                {step.title}
              </h3>
              <p className="mt-2 leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page pt-14">
        <div className="rounded-3xl bg-forest px-6 py-10 text-center text-white md:py-14">
          <h2 className="font-display text-3xl">
            Ready to take the first step?
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-white/85">
            Pick a role that interests you and try the application form.
          </p>
          <Link
            href="/apply"
            className="btn mt-6 border-sage bg-sage text-forest hover:bg-white"
          >
            Start an application
          </Link>
        </div>
      </section>
    </>
  );
}
