export type InternshipField =
  | "Software Development"
  | "Cybersecurity"
  | "Data Science and AI"
  | "UI/UX Design"
  | "Marketing"
  | "Business and Finance";

export type City = "Islamabad" | "Rawalpindi" | "Lahore" | "Karachi";

export type WorkMode = "Remote" | "On-site" | "Hybrid";

export interface Internship {
  id: string;
  title: string;
  companyId: string;
  field: InternshipField;
  location: City;
  workMode: WorkMode;
  duration: string;
  stipend: number; // PKR per month, 0 means unpaid
  postedDate: string; // YYYY-MM-DD
  deadline: string; // YYYY-MM-DD
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: City;
  logo: string;
  description: string;
  culture: string;
}

export interface InternshipFilters {
  search: string;
  field: string;
  city: string;
  workMode: string;
  sortBy: string;
}

export type ApplicationStatus = "Submitted";

export interface ApplicationFormData {
  fullName: string;
  email: string;
  university: string;
  degree: string;
  semester: string;
  internshipId: string;
  motivation: string;
  confirmed: boolean;
}

// One optional error message for each form field
export interface ApplicationErrors {
  fullName?: string;
  email?: string;
  university?: string;
  degree?: string;
  semester?: string;
  internshipId?: string;
  motivation?: string;
  confirmed?: string;
}

export interface Application {
  id: string;
  internshipId: string;
  fullName: string;
  email: string;
  submittedOn: string;
  status: ApplicationStatus;
}

export interface NavLink {
  href: string;
  label: string;
}
