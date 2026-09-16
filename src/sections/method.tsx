import { method } from "@/data/profile";
import { Container, Meta, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";

export function Method() {
  return (
    <section id="profile" aria-labelledby="method-title" className="py-24 sm:py-32">
      <Container>
        <SectionHead
          index="02"
          label="Engineering profile"
          title={<span id="method-title">How the work actually moves</span>}
          note="A single loop, applied to production SaaS defects and to the applications built afterwards."
        />

        <ol className="mt-14 grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-5">
          {method.map((step, i) => (
            <Reveal
              as="li"
              key={step.index}
              delay={i * 70}
              className="group relative flex flex-col gap-4 bg-[var(--color-paper)] p-5 transition-colors duration-300 hover:bg-[var(--color-card)] md:p-6"
            >
              <div className="flex items-center justify-between">
                <Meta tone="signal">{step.index}</Meta>
                <span
                  aria-hidden
                  className="h-px w-6 bg-[var(--color-rule-strong)] transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:w-10 group-hover:bg-accent"
                />
              </div>
              <h3 className="display text-2xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
