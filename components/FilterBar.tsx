import type { InternshipFilters } from "@/types";

interface FilterBarProps {
  filters: InternshipFilters;
  fields: string[];
  cities: string[];
  workModes: string[];
  onFilterChange: (name: keyof InternshipFilters, value: string) => void;
  onReset: () => void;
}

export default function FilterBar({
  filters,
  fields,
  cities,
  workModes,
  onFilterChange,
  onReset,
}: FilterBarProps) {
  return (
    <div role="search" className="card">
      <label htmlFor="search" className="label">
        Search
      </label>
      <input
        id="search"
        type="search"
        value={filters.search}
        onChange={(event) => onFilterChange("search", event.target.value)}
        placeholder="Title, company or skill"
        className="input"
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="field" className="label">
            Field
          </label>
          <select
            id="field"
            value={filters.field}
            onChange={(event) => onFilterChange("field", event.target.value)}
            className="input"
          >
            <option value="All">All fields</option>
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="label">
            City
          </label>
          <select
            id="city"
            value={filters.city}
            onChange={(event) => onFilterChange("city", event.target.value)}
            className="input"
          >
            <option value="All">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="workMode" className="label">
            Work arrangement
          </label>
          <select
            id="workMode"
            value={filters.workMode}
            onChange={(event) => onFilterChange("workMode", event.target.value)}
            className="input"
          >
            <option value="All">All arrangements</option>
            {workModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sortBy" className="label">
            Sort by
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(event) => onFilterChange("sortBy", event.target.value)}
            className="input"
          >
            <option value="recent">Most recent</option>
            <option value="stipend-high">Stipend: high to low</option>
            <option value="stipend-low">Stipend: low to high</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="btn btn-secondary mt-4"
      >
        Reset filters
      </button>
    </div>
  );
}
