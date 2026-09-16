import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { Meta } from "@/components/primitives";
import { cn } from "@/lib/utils";

const RANGES = ["7D", "30D", "90D"] as const;
type Range = (typeof RANGES)[number];

/** Illustrative shape only — see the concept label rendered below the frame. */
const SERIES: Record<Range, number[]> = {
  "7D": [42, 58, 35, 71, 64, 48, 80],
  "30D": [30, 46, 62, 55, 78, 68, 84, 60, 72, 51],
  "90D": [55, 40, 68, 74, 61, 88, 70, 52, 66, 79, 58, 73],
};

const ROWS = [
  { id: "TCK-4182", surface: "Authentication", state: "Reproduced", age: "2h" },
  { id: "TCK-4179", surface: "REST API", state: "Root cause", age: "5h" },
  { id: "TCK-4168", surface: "Data grid", state: "Validating", age: "1d" },
  { id: "TCK-4155", surface: "Webhooks", state: "Reproduced", age: "2d" },
];

export function AnalyticsPreview() {
  const [range, setRange] = useState<Range>("30D");
  const [query, setQuery] = useState("");

  const bars = SERIES[range];
  const rows = useMemo(
    () =>
      ROWS.filter((r) =>
        (r.id + r.surface + r.state).toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="w-full">
      <div className="overflow-hidden border border-[var(--color-rule-strong)] bg-[var(--color-card)]">
        {/* chrome */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-rule)] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            <Meta tone="ink">Support Analytics</Meta>
          </div>
          <div className="flex items-center gap-1" role="group" aria-label="Date range">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                aria-pressed={range === r}
                className={cn(
                  "meta border px-2 py-1 transition-colors duration-200",
                  range === r
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* KPI strip */}
        <dl className="grid grid-cols-2 divide-x divide-[var(--color-rule)] border-b border-[var(--color-rule)] sm:grid-cols-4">
          {[
            ["Open", "128"],
            ["Reproduced", "46"],
            ["Median age", "6h"],
            ["Escalated", "9"],
          ].map(([label, value]) => (
            <div key={label} className="px-4 py-3">
              <dt>
                <Meta>{label}</Meta>
              </dt>
              <dd className="display mt-1 text-2xl">{value}</dd>
            </div>
          ))}
        </dl>

        {/* chart */}
        <div className="border-b border-[var(--color-rule)] px-4 py-4">
          <div className="flex h-28 items-end gap-[3px]" aria-hidden>
            {bars.map((v, i) => (
              <span
                key={`${range}-${i}`}
                style={{ height: `${v}%`, transitionDelay: `${i * 18}ms` }}
                className={cn(
                  "flex-1 transition-[height] duration-500 ease-[var(--ease-out-soft)]",
                  i === bars.indexOf(Math.max(...bars))
                    ? "bg-accent"
                    : "bg-[var(--color-rule-strong)]",
                )}
              />
            ))}
          </div>
          <p className="sr-only">
            Concept chart showing relative ticket volume across the selected {range} range.
          </p>
        </div>

        {/* toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-rule)] px-4 py-2.5">
          <label className="flex min-w-0 flex-1 items-center gap-2">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
            <span className="sr-only">Filter demo rows</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by id, surface, state"
              className="meta w-full bg-transparent py-1 text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </label>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Download className="h-3.5 w-3.5" aria-hidden />
            <Meta>CSV</Meta>
          </span>
        </div>

        {/* grid */}
        <table className="w-full border-collapse">
          <caption className="sr-only">Concept data grid of investigation records</caption>
          <thead>
            <tr className="border-b border-[var(--color-rule)]">
              {["Ref", "Surface", "State", "Age"].map((h) => (
                <th key={h} scope="col" className="px-4 py-2 text-left">
                  <Meta>{h}</Meta>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[var(--color-rule)] last:border-0">
                <td className="px-4 py-2.5 font-mono text-xs">{r.id}</td>
                <td className="px-4 py-2.5 text-sm">{r.surface}</td>
                <td className="px-4 py-2.5 text-sm text-muted-foreground">{r.state}</td>
                <td className="px-4 py-2.5 text-right font-mono text-xs text-muted-foreground">
                  {r.age}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center">
                  <Meta>No rows match this filter</Meta>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-2.5">
          <Meta>Page 1 of 12</Meta>
          <div className="flex gap-1" aria-hidden>
            {[1, 2, 3].map((p) => (
              <span
                key={p}
                className={cn(
                  "meta px-1.5",
                  p === 1 ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2 text-right">
        <Meta>Concept visualization · not production data</Meta>
      </p>
    </div>
  );
}
