import type { ApplicationStatus } from "@/types";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-block rounded-md bg-sage px-2.5 py-1 text-xs font-semibold text-forest">
      {status} (demo)
    </span>
  );
}
