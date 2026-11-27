import Image from "next/image";
import Link from "next/link";
import FieldBadge from "@/components/FieldBadge";
import { formatStipend } from "@/lib/format";
import type { Company, Internship } from "@/types";

interface InternshipCardProps {
  internship: Internship;
  company: Company;
}

export default function InternshipCard({
  internship,
  company,
}: InternshipCardProps) {
  return (
    <article className="card flex h-full flex-col">
      <div className="flex items-start gap-3">
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          width={48}
          height={48}
          className="shrink-0 rounded-lg"
        />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-snug text-forest">
            {internship.title}
          </h3>
          <p className="text-sm text-muted">{company.name}</p>
        </div>
      </div>

      <div className="mt-4">
        <FieldBadge field={internship.field} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div>
          <dt className="text-muted">City</dt>
          <dd className="font-medium">{internship.location}</dd>
        </div>
        <div>
          <dt className="text-muted">Arrangement</dt>
          <dd className="font-medium">{internship.workMode}</dd>
        </div>
        <div>
          <dt className="text-muted">Duration</dt>
          <dd className="font-medium">{internship.duration}</dd>
        </div>
        <div>
          <dt className="text-muted">Stipend</dt>
          <dd className="font-medium">{formatStipend(internship.stipend)}</dd>
        </div>
      </dl>

      <ul aria-label="Skills" className="mt-4 flex flex-wrap gap-2">
        {internship.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-md border border-line px-2 py-1 text-xs text-muted"
          >
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <Link
          href={`/internships/${internship.id}`}
          aria-label={`View details: ${internship.title}`}
          className="btn btn-secondary w-full"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
