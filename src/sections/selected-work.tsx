import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/data/profile";
import { Container, Meta, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
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
      className="grid min-w-0 grid-cols-1 gap-10 border-t border-[var(--color-rule-strong)] pt-6 lg:grid-cols-12 lg:gap-10"
    >
      {/* pinned identity column */}
      <div className="min-w-0 lg:col-span-4">
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
      <div className="min-w-0 lg:col-span-8">
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
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];

  if (!project) return null;

  return (
    <section id="work" aria-labelledby="work-title" className="py-24 sm:py-32">
      <Container>
        <SectionHead
          index="01"
          label="Selected work"
          title={<span id="work-title">Three systems, built end to end</span>}
          note="Each build is presented with its context, the decisions behind it and what it produced."
        />
        <div className="mt-12 grid gap-8 border-y border-[var(--color-rule)] py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div role="group" aria-label="Choose a project" className="flex flex-wrap gap-x-8 gap-y-4">
            {projects.map((item, index) => (
              <Button
                key={item.id}
                type="button"
                variant="ghost"
                size="default"
                aria-pressed={activeProject === index}
                onClick={() => setActiveProject(index)}
                className={`group h-auto min-h-10 min-w-0 items-baseline justify-start gap-2 rounded-none border-b-2 border-transparent px-0 py-2 text-left whitespace-normal shadow-none transition-colors hover:bg-transparent hover:text-accent aria-pressed:border-accent ${activeProject === index ? "text-foreground" : "text-muted-foreground"}`}
              >
                <Meta tone={activeProject === index ? "signal" : "quiet"}>{item.index}</Meta>
                <span className="display text-2xl sm:text-3xl">{item.title}</span>
              </Button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 md:justify-end">
            <Meta>{String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</Meta>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-none"
                aria-label="Previous project"
                onClick={() => setActiveProject((activeProject - 1 + projects.length) % projects.length)}
              >
                <ArrowLeft aria-hidden />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-none"
                aria-label="Next project"
                onClick={() => setActiveProject((activeProject + 1) % projects.length)}
              >
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12" aria-live="polite" aria-atomic="true">
          <ProjectEntry key={project.id} project={project} />
        </div>
      </Container>
    </section>
  );
}
