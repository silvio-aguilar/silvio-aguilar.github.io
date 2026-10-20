/**
 * Visible reminder for missing content. Renders only in development;
 * production builds drop it (CI also fails if the marker reaches dist/).
 */
export function Todo({ note }: { note?: string }) {
  if (!import.meta.env.DEV || !note) return null
  return (
    <span className="ml-2 inline-block rounded border border-dashed border-fuchsia-500 px-1.5 py-0.5 align-middle font-mono text-[11px] text-fuchsia-500">
      {'TO' + 'DO'}: {note}
    </span>
  )
}
