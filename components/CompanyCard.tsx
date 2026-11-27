import Image from "next/image";
import Link from "next/link";
import type { Company } from "@/types";

interface CompanyCardProps {
  company: Company;
  internshipCount: number;
}

export default function CompanyCard({
  company,
  internshipCount,
}: CompanyCardProps) {
  return (
    <article className="card flex h-full flex-col">
      <Image
        src={company.logo}
        alt={`${company.name} logo`}
        width={64}
        height={64}
        className="rounded-xl"
      />
      <h3 className="mt-4 text-xl font-semibold text-forest">{company.name}</h3>
      <p className="text-sm text-muted">
        {company.industry} · {company.location}
      </p>
      <p className="mt-3 text-sm leading-6">{company.description}</p>

      <div className="mt-auto pt-5">
        <p className="mb-3 text-sm font-semibold text-leaf">
          {internshipCount} available{" "}
          {internshipCount === 1 ? "internship" : "internships"}
        </p>
        <Link
          href={`/companies/${company.id}`}
          aria-label={`View company: ${company.name}`}
          className="btn btn-secondary w-full"
        >
          View Company
        </Link>
      </div>
    </article>
  );
}
