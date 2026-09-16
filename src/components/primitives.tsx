import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase mono metadata label. */
export function Meta({
  children,
  className,
  tone = "quiet",
}: {
  children: ReactNode;
  className?: string;
  tone?: "quiet" | "signal" | "ink";
}) {
  return (
    <span
      className={cn(
        "meta",
        tone === "quiet" && "text-muted-foreground",
        tone === "signal" && "text-accent",
        tone === "ink" && "text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Full-bleed hairline. */
export function Rule({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-px w-full bg-[var(--color-rule)]", className)} />;
}

/** Page shell — consistent gutters and max measure across every section. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

/** Section header: numbered, edge-aligned metadata plus an editorial title. */
export function SectionHead({
  index,
  label,
  title,
  note,
}: {
  index: string;
  label: string;
  title: ReactNode;
  note?: string;
}) {
  return (
    <header className="grid gap-6 border-t border-[var(--color-rule-strong)] pt-5 md:grid-cols-12 md:gap-8">
      <div className="flex items-baseline gap-3 md:col-span-3">
        <Meta tone="signal">{index}</Meta>
        <Meta>{label}</Meta>
      </div>
      <div className="md:col-span-6">
        <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)]">{title}</h2>
      </div>
      {note ? (
        <p className="max-w-[36ch] text-sm leading-relaxed text-muted-foreground md:col-span-3">
          {note}
        </p>
      ) : null}
    </header>
  );
}
