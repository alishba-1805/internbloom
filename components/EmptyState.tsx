import Image from "next/image";

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

// The optional button needs a click handler, so a button should only be
// passed in from a Client Component.
export default function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-10 text-center">
      <Image
        src="/images/empty.svg"
        alt=""
        width={96}
        height={96}
        className="mx-auto"
      />
      <h3 className="mt-4 text-lg font-semibold text-forest">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {message}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn btn-primary mt-5"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
