export function ResultSkeleton({ rows = 1 }: { rows?: number }) {
  return (
    <div className="mx-auto mt-6 max-w-2xl space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-2xl border border-line bg-surface p-4 dark:border-line-dark dark:bg-surface-dark"
        >
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3 w-1/3 rounded-full" />
            <div className="skeleton h-4 w-2/3 rounded-full" />
          </div>
          <div className="skeleton h-9 w-24 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
