"use client";

import { useState } from "react";
import ApplicationForm from "@/components/ApplicationForm";
import ApplicationTracker from "@/components/ApplicationTracker";
import StatusBadge from "@/components/StatusBadge";
import type { Application, Company, Internship } from "@/types";

interface ApplicationWorkspaceProps {
  internships: Internship[];
  companies: Company[];
  initialInternshipId: string;
}

export default function ApplicationWorkspace({
  internships,
  companies,
  initialInternshipId,
}: ApplicationWorkspaceProps) {
  // The list lives here so both the form and the tracker can use it
  const [applications, setApplications] = useState<Application[]>([]);
  const [confirmation, setConfirmation] = useState<Application | null>(null);

  const confirmedInternship = internships.find(
    (item) => item.id === confirmation?.internshipId,
  );
  const confirmedCompany = companies.find(
    (item) => item.id === confirmedInternship?.companyId,
  );

  function addApplication(application: Application) {
    setApplications([application, ...applications]);
    setConfirmation(application);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearConfirmation() {
    setConfirmation(null);
  }

  function applyAgain() {
    clearConfirmation();
    document.getElementById("internshipId")?.focus();
  }

  return (
    <div>
      <div role="status">
        {confirmation && (
          <div className="mb-6 rounded-2xl border-2 border-leaf bg-white p-5 md:p-6">
            <h2 className="font-display text-2xl text-forest">
              Application recorded
            </h2>
            <p className="mt-2 leading-7">
              Your demo application for{" "}
              <strong>{confirmedInternship?.title}</strong> at{" "}
              <strong>{confirmedCompany?.name}</strong> has been added to the
              tracker. Nothing was sent to an employer.
            </p>
            <div className="mt-3">
              <StatusBadge status={confirmation.status} />
            </div>
            <button
              type="button"
              onClick={applyAgain}
              className="btn btn-secondary mt-4"
            >
              Apply for another internship
            </button>
          </div>
        )}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ApplicationForm
            internships={internships}
            companies={companies}
            applications={applications}
            initialInternshipId={initialInternshipId}
            onSubmitStart={clearConfirmation}
            onApplicationSubmit={addApplication}
          />
        </div>
        <div className="lg:col-span-2">
          <ApplicationTracker
            applications={applications}
            internships={internships}
            companies={companies}
          />
        </div>
      </div>
    </div>
  );
}
