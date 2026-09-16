import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { Meta } from "@/components/primitives";
import { cn } from "@/lib/utils";

const ids = navItems.map((n) => n.id);

export function SiteNav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/88 backdrop-blur-[6px]">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          <a href="#top" className="flex items-baseline gap-2.5" aria-label={`${profile.name} — home`}>
            <span className="display text-xl leading-none">{profile.initials}</span>
            <span className="hidden sm:inline">
              <Meta>{profile.name}</Meta>
            </span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative flex items-center gap-2 py-2"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-1 w-1 rounded-full transition-colors duration-300",
                        isActive ? "bg-accent" : "bg-transparent",
                      )}
                    />
                    <Meta
                      className={cn(
                        "transition-colors duration-200",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Meta>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={profile.resume}
              download
              className="hidden items-center gap-1.5 border border-[var(--color-rule-strong)] px-3 py-1.5 transition-colors duration-200 hover:border-accent hover:text-accent sm:flex"
            >
              <Meta className="text-inherit">Resume</Meta>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Meta tone="ink">Menu</Meta>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile index sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-[55] flex flex-col bg-[var(--color-paper)] md:hidden"
      >
        <div className="flex h-14 items-center justify-between border-b border-[var(--color-rule)] px-5">
          <Meta>Index</Meta>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto px-5 pt-2">
          {navItems.map((item, i) => (
            <li key={item.id} className="border-b border-[var(--color-rule)]">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-5"
              >
                <span className="display text-4xl">{item.label}</span>
                <Meta tone="signal">{String(i + 1).padStart(2, "0")}</Meta>
              </a>
            </li>
          ))}
        </ul>
        <div className="space-y-2 border-t border-[var(--color-rule)] px-5 py-6">
          <a href={`mailto:${profile.email}`} className="block">
            <Meta tone="ink">{profile.email}</Meta>
          </a>
          <a href={profile.phoneHref} className="block">
            <Meta tone="ink">{profile.phone}</Meta>
          </a>
          <a href={profile.resume} download className="inline-flex items-center gap-1.5 pt-2 text-accent">
            <Meta tone="signal">Download resume</Meta>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </>
  );
}
