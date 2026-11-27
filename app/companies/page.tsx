import type { Metadata } from "next";
import CompanyCard from "@/components/CompanyCard";
import PageHeader from "@/components/PageHeader";
import { companies } from "@/data/companies";
import { internships } from "@/data/internships";

export const metadata: Metadata = {
  title: "Companies",
  description:
    "Meet the fictional companies offering student internships on InternBloom and see their open roles.",
};

export default function CompaniesPage() {
  return (
    <>
      <PageHeader
        title="Companies"
        description="Get to know each team before you apply. Every company here is fictional."
      />
      <div className="container-page pt-8">
        <h2 className="sr-only">Company directory</h2>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => {
            const internshipCount = internships.filter(
              (internship) => internship.companyId === company.id,
            ).length;

            return (
              <li key={company.id}>
                <CompanyCard
                  company={company}
                  internshipCount={internshipCount}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
