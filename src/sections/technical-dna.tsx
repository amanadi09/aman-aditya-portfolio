import { skillGroups } from "@/data/profile";
import { Container, Meta, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";

export function TechnicalDNA() {
  return (
    <section
      id="systems"
      aria-labelledby="systems-title"
      data-surface="ink"
      className="bg-[var(--color-paper)] py-24 text-[var(--color-ink)] sm:py-32"
    >
      <Container>
        <SectionHead
          index="03"
          label="Technical map"
          title={<span id="systems-title">The stack, sorted by where it lives</span>}
          note="Grouped by layer rather than rated — each entry is something used in production support work, coursework or a shipped build."
        />

        <div className="mt-14 gap-x-10 sm:columns-2 lg:columns-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 60} className="mb-12 break-inside-avoid">
              <div className="flex items-baseline justify-between border-b border-[var(--color-rule-strong)] pb-2">
                <Meta tone="ink">{group.label}</Meta>
                <Meta>{group.note}</Meta>
              </div>
              <ul className="mt-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 border-b border-[var(--color-rule)] py-2 last:border-0"
                  >
                    <span
                      aria-hidden
                      className="h-1 w-1 shrink-0 bg-[var(--color-rule-strong)] transition-colors duration-300 group-hover:bg-accent"
                    />
                    <span className="text-[0.95rem] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
