import { profile } from "@/data/profile";
import { Meta } from "@/components/primitives";

/**
 * Portrait slot. Renders the photograph when `profile.profileImage` is set,
 * otherwise an intentional monogram plate with attached metadata.
 */
export function Portrait() {
  const rows = [
    ["Subject", profile.name],
    ["Role", profile.title],
    ["Based", profile.location],
  ] as const;

  return (
    <figure className="relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-rule-strong)] bg-[var(--color-paper-deep)]">
        {profile.profileImage ? (
          <img
            src={profile.profileImage}
            alt={`${profile.name}, ${profile.title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale transition-[filter] duration-700 ease-[var(--ease-out-soft)] hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between p-5">
            <Meta>No photograph on file</Meta>
            <span className="display text-[clamp(4rem,14vw,8rem)] leading-none">
              {profile.initials}
            </span>
            <Meta tone="signal">Slot reserved · /profile.jpg</Meta>
          </div>
        )}

        {/* registration marks — grid motif */}
        <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-[var(--color-rule-strong)]" />
        <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[var(--color-rule-strong)]" />
      </div>

      <figcaption className="mt-3 divide-y divide-[var(--color-rule)] border-t border-[var(--color-rule)]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-1.5">
            <Meta>{k}</Meta>
            <span className="text-right text-sm">{v}</span>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
