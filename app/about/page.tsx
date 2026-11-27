import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why InternBloom was built, the problems it addresses and the student team behind it.",
};

const problems = [
  {
    title: "Scattered listings",
    problem: "Opportunities are spread across posts, groups and notice boards.",
    help: "InternBloom puts them in one list that you can search and filter.",
  },
  {
    title: "Missing details",
    problem: "Stipend, duration or eligibility is often unclear.",
    help: "Every listing shows the same key facts in the same place.",
  },
  {
    title: "Losing track",
    problem: "It is easy to forget where you have already applied.",
    help: "The demo tracker lists the applications made during your visit.",
  },
];

const features = [
  "Search by title, company or skill",
  "Filters for field, city and work arrangement",
  "Sorting by date or stipend",
  "Detailed internship and company pages",
  "Application form with clear validation",
  "Temporary application tracker",
];

const team = [
  { name: "Alishba Inam", role: "Group Leader" },
  { name: "Amna Zainab", role: "Group Member" },
  { name: "Hafsa Naeem", role: "Group Member" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About InternBloom"
        description="InternBloom is a student-built demonstration of a simple, calm place to discover internships in Pakistan."
      />

      <section className="container-page pt-10">
        <SectionHeading title="Our purpose" />
        <p className="max-w-3xl leading-8">
          A first internship can shape what a student does next, but finding one
          often feels confusing. We built InternBloom to show how a focused
          portal can make that first step easier to understand.
        </p>
      </section>

      <section className="container-page pt-14">
        <SectionHeading title="Common problems and how we help" />
        <ul className="grid gap-5 md:grid-cols-3">
          {problems.map((item) => (
            <li key={item.title} className="card">
              <h3 className="text-lg font-semibold text-forest">
                {item.title}
              </h3>
              <p className="mt-2 leading-7 text-muted">{item.problem}</p>
              <p className="mt-3 border-t border-line pt-3 leading-7">
                {item.help}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pt-14">
        <SectionHeading title="Platform features" />
        <ul className="card grid list-inside list-disc gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="container-page pt-14">
        <SectionHeading title="Our team" />
        <ul className="grid gap-5 md:grid-cols-3">
          {team.map((member) => (
            <li key={member.name} className="card text-center">
              <h3 className="font-display text-xl text-forest">
                {member.name}
              </h3>
              <p className="text-muted">{member.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pt-14 text-center">
        <h2 className="font-display text-3xl text-forest">
          See what is available
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">
          Browse the demo internships and open any role to read more.
        </p>
        <Link href="/internships" className="btn btn-primary mt-6">
          Explore internships
        </Link>
      </section>
    </>
  );
}
