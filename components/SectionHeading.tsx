import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function SectionHeading({
  title,
  description,
  linkHref,
  linkLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-2xl text-forest md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl leading-7 text-muted">{description}</p>
        )}
      </div>

      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="shrink-0 py-2 text-sm font-semibold text-leaf underline-offset-4 hover:underline"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
