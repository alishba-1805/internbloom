import { useState } from "react";
import FormField from "@/components/FormField";
import type {
  Application,
  ApplicationErrors,
  ApplicationFormData,
  Company,
  Internship,
} from "@/types";

interface ApplicationFormProps {
  internships: Internship[];
  companies: Company[];
  applications: Application[];
  initialInternshipId: string;
  onSubmitStart: () => void;
  onApplicationSubmit: (application: Application) => void;
}

const minimumMotivationLength = 50;

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function ApplicationForm({
  internships,
  companies,
  applications,
  initialInternshipId,
  onSubmitStart,
  onApplicationSubmit,
}: ApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: "",
    email: "",
    university: "",
    degree: "",
    semester: "",
    internshipId: initialInternshipId,
    motivation: "",
    confirmed: false,
  });
  const [errors, setErrors] = useState<ApplicationErrors>({});

  const internshipOptions = internships.map((internship) => {
    const company = companies.find((item) => item.id === internship.companyId);
    return {
      value: internship.id,
      label: `${internship.title} (${company?.name})`,
    };
  });

  const semesterOptions = semesters.map((semester) => ({
    value: semester,
    label: `Semester ${semester}`,
  }));

  function handleChange(
    name: keyof ApplicationFormData,
    value: string | boolean,
  ) {
    setFormData({ ...formData, [name]: value });
    // Remove the old error while the student corrects the field
    setErrors({ ...errors, [name]: undefined });
  }

  function validateForm() {
    const newErrors: ApplicationErrors = {};
    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();

    if (fullName === "") {
      newErrors.fullName = "Please enter your full name.";
    } else if (!/^[A-Za-z][A-Za-z .'-]{2,}$/.test(fullName)) {
      newErrors.fullName =
        "Use at least 3 characters: letters, spaces, dots or hyphens.";
    }

    if (email === "") {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      newErrors.email = "Enter a valid email, for example name@example.com.";
    }

    if (formData.university.trim() === "") {
      newErrors.university = "Please enter your university.";
    }

    if (formData.degree.trim() === "") {
      newErrors.degree = "Please enter your degree program.";
    }

    if (formData.semester === "") {
      newErrors.semester = "Please select your current semester.";
    }

    const selected = internships.find(
      (internship) => internship.id === formData.internshipId,
    );
    const alreadyApplied = applications.some(
      (application) =>
        application.email === email &&
        application.internshipId === formData.internshipId,
    );

    if (!selected) {
      newErrors.internshipId = "Please select an internship.";
    } else if (alreadyApplied) {
      newErrors.internshipId =
        "You have already applied for this internship with this email.";
    }

    if (formData.motivation.trim().length < minimumMotivationLength) {
      newErrors.motivation = `Write at least ${minimumMotivationLength} characters about why you are interested.`;
    }

    if (!formData.confirmed) {
      newErrors.confirmed = "Please tick the box to continue.";
    }

    return newErrors;
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page
    event.preventDefault();
    onSubmitStart();

    const newErrors = validateForm();
    setErrors(newErrors);

    const invalidFields = Object.keys(newErrors);
    if (invalidFields.length > 0) {
      // Move the cursor to the first field that needs attention
      document.getElementById(invalidFields[0])?.focus();
      return;
    }

    const email = formData.email.trim().toLowerCase();

    onApplicationSubmit({
      id: `${formData.internshipId}-${email}`,
      internshipId: formData.internshipId,
      fullName: formData.fullName.trim(),
      email: email,
      submittedOn: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: "Submitted",
    });

    // Keep the student's details so another application is quicker
    setFormData({
      ...formData,
      internshipId: "",
      motivation: "",
      confirmed: false,
    });
  }

  // A corrected field is set to undefined, so count only real messages
  const errorCount = Object.values(errors).filter(
    (message) => message !== undefined,
  ).length;
  const motivationLength = formData.motivation.trim().length;

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-5">
      <h2 className="font-display text-2xl text-forest">Application form</h2>

      {errorCount > 0 && (
        <p
          role="alert"
          className="rounded-lg border border-error bg-white p-3 text-sm font-medium text-error"
        >
          Please correct the highlighted fields ({errorCount}).
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Full name"
          name="fullName"
          value={formData.fullName}
          error={errors.fullName}
          onChange={(value) => handleChange("fullName", value)}
        />
        <FormField
          label="Email address"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          error={errors.email}
          onChange={(value) => handleChange("email", value)}
        />
        <FormField
          label="University"
          name="university"
          value={formData.university}
          error={errors.university}
          onChange={(value) => handleChange("university", value)}
        />
        <FormField
          label="Degree program"
          name="degree"
          placeholder="For example, BS Cyber Security"
          value={formData.degree}
          error={errors.degree}
          onChange={(value) => handleChange("degree", value)}
        />
      </div>

      <FormField
        label="Current semester"
        name="semester"
        type="select"
        placeholder="Select a semester"
        options={semesterOptions}
        value={formData.semester}
        error={errors.semester}
        onChange={(value) => handleChange("semester", value)}
      />

      <FormField
        label="Internship"
        name="internshipId"
        type="select"
        placeholder="Select an internship"
        options={internshipOptions}
        value={formData.internshipId}
        error={errors.internshipId}
        onChange={(value) => handleChange("internshipId", value)}
      />

      <FormField
        label="Why are you interested?"
        name="motivation"
        type="textarea"
        hint={`${motivationLength} of at least ${minimumMotivationLength} characters`}
        value={formData.motivation}
        error={errors.motivation}
        onChange={(value) => handleChange("motivation", value)}
      />

      <div>
        <label className="flex items-start gap-3 text-sm leading-6">
          <input
            id="confirmed"
            type="checkbox"
            checked={formData.confirmed}
            onChange={(event) =>
              handleChange("confirmed", event.target.checked)
            }
            aria-invalid={Boolean(errors.confirmed)}
            aria-describedby={errors.confirmed ? "confirmed-error" : undefined}
            className="mt-1 size-5 shrink-0 accent-leaf"
          />
          <span>
            I confirm these details are correct and understand that this
            application is a demonstration and is not sent to an employer.
          </span>
        </label>
        {errors.confirmed && (
          <p
            id="confirmed-error"
            className="mt-1 text-sm font-medium text-error"
          >
            {errors.confirmed}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-full sm:w-auto">
        Submit application
      </button>
    </form>
  );
}
