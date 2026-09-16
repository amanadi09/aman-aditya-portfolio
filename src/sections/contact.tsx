import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, Meta } from "@/components/primitives";
import { ResumeAction } from "@/components/resume-action";
import { Reveal } from "@/components/reveal";

type Channel = { label: string; value: string; href: string; external?: boolean };

export function Contact() {
  const channels: Channel[] = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "Phone", value: profile.phone, href: profile.phoneHref },
    ...(profile.linkedin
      ? [{ label: "LinkedIn", value: "Profile", href: profile.linkedin, external: true }]
      : []),
    ...(profile.github
      ? [{ label: "GitHub", value: "Repositories", href: profile.github, external: true }]
      : []),
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-surface="ink"
      className="bg-[var(--color-paper)] py-24 text-[var(--color-ink)] sm:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Meta tone="signal">07 — Contact</Meta>
            <Reveal>
              <h2 id="contact-title" className="display mt-6 text-[clamp(2.25rem,6vw,4.5rem)]">
                Need an engineer who can read the interface
                <span className="italic"> and the request behind it?</span>
              </h2>
            </Reveal>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
              Available for software engineering, frontend and product support engineering roles.
              Reply times are same-day.
            </p>
          </div>

          <div className="lg:col-span-5 lg:pt-14">
            <dl className="border-t border-[var(--color-rule-strong)]">
              {channels.map((c) => (
                <div key={c.label} className="border-b border-[var(--color-rule)]">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    className="group flex items-baseline justify-between gap-6 py-4 transition-colors duration-200 hover:text-accent"
                  >
                    <dt>
                      <Meta>{c.label}</Meta>
                    </dt>
                    <dd className="flex items-center gap-2 text-[1.05rem]">
                      {c.value}
                      <ArrowUpRight
                        className="h-4 w-4 opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </dd>
                  </a>
                </div>
              ))}
            </dl>

            {(!profile.linkedin || !profile.github) && (
              <p className="mt-4 max-w-[40ch] text-xs leading-relaxed text-muted-foreground">
                {!profile.linkedin && !profile.github
                  ? "LinkedIn and GitHub links are not configured yet."
                  : !profile.linkedin
                    ? "LinkedIn link is not configured yet."
                    : "GitHub link is not configured yet."}{" "}
                They appear here automatically once added.
              </p>
            )}

            <div className="mt-8">
              <ResumeAction />
            </div>
          </div>
        </div>

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-rule)] pt-5">
          <Meta>
            {profile.name} · {profile.title} · {profile.location}
          </Meta>
          <Meta>Built with React, TypeScript and Tailwind</Meta>
        </footer>
      </Container>
    </section>
  );
}
