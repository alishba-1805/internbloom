"use client";

import { useState } from "react";
import EmptyState from "@/components/EmptyState";
import FilterBar from "@/components/FilterBar";
import InternshipCard from "@/components/InternshipCard";
import type { Company, Internship, InternshipFilters } from "@/types";

interface InternshipExplorerProps {
  internships: Internship[];
  companies: Company[];
  fields: string[];
  cities: string[];
  workModes: string[];
  initialField: string;
}

const defaultFilters: InternshipFilters = {
  search: "",
  field: "All",
  city: "All",
  workMode: "All",
  sortBy: "recent",
};

export default function InternshipExplorer({
  internships,
  companies,
  fields,
  cities,
  workModes,
  initialField,
}: InternshipExplorerProps) {
  const [filters, setFilters] = useState<InternshipFilters>({
    ...defaultFilters,
    field: initialField,
  });

  function handleFilterChange(name: keyof InternshipFilters, value: string) {
    setFilters({ ...filters, [name]: value });
  }

  function handleReset() {
    setFilters(defaultFilters);
  }

  // An internship is shown only if it passes every active filter
  function matchesFilters(internship: Internship) {
    const query = filters.search.trim().toLowerCase();

    if (query !== "") {
      const company = companies.find(
        (item) => item.id === internship.companyId,
      );
      const inTitle = internship.title.toLowerCase().includes(query);
      const inCompany = company?.name.toLowerCase().includes(query);
      const inSkills = internship.skills.some((skill) =>
        skill.toLowerCase().includes(query),
      );

      if (!inTitle && !inCompany && !inSkills) {
        return false;
      }
    }

    if (filters.field !== "All" && internship.field !== filters.field) {
      return false;
    }

    if (filters.city !== "All" && internship.location !== filters.city) {
      return false;
    }

    if (
      filters.workMode !== "All" &&
      internship.workMode !== filters.workMode
    ) {
      return false;
    }

    return true;
  }

  function compareInternships(first: Internship, second: Internship) {
    if (filters.sortBy === "stipend-high") {
      return second.stipend - first.stipend;
    }
    if (filters.sortBy === "stipend-low") {
      return first.stipend - second.stipend;
    }
    // Newest posted date first
    return second.postedDate.localeCompare(first.postedDate);
  }

  // filter() returns a new array, so sorting it leaves the original data alone
  const results = internships.filter(matchesFilters).sort(compareInternships);

  return (
    <div>
      <FilterBar
        filters={filters}
        fields={fields}
        cities={cities}
        workModes={workModes}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      <h2 aria-live="polite" className="mt-8 mb-4 font-semibold text-forest">
        Showing {results.length} of {internships.length} internships
      </h2>

      {results.length === 0 ? (
        <EmptyState
          title="No internships match your search"
          message="Try a different word or remove one of the filters."
          actionLabel="Reset filters"
          onAction={handleReset}
        />
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((internship) => {
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
      )}
    </div>
  );
}
