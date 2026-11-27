interface SelectOption {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  type?: "text" | "email" | "select" | "textarea";
  placeholder?: string;
  options?: SelectOption[];
}

export default function FormField({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  type = "text",
  placeholder,
  options = [],
}: FormFieldProps) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  // Screen readers read out the elements listed in aria-describedby
  let describedBy: string | undefined;
  if (error) {
    describedBy = errorId;
  } else if (hint) {
    describedBy = hintId;
  }

  const sharedProps = {
    id: name,
    name: name,
    value: value,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    className: "input",
  };

  function renderControl() {
    if (type === "select") {
      return (
        <select
          {...sharedProps}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          {...sharedProps}
          rows={5}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    }

    return (
      <input
        {...sharedProps}
        type={type}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      {renderControl()}
      {hint && (
        <p id={hintId} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
