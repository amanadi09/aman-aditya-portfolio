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
    <figure className="relative flex w-full max-w-[230px] flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-full border border-[var(--color-rule-strong)] bg-[var(--color-paper-deep)]">
        {profile.profileImage ? (
          <img
            src={profile.profileImage}
            alt={`${profile.name}, ${profile.title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top grayscale transition-[filter] duration-700 ease-[var(--ease-out-soft)] hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-5 text-center">
            <span className="display text-[clamp(3rem,10vw,5.5rem)] leading-none">
              {profile.initials}
            </span>
            <Meta tone="signal">Slot reserved · /profile.jpg</Meta>
          </div>
        )}
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
