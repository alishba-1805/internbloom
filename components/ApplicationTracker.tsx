import EmptyState from "@/components/EmptyState";
import StatusBadge from "@/components/StatusBadge";
import type { Application, Company, Internship } from "@/types";

interface ApplicationTrackerProps {
  applications: Application[];
  internships: Internship[];
  companies: Company[];
}

export default function ApplicationTracker({
  applications,
  internships,
  companies,
}: ApplicationTrackerProps) {
  return (
    <section aria-labelledby="tracker-title" className="card">
      <h2 id="tracker-title" className="font-display text-2xl text-forest">
        Application tracker
      </h2>
      <p className="mt-2 font-semibold text-leaf">
        Submitted applications: {applications.length}
      </p>
      <p className="mt-1 mb-4 text-sm leading-6 text-muted">
        This list is temporary. It clears if you refresh or leave this page.
      </p>

      {applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          message="Applications you submit during this visit will appear here."
        />
      ) : (
        <ul className="space-y-3">
          {applications.map((application) => {
            const internship = internships.find(
              (item) => item.id === application.internshipId,
            );
            const company = companies.find(
              (item) => item.id === internship?.companyId,
            );

            return (
              <li
                key={application.id}
                className="rounded-xl border border-line p-4"
              >
                <h3 className="font-semibold text-forest">
                  {internship?.title}
                </h3>
                <p className="text-sm text-muted">{company?.name}</p>
                <p className="mt-2 text-sm break-words">
                  {application.fullName} · {application.email}
                </p>
                <p className="text-sm text-muted">
                  Submitted on {application.submittedOn}
                </p>
                <div className="mt-2">
                  <StatusBadge status={application.status} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
