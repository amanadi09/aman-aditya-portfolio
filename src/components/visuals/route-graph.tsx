import { useState } from "react";
import { Meta } from "@/components/primitives";
import { cn } from "@/lib/utils";

type Node = { id: string; x: number; y: number; label: string };

const NODES: Node[] = [
  { id: "a", x: 40, y: 140, label: "Origin" },
  { id: "b", x: 130, y: 52, label: "Hub N" },
  { id: "c", x: 150, y: 210, label: "Hub S" },
  { id: "d", x: 250, y: 110, label: "Junction" },
  { id: "e", x: 300, y: 218, label: "Coastal" },
  { id: "f", x: 385, y: 70, label: "Highland" },
  { id: "g", x: 420, y: 176, label: "Destination" },
];

const EDGES: [string, string][] = [
  ["a", "b"],
  ["a", "c"],
  ["b", "d"],
  ["c", "d"],
  ["c", "e"],
  ["d", "f"],
  ["d", "e"],
  ["e", "g"],
  ["f", "g"],
];

const PATHS: Record<string, string[]> = {
  distance: ["a", "b", "d", "f", "g"],
  cost: ["a", "c", "e", "g"],
  connectivity: ["a", "c", "d", "e", "g"],
};

const CRITERIA = [
  { key: "distance", label: "Shortest distance" },
  { key: "cost", label: "Lowest cost" },
  { key: "connectivity", label: "Best connectivity" },
] as const;

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export function RouteGraph() {
  const [criterion, setCriterion] = useState<keyof typeof PATHS>("distance");
  const path: string[] = PATHS[criterion] ?? [];
  const inPath = (a: string, b: string) => {
    const i = path.indexOf(a);
    return i !== -1 && (path[i + 1] === b || path[i - 1] === b);
  };

  return (
    <div className="w-full">
      <div className="border border-[var(--color-rule-strong)] bg-[var(--color-card)]">
        <div
          className="flex flex-wrap items-center gap-1 border-b border-[var(--color-rule)] px-3 py-2"
          role="group"
          aria-label="Route criterion"
        >
          {CRITERIA.map((c) => (
            <button
              key={c.key}
              type="button"
              aria-pressed={criterion === c.key}
              onClick={() => setCriterion(c.key)}
              className={cn(
                "meta border px-2 py-1 transition-colors duration-200",
                criterion === c.key
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <svg
          viewBox="0 0 470 265"
          className="h-auto w-full"
          role="img"
          aria-label={`Concept route network with the ${criterion} path highlighted from origin to destination`}
        >
          {EDGES.map(([a, b]) => {
            const from = byId(a);
            const to = byId(b);
            const active = inPath(a, b);
            return (
              <line
                key={`${a}${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={active ? "var(--color-signal)" : "var(--color-rule-strong)"}
                strokeWidth={active ? 1.75 : 0.75}
                strokeDasharray={active ? undefined : "3 4"}
                className="transition-all duration-500 ease-[var(--ease-out-soft)]"
              />
            );
          })}
          {NODES.map((n) => {
            const active = path.includes(n.id);
            return (
              <g key={n.id} className="transition-opacity duration-500">
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={active ? 5 : 3}
                  fill={active ? "var(--color-signal)" : "var(--color-paper)"}
                  stroke={active ? "var(--color-signal)" : "var(--color-rule-strong)"}
                  className="transition-all duration-500 ease-[var(--ease-out-soft)]"
                />
                <text
                  x={n.x}
                  y={n.y - 12}
                  textAnchor="middle"
                  className="meta"
                  fill="currentColor"
                  fontSize="8"
                  opacity={active ? 0.95 : 0.45}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-rule)] px-4 py-2.5">
          <Meta>Nodes {NODES.length} · Edges {EDGES.length} · Weighted</Meta>
          <Meta tone="signal">{path.join(" → ").toUpperCase()}</Meta>
        </div>
      </div>
      <p className="mt-2 text-right">
        <Meta>Concept visualization · abstracted from the project graph</Meta>
      </p>
    </div>
  );
}
