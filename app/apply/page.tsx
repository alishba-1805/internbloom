import type { Metadata } from "next";
import ApplicationWorkspace from "@/components/ApplicationWorkspace";
import PageHeader from "@/components/PageHeader";
import { companies } from "@/data/companies";
import { internships } from "@/data/internships";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Complete a demo internship application and track your submissions during this visit.",
};

interface ApplyPageProps {
  searchParams: Promise<{ internship?: string | string[] }>;
}

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  // Example: /apply?internship=frontend-web-intern
  const { internship } = await searchParams;

  const selected = internships.find((item) => item.id === internship);
  const isInvalidLink = internship !== undefined && !selected;

  return (
    <>
      <PageHeader
        title="Apply for an internship"
        description="This is a simulation. Your details stay in this browser page and are never sent to an employer."
      />
      <div className="container-page pt-8">
        {isInvalidLink && (
          <p className="mb-6 rounded-xl border border-error bg-white p-4 text-error">
            We could not find the internship in that link. Please choose one
            from the list in the form.
          </p>
        )}
        <ApplicationWorkspace
          internships={internships}
          companies={companies}
          initialInternshipId={selected?.id ?? ""}
        />
      </div>
    </>
  );
}
