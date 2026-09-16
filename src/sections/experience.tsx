import { useState } from "react";
import { Plus } from "lucide-react";
import { experience } from "@/data/profile";
import { Container, Meta, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 sm:py-32">
      <Container>
        <SectionHead
          index="04"
          label="Experience"
          title={<span id="experience-title">Production systems, under investigation</span>}
          note="Support work at the level where the browser, the request and the log all have to agree."
        />

        {experience.map((role) => (
          <div key={role.company} className="mt-14 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <h3 className="display text-[clamp(1.75rem,3.4vw,2.5rem)]">{role.role}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{role.company}</p>
                <p className="mt-6 max-w-[40ch] text-[0.95rem] leading-relaxed">{role.summary}</p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ul className="border-t border-[var(--color-rule-strong)]">
                {role.tracks.map((track, i) => {
                  const isOpen = open === i;
                  const panelId = `track-${i}`;
                  return (
                    <Reveal as="li" key={track.label} delay={i * 50} className="border-b border-[var(--color-rule)]">
                      <h4>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? -1 : i)}
                          className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                        >
                          <span className="flex items-baseline gap-5">
                            <Meta tone={isOpen ? "signal" : "quiet"}>
                              {String(i + 1).padStart(2, "0")}
                            </Meta>
                            <span className="display text-2xl sm:text-3xl">{track.label}</span>
                          </span>
                          <Plus
                            className={cn(
                              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[var(--ease-out-soft)]",
                              isOpen && "rotate-45 text-accent",
                            )}
                            aria-hidden
                          />
                        </button>
                      </h4>
                      <div
                        id={panelId}
                        hidden={!isOpen}
                        className="pb-6 pl-0 sm:pl-[3.75rem]"
                      >
                        <ul className="space-y-2">
                          {track.points.map((p) => (
                            <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed">
                              <span
                                aria-hidden
                                className="mt-2.5 h-px w-4 shrink-0 bg-[var(--color-rule-strong)]"
                              />
                              <span className="max-w-[60ch] text-muted-foreground">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
