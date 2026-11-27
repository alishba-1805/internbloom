import type { InternshipField } from "@/types";

interface FieldBadgeProps {
  field: InternshipField;
}

export default function FieldBadge({ field }: FieldBadgeProps) {
  return (
    <span className="inline-block rounded-md bg-sage px-2.5 py-1 text-xs font-semibold text-forest">
      {field}
    </span>
  );
}
