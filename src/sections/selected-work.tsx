import { projects, type Project } from "@/data/profile";
import { Container, Meta, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { AnalyticsPreview } from "@/components/visuals/analytics-preview";
import { ComponentWorkbench } from "@/components/visuals/component-workbench";
import { RouteGraph } from "@/components/visuals/route-graph";

function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "analytics") return <AnalyticsPreview />;
  if (kind === "workbench") return <ComponentWorkbench />;
  return <RouteGraph />;
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="grid gap-10 border-t border-[var(--color-rule-strong)] pt-6 lg:grid-cols-12 lg:gap-10"
    >
      {/* pinned identity column */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-24">
          <div className="flex items-baseline gap-3">
            <Meta tone="signal">{project.index}</Meta>
            <Meta>{project.status}</Meta>
          </div>
          <h3
            id={`${project.id}-title`}
            className="display mt-4 text-[clamp(2rem,4.6vw,3.25rem)]"
          >
            {project.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">{project.kicker}</p>

          <dl className="mt-8 border-t border-[var(--color-rule)]">
            {project.outcomes.map((o) => (
              <div
                key={o.label}
                className="flex items-baseline justify-between gap-4 border-b border-[var(--color-rule)] py-2.5"
              >
                <dt className="max-w-[20ch] text-sm text-muted-foreground">{o.label}</dt>
                <dd className="display text-xl">{o.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
            {project.stack.map((s) => (
              <li key={s}>
                <Meta>{s}</Meta>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* narrative + visual */}
      <div className="lg:col-span-8">
        <Reveal>
          <ProjectVisual kind={project.visual} />
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <Meta>Context</Meta>
            <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed">{project.context}</p>
          </div>
          <div>
            <Meta>Implementation</Meta>
            <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed">
              {project.implementation}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Meta>Engineering decisions</Meta>
          <dl className="mt-3 border-t border-[var(--color-rule)]">
            {project.decisions.map((d) => (
              <div
                key={d.label}
                className="grid gap-1 border-b border-[var(--color-rule)] py-3 sm:grid-cols-[14rem_1fr] sm:gap-6"
              >
                <dt className="text-sm font-medium">{d.label}</dt>
                <dd className="max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
                  {d.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8">
          <Meta>Features</Meta>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
            {project.features.map((f) => (
              <li
                key={f}
                className="border border-[var(--color-rule)] px-2.5 py-1 text-xs text-muted-foreground"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-24 sm:py-32">
      <Container>
        <SectionHead
          index="01"
          label="Selected work"
          title={<span id="work-title">Three systems, built end to end</span>}
          note="Each build is presented with its context, the decisions behind it and what it produced."
        />
        <div className="mt-16 space-y-24 sm:space-y-32">
          {projects.map((p) => (
            <ProjectEntry key={p.id} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
