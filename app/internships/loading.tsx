// Shown automatically while a page under /internships is being prepared
export default function InternshipsLoading() {
  const placeholders = [1, 2, 3, 4, 5, 6];

  return (
    <div role="status" className="container-page animate-pulse pt-10">
      <span className="sr-only">Loading internships</span>

      <div className="h-10 w-2/3 max-w-sm rounded-lg bg-line" />
      <div className="mt-6 h-32 rounded-2xl bg-line" />

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {placeholders.map((number) => (
          <div key={number} className="card space-y-4">
            <div className="flex gap-3">
              <div className="size-12 rounded-lg bg-line" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-line" />
                <div className="h-3 w-1/2 rounded bg-line" />
              </div>
            </div>
            <div className="h-20 rounded-lg bg-line" />
            <div className="h-11 rounded-lg bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}
