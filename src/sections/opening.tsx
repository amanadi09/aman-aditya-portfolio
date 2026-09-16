import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { Container, Meta } from "@/components/primitives";
import { Portrait } from "@/components/portrait";
import { Reveal } from "@/components/reveal";

export function Opening() {
  return (
    <section id="top" className="relative pt-24 sm:pt-28">
      <Container>
        <div className="grid gap-10 border-t border-[var(--color-rule-strong)] pt-6 lg:grid-cols-12 lg:gap-8">
          {/* edge metadata */}
          <div className="flex flex-row flex-wrap gap-x-8 gap-y-3 lg:col-span-2 lg:flex-col lg:gap-y-6">
            <div>
              <Meta tone="signal">Software Engineer</Meta>
            </div>
            <div>
              <Meta>{profile.location}</Meta>
            </div>
            <div>
              <Meta>Open to engineering roles</Meta>
            </div>
          </div>

          {/* editorial statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="display text-[clamp(2.75rem,8.2vw,6.4rem)]">
                Building interfaces.
                <br />
                Diagnosing what
                <br />
                <span className="italic">happens underneath.</span>
              </h1>
            </Reveal>

            <Reveal delay={120} className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-[46ch] text-base leading-relaxed text-muted-foreground">
                {profile.summary}
              </p>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 self-start border-b border-[var(--color-rule-strong)] pb-1 transition-colors duration-300 hover:border-accent hover:text-accent sm:self-end"
              >
                <Meta className="text-inherit">Selected work</Meta>
                <ArrowDown
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
          </div>

          {/* portrait */}
          <Reveal delay={200} className="lg:col-span-3 lg:-mt-14">
            <Portrait />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
