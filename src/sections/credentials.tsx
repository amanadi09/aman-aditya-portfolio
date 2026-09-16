import { certifications, education } from "@/data/profile";
import { Container, Meta, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";

export function Credentials() {
  return (
    <section aria-labelledby="credentials-title" className="pb-24 pt-8 sm:pb-32">
      <Container>
        <SectionHead
          index="05"
          label="Certifications"
          title={<span id="credentials-title">Recorded, briefly</span>}
        />

        <dl className="mt-10 border-t border-[var(--color-rule)]">
          {certifications.map((c, i) => (
            <Reveal
              key={c.name}
              delay={i * 50}
              className="grid gap-1 border-b border-[var(--color-rule)] py-4 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <div className="md:col-span-3">
                <Meta>{c.issuer}</Meta>
              </div>
              <div className="md:col-span-5">
                <span className="text-[1.05rem]">{c.name}</span>
              </div>
              <p className="max-w-[42ch] text-sm text-muted-foreground md:col-span-4">{c.topics}</p>
            </Reveal>
          ))}
        </dl>

        {/* Education — understated closing academic note */}
        <div className="mt-20 grid gap-6 border-t border-[var(--color-rule-strong)] pt-5 md:grid-cols-12">
          <div className="flex items-baseline gap-3 md:col-span-3">
            <Meta tone="signal">06</Meta>
            <Meta>Education</Meta>
          </div>
          <div className="md:col-span-6">
            <h2 className="display text-[clamp(1.6rem,3vw,2.25rem)]">{education.degree}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{education.institution}</p>
          </div>
          <div className="flex items-baseline gap-6 md:col-span-3 md:justify-end">
            <div>
              <Meta>Period</Meta>
              <p className="mt-1 text-sm">{education.period}</p>
            </div>
            <div>
              <Meta>{education.scoreLabel}</Meta>
              <p className="mt-1 text-sm">{education.score}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
