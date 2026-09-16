/**
 * Single source of truth for all portfolio content.
 * Everything here is resume-backed. Empty strings are intentional
 * configuration placeholders — the UI hides what is not provided.
 */

export type Link = { label: string; href: string; external?: boolean };

export const profile = {
  name: "Aman Aditya",
  initials: "AA",
  title: "Software Engineer",
  location: "India",
  email: "amanaditya565@gmail.com",
  phone: "+91 7979928386",
  phoneHref: "tel:+917979928386",
  linkedin: "https://www.linkedin.com/in/aman-adi/",
  /** CONFIG: paste the full GitHub profile URL here */
  github: "",
  resume: "/aman-aditya-resume.pdf",
  profileImage: "/aman-aditya-profile.png",
  summary:
    "Computer Science graduate who supports and troubleshoots web-based SaaS products in production — reading requests, logs and authentication flows to find out what actually happened, then building the interfaces that sit on top.",
} as const;

export type MethodStep = {
  index: string;
  title: string;
  body: string;
};

export const method: MethodStep[] = [
  {
    index: "01",
    title: "Investigate",
    body: "Browser behaviour, API requests and application logs are the first evidence. Postman and DevTools narrow the surface before anything is assumed.",
  },
  {
    index: "02",
    title: "Reproduce",
    body: "Customer-reported defects are reconstructed with real environment and steps, so the failure can be observed rather than described.",
  },
  {
    index: "03",
    title: "Understand",
    body: "Root-cause hypotheses are formed and tested against authentication flows, HTTP traffic and log output until one of them survives.",
  },
  {
    index: "04",
    title: "Build",
    body: "Findings turn into web applications and reusable React + TypeScript components with the same discipline used to diagnose them.",
  },
  {
    index: "05",
    title: "Validate",
    body: "Fixes are verified with engineering and product teams, and documented as reproducible reports with steps, logs and environment detail.",
  },
];

export type SkillGroup = { label: string; note: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    note: "Written daily",
    items: ["Python", "JavaScript", "TypeScript", "HTML5", "CSS3", "SQL"],
  },
  {
    label: "Frontend",
    note: "Interface layer",
    items: ["React.js", "Tailwind CSS"],
  },
  {
    label: "Backend / API",
    note: "What happens underneath",
    items: ["Node.js", "REST APIs"],
  },
  {
    label: "Diagnostics",
    note: "Production investigation",
    items: [
      "Postman",
      "Browser DevTools",
      "HTTP",
      "Authentication flows",
      "Application logs",
    ],
  },
  {
    label: "Engineering",
    note: "Practice",
    items: [
      "Root-cause analysis",
      "Accessibility",
      "Reusable components",
      "API caching",
      "Optimistic UI",
      "Lazy loading",
      "Git",
    ],
  },
  {
    label: "Working",
    note: "With people",
    items: [
      "Problem solving",
      "Team collaboration",
      "Effective communication",
      "Analytical thinking",
    ],
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  status: string;
  context: string;
  implementation: string;
  features: string[];
  decisions: { label: string; body: string }[];
  outcomes: { value: string; label: string }[];
  stack: string[];
  visual: "analytics" | "workbench" | "graph";
};

export const projects: Project[] = [
  {
    id: "support-analytics",
    index: "01",
    title: "Support Analytics Platform",
    kicker: "Dashboard engineering · Frontend architecture",
    status: "Personal build · Production-style",
    context:
      "A production-style analytics dashboard modelled on enterprise SaaS support tooling: the kind of surface that has to stay responsive while it holds filters, charts and a dense data grid at the same time.",
    implementation:
      "Built from a set of reusable React components rather than page-specific markup. Data reads are cached at the API layer, heavy views are lazy loaded, and mutations update the interface optimistically before the response lands.",
    features: [
      "KPI overview",
      "Interactive charts",
      "Advanced filtering",
      "Searchable data grid",
      "Pagination",
      "CSV export",
      "Responsive dashboards",
    ],
    decisions: [
      {
        label: "Composition over pages",
        body: "Every panel is assembled from the same primitives, so a new view costs layout work — not new components.",
      },
      {
        label: "Cache before fetch",
        body: "Repeated reads resolve from the API cache, keeping filter and pagination changes instant.",
      },
      {
        label: "Optimistic by default",
        body: "The grid reflects intent immediately and reconciles against the server response.",
      },
    ],
    outcomes: [
      { value: "Reusable", label: "React component architecture" },
      { value: "Cached", label: "API reads across views" },
      { value: "Lazy", label: "Loaded heavy panels" },
    ],
    stack: ["React.js", "TypeScript", "Tailwind CSS", "REST API"],
    visual: "analytics",
  },
  {
    id: "component-library",
    index: "02",
    title: "Component Library",
    kicker: "Design system · Accessibility",
    status: "Personal build · 30+ components",
    context:
      "A reusable design system built to answer a single question: what does it take for thirty components to behave consistently when someone themes them, navigates them by keyboard, or reads them with a screen reader?",
    implementation:
      "Tables, modals, drawers, dropdowns, accordions and form controls share one token layer. Dark mode and theming are driven by the tokens rather than component overrides, and every interactive element carries keyboard and ARIA behaviour.",
    features: [
      "Tables",
      "Modals",
      "Drawers",
      "Dropdowns",
      "Accordions",
      "Form controls",
      "Dark mode",
      "Theme customization",
      "Keyboard navigation",
      "ARIA accessibility",
    ],
    decisions: [
      {
        label: "Tokens, not overrides",
        body: "Theme and dark mode resolve through shared variables, so a component never re-declares colour.",
      },
      {
        label: "Keyboard is the baseline",
        body: "Focus order, escape handling and roving focus are part of the component contract, not an afterthought.",
      },
      {
        label: "Responsive primitives",
        body: "Each control defines its own compact behaviour instead of relying on the page to hide it.",
      },
    ],
    outcomes: [
      { value: "30+", label: "UI components" },
      { value: "ARIA", label: "Roles and keyboard support" },
      { value: "Themeable", label: "Including dark mode" },
    ],
    stack: ["React.js", "TypeScript", "Tailwind CSS"],
    visual: "workbench",
  },
  {
    id: "tour-vista",
    index: "03",
    title: "Tour Vista",
    kicker: "Tourism analytics · Graph algorithms",
    status: "Academic project",
    context:
      "A tourism analytics platform over 500+ destination and route records, where choosing a route means weighing distance, cost and connectivity at once instead of reading a table.",
    implementation:
      "Destinations and routes are modelled as a weighted graph. Shortest-path traversal ranks candidate routes, and distance, cost and connectivity analyses are derived from the same structure.",
    features: [
      "Graph-based shortest path",
      "Distance analysis",
      "Cost analysis",
      "Connectivity analysis",
      "500+ destination and route records",
    ],
    decisions: [
      {
        label: "One graph, three questions",
        body: "Distance, cost and connectivity read from a single weighted structure rather than separate datasets.",
      },
      {
        label: "Ranking over listing",
        body: "Shortest-path output is presented as ordered candidates, which is what shortened the selection step.",
      },
    ],
    outcomes: [
      { value: "30–40%", label: "Reduction in route-selection time" },
      { value: "500+", label: "Destination and route records" },
    ],
    stack: ["Python", "SQL", "Graph algorithms"],
    visual: "graph",
  },
];

export type Experience = {
  role: string;
  company: string;
  summary: string;
  tracks: { label: string; points: string[] }[];
};

export const experience: Experience[] = [
  {
    role: "Technical Support Executive",
    company: "OnceHub Technologies Pvt Ltd",
    summary:
      "Diagnosing and resolving technical issues across web-based SaaS products in production, and carrying findings back into engineering and product.",
    tracks: [
      {
        label: "Debugging",
        points: [
          "Diagnosed and resolved technical issues across web-based SaaS products",
          "Investigated browser behaviour and analysed API requests",
          "Troubleshot authentication flows and reviewed application logs",
        ],
      },
      {
        label: "Reproduction",
        points: [
          "Reproduced customer-reported defects against real environments",
          "Captured steps, logs and environment information for each case",
        ],
      },
      {
        label: "Root cause",
        points: [
          "Formed root-cause hypotheses and tested them against evidence",
          "Separated product defects from configuration and environment issues",
        ],
      },
      {
        label: "Collaboration",
        points: [
          "Worked with engineering and product teams on defect triage",
          "Wrote detailed, reproducible bug reports",
        ],
      },
      {
        label: "Validation",
        points: [
          "Validated fixes before they reached customers",
          "Documented technical findings for future investigation",
        ],
      },
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  topics: string;
};

export const certifications: Certification[] = [
  {
    name: "Salesforce Launchpad Program",
    issuer: "PwC",
    topics: "Platform fundamentals, CRM workflows, business process modelling",
  },
  {
    name: "Introduction to Relational Databases",
    issuer: "IBM",
    topics: "Relational modelling, SQL querying, schema design",
  },
  {
    name: "Relational Database Administration",
    issuer: "Certification",
    topics: "Database administration, integrity, access and maintenance",
  },
];

export const education = {
  degree: "Bachelor of Engineering in Computer Science",
  institution: "Chandigarh University",
  period: "July 2022 — 2026",
  score: "8.26 / 10",
  scoreLabel: "SGPA",
};

export const navItems = [
  { id: "work", label: "Work" },
  { id: "profile", label: "Profile" },
  { id: "systems", label: "Systems" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
