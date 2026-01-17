interface Props {
  categories: string[];
  selected: string;
  onChange: (c: string) => void;
  onSort: () => void;
  sortDesc: boolean;
}

export default function Filters({
  categories,
  selected,
  onChange,
  onSort,
  sortDesc,
}: Props) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border px-3 py-2"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button
        onClick={onSort}
        className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100"
      >
        Sort by Date {sortDesc ? "(Newest)" : "(Oldest)"}
      </button>
    </div>
  );
}
