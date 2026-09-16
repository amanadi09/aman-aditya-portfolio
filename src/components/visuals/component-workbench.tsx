import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Meta } from "@/components/primitives";
import { cn } from "@/lib/utils";

const SPECIMENS = ["Modal", "Table", "Dropdown", "Drawer", "Accordion", "Form"] as const;
type Specimen = (typeof SPECIMENS)[number];

export function ComponentWorkbench() {
  const [active, setActive] = useState<Specimen>("Modal");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(0);
  const [checked, setChecked] = useState(true);

  return (
    <div className="w-full">
      <div className="border border-[var(--color-rule-strong)] bg-[var(--color-card)]">
        <div
          className="flex flex-wrap items-center gap-x-1 gap-y-1 border-b border-[var(--color-rule)] px-3 py-2"
          role="tablist"
          aria-label="Component specimens"
        >
          {SPECIMENS.map((s) => (
            <button
              key={s}
              role="tab"
              type="button"
              aria-selected={active === s}
              onClick={() => setActive(s)}
              className={cn(
                "meta border px-2 py-1 transition-colors duration-200",
                active === s
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          aria-label={`${active} specimen`}
          className="min-h-[248px] bg-[var(--color-paper-deep)] p-6"
        >
          {active === "Modal" && (
            <div className="mx-auto max-w-sm border border-[var(--color-rule-strong)] bg-[var(--color-card)]">
              <div className="flex items-center justify-between border-b border-[var(--color-rule)] px-4 py-2.5">
                <Meta tone="ink">Confirm export</Meta>
                <X className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
              </div>
              <p className="px-4 py-4 text-sm leading-relaxed text-muted-foreground">
                Focus is trapped inside the dialog, Escape closes it, and focus returns to the
                trigger.
              </p>
              <div className="flex justify-end gap-2 border-t border-[var(--color-rule)] px-4 py-3">
                <span className="meta border border-[var(--color-rule-strong)] px-3 py-1.5">
                  Cancel
                </span>
                <span className="meta bg-foreground px-3 py-1.5 text-background">Export</span>
              </div>
            </div>
          )}

          {active === "Table" && (
            <table className="w-full border-collapse border border-[var(--color-rule)] bg-[var(--color-card)]">
              <caption className="sr-only">Table specimen</caption>
              <thead>
                <tr className="border-b border-[var(--color-rule)]">
                  {["Token", "Value", "Scope"].map((h) => (
                    <th key={h} scope="col" className="px-3 py-2 text-left">
                      <Meta>{h}</Meta>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["space-4", "1rem", "layout"],
                  ["radius-sm", "2px", "surface"],
                  ["ease-out", "cubic-bezier", "motion"],
                ].map((r) => (
                  <tr key={r[0]} className="border-b border-[var(--color-rule)] last:border-0">
                    {r.map((c, i) => (
                      <td
                        key={c}
                        className={cn("px-3 py-2 text-sm", i > 0 && "font-mono text-xs")}
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {active === "Dropdown" && (
            <div className="mx-auto max-w-xs">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between border border-[var(--color-rule-strong)] bg-[var(--color-card)] px-3 py-2 text-sm"
              >
                Theme: Paper
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
                  aria-hidden
                />
              </button>
              {open && (
                <ul className="mt-1 border border-[var(--color-rule-strong)] bg-[var(--color-card)]">
                  {["Paper", "Ink", "High contrast"].map((o, i) => (
                    <li
                      key={o}
                      className="flex items-center justify-between px-3 py-2 text-sm hover:bg-[var(--color-paper-deep)]"
                    >
                      {o}
                      {i === 0 && <Check className="h-3.5 w-3.5 text-accent" aria-hidden />}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {active === "Drawer" && (
            <div className="relative h-[200px] overflow-hidden border border-[var(--color-rule)] bg-[var(--color-card)]">
              <div className="absolute inset-y-0 right-0 w-3/5 border-l border-[var(--color-rule-strong)] bg-[var(--color-paper)] p-4">
                <Meta tone="ink">Record detail</Meta>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Side panel shares the modal’s focus contract and dismiss behaviour.
                </p>
              </div>
            </div>
          )}

          {active === "Accordion" && (
            <div className="mx-auto max-w-md divide-y divide-[var(--color-rule)] border border-[var(--color-rule)] bg-[var(--color-card)]">
              {["Installation", "Theming", "Keyboard map"].map((t, i) => (
                <div key={t}>
                  <button
                    type="button"
                    aria-expanded={expanded === i}
                    onClick={() => setExpanded(expanded === i ? -1 : i)}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-sm"
                  >
                    {t}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        expanded === i && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  {expanded === i && (
                    <p className="px-3 pb-3 text-sm leading-relaxed text-muted-foreground">
                      Panels are labelled by their trigger and announce expanded state.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {active === "Form" && (
            <div className="mx-auto grid max-w-sm gap-3">
              <label className="grid gap-1.5">
                <Meta>Label</Meta>
                <input
                  placeholder="Value"
                  className="border border-[var(--color-rule-strong)] bg-[var(--color-card)] px-3 py-2 text-sm focus:outline-none focus-visible:border-accent"
                />
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => setChecked((v) => !v)}
                className="flex items-center gap-2.5 text-sm"
              >
                <span
                  className={cn(
                    "relative h-5 w-9 border transition-colors duration-200",
                    checked ? "border-accent bg-accent/15" : "border-[var(--color-rule-strong)]",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-3.5 w-3.5 transition-transform duration-200 ease-[var(--ease-out-soft)]",
                      checked ? "translate-x-4 bg-accent" : "translate-x-0.5 bg-foreground/40",
                    )}
                  />
                </span>
                Reduced motion
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-[var(--color-rule)] px-4 py-2.5">
          {["30+ components", "Dark mode", "Themeable", "Keyboard navigation", "ARIA"].map((t) => (
            <Meta key={t}>{t}</Meta>
          ))}
        </div>
      </div>
      <p className="mt-2 text-right">
        <Meta>Interactive specimen · rebuilt for this page</Meta>
      </p>
    </div>
  );
}
