/**
 * Single source of truth for the site AND the generated PDF resume.
 *
 * Plain JS (not TS) so `scripts/generate-resume.mjs` can import it directly
 * under plain Node, while `portfolio.ts` re-exports it with types for Astro.
 * Edit here — the site and the resume both follow.
 */

export const personal = {
  name: "Rishikesh S",
  role: "Founding Software Engineer",
  location: "Chennai, India",
  email: "rishikeshpavithram@gmail.com",
  status: "Building at Mando",
  experience: "4+ years",
  /** Rendered as HTML in the hero — <strong> allowed. Keep it plain-English and generic. */
  bio: "I'm a software engineer who <strong>owns products end to end</strong> — the schema, the interface, and everything that has to work between them. Founding engineer at <strong>Mando</strong> today. Before that, two years on <strong>real-time trading systems</strong>, where being slow was the same as being wrong.",
  aboutParagraphs: [
    "I studied <strong>Chemical Engineering at IIT Madras</strong>, which taught me to think in systems, flows and balances long before I thought in APIs. Somewhere between a process simulation assignment and a hostel-room Android app, software won.",
    "What I like is the part most teams hand off. A booking slot that is wrong by an hour, a webhook that fires twice, a query that is fine until the 95th percentile — those bugs live <em>between</em> layers, and the only reliable way to kill them is to own both sides. Trading systems taught me the other half: a latency budget makes you honest, because either the number moved or it didn't.",
    "Outside work I write small tools I actually want to use: <strong>leak</strong>, a terminal subscription manager in Go; <strong>deadfall</strong>, an npm CLI that finds React components nothing renders; a weather CLI that draws animated ASCII scenes. I follow cricket closely enough that building an NRR and playoff-scenario engine for the IPL felt like a reasonable way to spend a weekend.",
  ],
  social: {
    github: "https://github.com/RishikeshSreekumar",
    linkedin: "https://www.linkedin.com/in/rishikesh-s-0a4a47166/",
    cal: "https://cal.com/rishikesh-s",
  },
  website: "https://rishikeshsreekumar.github.io",
  resumeFile: "Rishikesh-S-Resume.pdf",
};

/** Headline numbers for the hero strip. `value` is what the count-up counts to. */
export const stats = [
  { label: "years shipping", value: 4, suffix: "+" },
  { label: "products shipped 0→1", value: 5, suffix: "+" },
  { label: "open source tools", value: 4 },
  { label: "languages in production", value: 6 },
];

export const experience = [
  {
    company: "Mando",
    role: "Founding Software Engineer",
    period: "Sep 2024 - Present",
    location: "Remote",
    description:
      "First engineer. Five product surfaces from first commit in under two years, on a stack I chose and still run.",
    highlights: [
      "Built the natural language search and conversational AI layer over Workday's knowledge base — retrieval, ranking and cited answer generation — so enterprise users get an answer instead of a list of documents",
      "Shipped the entire expert-session path alone: time-zone-correct booking, live video on Azure Communication Services, in-call controls, recording, and a browser-based editor for trimming and annotating the footage afterwards",
      "Built the service management platform underneath it — ticket intake, routing, expert assignment, resolution — plus a Chrome extension that records a workflow once and writes the step-by-step documentation from it",
      "Made the product buyable: Stripe subscriptions, checkout, invoicing and webhook-driven entitlement, which turned a demo into the company's first paid tier",
      "Run the whole stack myself — Next.js and Tailwind on the front, FastAPI and PostgreSQL behind it, Terraform for every environment — with no handoffs between layers to lose things in",
    ],
    resumeHighlights: [
      "Built natural language search over Workday's knowledge base: retrieval, ranking and cited answers",
      "Shipped expert sessions end to end: time-zone-aware booking, Azure video, recording, media editor",
      "Built the ticketing platform - intake, routing, assignment, resolution - and a workflow-to-docs extension",
      "Integrated Stripe end to end - subscriptions, checkout, invoicing, entitlement - for the first paid tier",
      "First engineer: five product surfaces from first commit in under two years, solo across the full stack",
    ],
    tags: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Terraform",
      "Stripe",
      "Azure Communication Services",
      "Chrome Extensions",
      "LLMs",
    ],
  },
  {
    company: "Quantitative Brokers",
    role: "Software Engineer",
    period: "Jul 2022 - Sep 2024",
    location: "Chennai, India",
    description:
      "Real-time trading systems for a quantitative execution firm — order monitoring, risk control and order entry, where every millisecond is somebody's money.",
    highlights: [
      "Designed an order monitoring system handling 200 messages/sec of 800-1000 bytes from multiple upstream sources",
      "Cut application load time from ~40 seconds to under 1 second by moving data loading server-side",
      "Reduced latency by 20% and CPU usage by 50% on the critical path of the order entry application",
      "Implemented DV01-based risk calculations for CASH instruments, improving cash stream revenue by 5%",
      "Built real-time aggregation and dynamic market data ladders for desk analysts",
    ],
    tags: ["Angular", "Node.js", ".NET", "PostgreSQL", "Real-time Systems"],
  },
  {
    company: "Quantitative Brokers",
    role: "Software Development Intern",
    period: "May 2021 - Jul 2021",
    location: "Chennai, India",
    description:
      "Prototypes for desktop interop and market data visualisation that went on to ship.",
    highlights: [
      "Built a desktop integration prototype with OpenFin, sharing context across four separate applications",
      "Developed an Angular app plotting financial curves from a live kdb+ database using Highcharts",
    ],
    tags: ["Angular", "OpenFin", "kdb+", "Highcharts"],
  },
  {
    company: "Prescribe",
    role: "Android App Developer",
    period: "Feb 2021 - May 2021",
    location: "Remote",
    description: "A healthcare app for patient intake and feedback.",
    highlights: [
      "Built an Android app for collecting patient details and surfacing the feedback collected",
      "Used Firebase for API endpoints and a custom notification system",
      "Instrumented the app to analyse user interaction at each step",
    ],
    tags: ["Android", "Firebase", "Java", "Mobile"],
  },
  {
    company: "Workfence Technologies",
    role: "Software Development Intern",
    period: "May 2020 - Jul 2020",
    location: "Remote",
    description: "Workplace safety and attendance tooling during the pandemic.",
    highlights: [
      "Built a social-distancing mobile app paired with a hardware distance-measuring solution",
      "Built a geofencing-based attendance system and a visualisation interface that scales from 1,000 to 100,000 users",
    ],
    tags: ["Android", "Mobile", "Geofencing", "UI/UX"],
  },
];

export const education = [
  {
    institution: "Indian Institute of Technology, Madras",
    shortName: "IIT Madras",
    degree: "B.Tech, Chemical Engineering",
    period: "2018 - 2022",
    location: "Chennai, India",
    grade: "CGPA 8.58 / 10",
    highlights: [
      "B.Tech in Chemical Engineering with coursework in process modelling, transport phenomena, numerical methods and control systems",
      "Four years of thinking in flows, feedback loops and steady states — the same instincts I now apply to distributed systems",
      "All India Rank 2275 in JEE Advanced 2018, of the 155,000 who qualified to sit it from 1.1M+ JEE Main candidates · Rank 5 in Kerala in KEAM 2018, the state engineering entrance, from ~90,000 candidates",
    ],
  },
];

export const achievements = [
  "All India Rank 2275 · JEE Advanced 2018 (155k qualified from 1.1M+)",
  "Rank 5 in Kerala · KEAM 2018 (~90k candidates)",
];

export const projects = [
  {
    id: "leak",
    title: "leak — Terminal Subscription Manager",
    tagline: "Mark. Sweep. Save.",
    description:
      "Subscriptions are the financial equivalent of a memory leak: you sign up, forget, and months later a zombie process is still draining your account. leak is a local-first TUI that tracks recurring spend, audits it, and tells you what to cancel. Single Go binary, no account, no server, no telemetry.",
    highlight:
      "Ships as a real product, not a repo: Homebrew tap, an install script, prebuilt binaries for macOS, Linux and Windows on amd64 and arm64, semver releases and CI on every push.",
    tags: ["Go", "Bubble Tea", "TUI", "SQLite", "Homebrew", "CI/CD"],
    liveUrl: "https://github.com/RishikeshSreekumar/leak/releases",
    liveLabel: "Releases",
    githubUrl: "https://github.com/RishikeshSreekumar/leak",
    install: "brew install RishikeshSreekumar/tap/leak",
    featured: true,
  },
  {
    id: "deadfall",
    title: "deadfall — Dead Component Detector",
    tagline: "Find the dead React components. Prove it before you delete them.",
    description:
      "A CLI that parses a Next.js codebase with ts-morph, builds the component usage graph, and reports every component nothing actually renders. Exits non-zero when anything is dead, so the same command doubles as a CI gate. Generates an interactive HTML report to explore the graph. Never touches your code unless you pass --fix.",
    highlight:
      "App Router aware static analysis over the whole import graph — no server, no build step, no code changes. Published on npm and runnable with a single npx command.",
    tags: ["TypeScript", "Node.js", "ts-morph", "Static Analysis", "npm"],
    liveUrl: "https://www.npmjs.com/package/deadfall",
    liveLabel: "View on npm",
    githubUrl: "https://github.com/RishikeshSreekumar/deadfall",
    install: "npx deadfall check ./my-next-app",
    featured: true,
  },
  {
    id: "ipl-fanpark",
    title: "FanPark — IPL Playoff Race Tracker",
    tagline: "Pick a result. Watch the table move.",
    description:
      "A companion app for the IPL 2026 season. Pick your team and get a dashboard of fixtures, form and net run rate; then play a result forward — Match Impact recomputes NRR and the points table, and Playoff Race answers whether the top four is still reachable. Built because arguing about qualification scenarios is better with the arithmetic done.",
    highlight:
      "NRR is the part every fan gets wrong: it is computed over full quota overs, not overs faced, and an all-out side is charged the whole 20. Getting that right is what makes a projected table trustworthy.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    liveUrl: "https://fanpark.vercel.app",
    liveLabel: "Live demo",
    githubUrl: "https://github.com/RishikeshSreekumar/fanpark",
    featured: true,
  },
  {
    id: "rubiks-cube-solver",
    title: "Rubik's Cube Solver",
    tagline: "Scan a real cube. Watch it solve itself.",
    description:
      "Paint the stickers, generate a scramble, or point your webcam at a real cube — then watch an animated, step-by-step solution on a 3D model you can orbit. Kociemba's two-phase algorithm runs in a Web Worker so the UI never drops a frame. Installable as a PWA and works offline after first load.",
    highlight:
      "Physically impossible cubes are rejected with the actual reason — miscount, wrong centre, twisted corner, flipped edge, swap parity — instead of a generic failure.",
    tags: ["Next.js", "Three.js", "Web Workers", "PWA", "Computer Vision"],
    featured: true,
  },
];

/** Smaller public repos — the shelf. */
export const openSource = [
  {
    name: "weather-cast",
    repo: "nimbus",
    lang: "Go",
    description:
      "Animated ASCII weather in the terminal — a scene per condition, day/night palettes, 12h sparkline, 5-day strip. Single binary, no API key.",
    url: "https://github.com/RishikeshSreekumar/nimbus",
  },
  {
    name: "YT Music Romanizer",
    repo: "youtube_music_lyrics",
    lang: "TypeScript",
    description:
      "Offline Chrome extension that romanizes non-Latin YouTube Music lyrics — Tamil, Devanagari, Hangul, kana — one script run at a time, so a failing engine degrades only its own run.",
    url: "https://github.com/RishikeshSreekumar/youtube_music_lyrics",
  },
  {
    name: "Marvel Nexus",
    repo: "marvel_nexus",
    lang: "Astro",
    description:
      "MCU chronology as a story-dependency graph: 95 titles, cycle validation at startup, watched-state in the URL. Astro shell, React island.",
    url: "https://github.com/RishikeshSreekumar/marvel_nexus",
    liveUrl: "https://marvel-nexus-livid.vercel.app",
  },
  {
    name: "Lift Simulation",
    repo: "lift_simulation",
    lang: "Python",
    description:
      "Discrete-event simulation of sky-lobby lift systems: BFS routing across banks, collective-control dispatch, transfers as real waits, measured against an unrestricted baseline fleet.",
    url: "https://github.com/RishikeshSreekumar/lift_simulation",
  },
];

export const skills = [
  { name: "TypeScript", category: "Languages", url: "https://www.typescriptlang.org/" },
  { name: "Python", category: "Languages", url: "https://www.python.org/" },
  { name: "Go", category: "Languages", url: "https://go.dev/" },
  { name: "SQL", category: "Languages", url: "https://www.postgresql.org/docs/current/sql.html" },

  { name: "React", category: "Frontend", url: "https://react.dev/" },
  { name: "Next.js", category: "Frontend", url: "https://nextjs.org/" },
  { name: "Astro", category: "Frontend", url: "https://astro.build/" },
  { name: "Tailwind CSS", category: "Frontend", url: "https://tailwindcss.com/" },

  { name: "FastAPI", category: "Backend", url: "https://fastapi.tiangolo.com/" },
  { name: "Node.js", category: "Backend", url: "https://nodejs.org/" },
  { name: "Stripe", category: "Backend", url: "https://stripe.com/" },

  { name: "LLM applications", category: "AI/ML", url: "https://docs.anthropic.com/" },
  { name: "RAG", category: "AI/ML", url: "https://github.com/pgvector/pgvector" },
  { name: "Model Context Protocol", category: "AI/ML", url: "https://modelcontextprotocol.io/" },

  { name: "PostgreSQL", category: "Data", url: "https://www.postgresql.org/" },
  { name: "pgvector", category: "Data", url: "https://github.com/pgvector/pgvector" },
  { name: "Redis", category: "Data", url: "https://redis.io/" },

  { name: "Terraform", category: "Infrastructure", url: "https://www.terraform.io/" },
  { name: "Docker", category: "Infrastructure", url: "https://www.docker.com/" },
  { name: "AWS", category: "Infrastructure", url: "https://aws.amazon.com/" },
  { name: "Azure", category: "Infrastructure", url: "https://azure.microsoft.com/" },
  { name: "GitHub Actions", category: "Infrastructure", url: "https://docs.github.com/en/actions" },

  { name: "Playwright", category: "Tools", url: "https://playwright.dev/" },
  { name: "Chrome Extensions", category: "Tools", url: "https://developer.chrome.com/docs/extensions" },
  { name: "Azure Communication Services", category: "Tools", url: "https://azure.microsoft.com/en-us/products/communication-services" },
];

/**
 * Resume-only content. Written in third-person-implied resume voice, ASCII only,
 * single column — see scripts/generate-resume.mjs.
 */
export const resume = {
  summary:
    "Software engineer with 4+ years building and shipping production systems end to end, across backend, frontend and infrastructure. Founding engineer at Mando: five product surfaces from first commit in under two years, through to the company's first paid tier. Previously two years on real-time trading systems at Quantitative Brokers, working to hard latency and reliability budgets.",
  skillGroups: [
    { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "Go", "Java", "SQL"] },
    { label: "Frontend", items: ["React", "Next.js", "Angular", "Astro", "Tailwind CSS", "Three.js"] },
    { label: "Backend", items: ["FastAPI", "Node.js", "NestJS", "SQLAlchemy", "REST APIs", "WebSockets", "Stripe"] },
    { label: "AI / ML", items: ["LLM applications", "Retrieval-Augmented Generation (RAG)", "Vector search", "pgvector", "Model Context Protocol (MCP)"] },
    { label: "Databases", items: ["PostgreSQL", "Redis", "MongoDB", "Alembic"] },
    { label: "Cloud & DevOps", items: ["Amazon Web Services (AWS)", "Microsoft Azure", "Terraform", "Docker", "GitHub Actions", "CI/CD", "Vercel"] },
    { label: "Tools", items: ["Git", "Playwright", "Chrome Extensions", "Shell scripting", "Jira"] },
  ],
  earlier:
    "Earlier: Android developer at Prescribe (2021); software development intern at Workfence Technologies (2020).",
  projects: [
    {
      name: "leak - Terminal Subscription Manager",
      link: "github.com/RishikeshSreekumar/leak",
      stack: "Go, Bubble Tea, SQLite, GitHub Actions",
      bullets: [
        "Built a local-first terminal app that tracks and audits recurring subscriptions, shipped as a single Go binary",
        "Shipped a Homebrew tap, install script and semver releases: macOS, Linux, Windows on amd64 and arm64",
      ],
    },
    {
      name: "deadfall - Dead Component Detector (npm)",
      link: "npmjs.com/package/deadfall",
      stack: "TypeScript, Node.js, ts-morph",
      bullets: [
        "Published an npm CLI that maps a Next.js codebase into a component usage graph and flags unused components",
        "Exits non-zero on dead code so it doubles as a CI gate, and generates an interactive HTML report for exploring the graph",
      ],
    },
    {
      name: "Rubik's Cube Solver",
      link: "",
      stack: "Next.js, Three.js, Web Workers, PWA",
      bullets: [
        "Built a browser solver running Kociemba's two-phase algorithm in a Web Worker, with webcam cube scanning",
        "Validates cube state and rejects impossible cubes with a specific reason, not a generic failure",
      ],
    },
  ],
};
