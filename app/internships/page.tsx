import type { Metadata } from "next";
import InternshipExplorer from "@/components/InternshipExplorer";
import PageHeader from "@/components/PageHeader";
import { companies } from "@/data/companies";
import {
  cities,
  internshipFields,
  internships,
  workModes,
} from "@/data/internships";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Search, filter and sort student internships by title, company, skill, field, city and work arrangement.",
};

interface InternshipsPageProps {
  searchParams: Promise<{ field?: string | string[] }>;
}

export default async function InternshipsPage({
  searchParams,
}: InternshipsPageProps) {
  // In Next.js 16 the query string values must be awaited
  const { field } = await searchParams;

  // Use the field from the URL only if it is one we know
  const matchedField = internshipFields.find((item) => item === field);
  const initialField = matchedField ?? "All";

  return (
    <>
      <PageHeader
        title="Find your internship"
        description="Combine search and filters to narrow the list. All opportunities are demonstration data."
      />
      <div className="container-page pt-8">
        {/* The key gives the explorer fresh state when the URL field changes */}
        <InternshipExplorer
          key={initialField}
          internships={internships}
          companies={companies}
          fields={internshipFields}
          cities={cities}
          workModes={workModes}
          initialField={initialField}
        />
      </div>
    </>
  );
}
