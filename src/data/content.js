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
  website: "https://rishikeshs.dev",
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

/**
 * Featured work, in the order the section reads.
 *
 * Ordered by how far each thing got, not by date: the two anybody can install in
 * one command come first, then the live apps, then the archive.
 *
 * No screenshots. A capture of a page you can click through to is a worse copy
 * of the thing itself, and six of them stacked down a page compete with each
 * other instead of with nothing. What earns the space instead is `facts` — the
 * three or four decisions that make each project the shape it is, in the
 * project's own units. `accent` is the project's own colour, sampled from the
 * thing itself, and tints only the card's edge, so the page stays correct
 * across all ten site accents.
 */
export const projects = [
  {
    id: "leak",
    title: "leak — Terminal Subscription Manager",
    tagline: "Mark. Sweep. Save.",
    year: "2025",
    status: "released",
    description:
      "Subscriptions are the financial equivalent of a memory leak: you sign up, forget, and months later a zombie process is still draining your account. leak is a local-first TUI that tracks recurring spend, audits it, and tells you what to cancel. Single Go binary, no account, no server, no telemetry.",
    facts: [
      "one static Go binary",
      "6 build targets — macOS, Linux, Windows × amd64/arm64",
      "Homebrew tap + install script",
      "SQLite on your disk, nothing leaves it",
    ],
    highlight:
      "Ships as a real product, not a repo: Homebrew tap, an install script, prebuilt binaries for macOS, Linux and Windows on amd64 and arm64, semver releases and CI on every push.",
    tags: ["Go", "Bubble Tea", "SQLite", "TUI", "GitHub Actions", "Homebrew"],
    liveUrl: "https://github.com/RishikeshSreekumar/leak/releases",
    liveLabel: "Releases",
    githubUrl: "https://github.com/RishikeshSreekumar/leak",
    install: "brew install RishikeshSreekumar/tap/leak",
    accent: "#00D75F",
    featured: true,
  },
  {
    id: "flute",
    title: "Bansuri — Learn the Flute by Ear and Eye",
    tagline: "Your own sound, honestly measured.",
    year: "2025",
    status: "live",
    description:
      "A learn-to-play-flute app built on live visual feedback. Eleven units and 57 lessons carry a beginner from first sound to a raga of their own, and eight practice tools sit underneath them — tuner, drone, fingering chart, the rest. Pitch and drift come off your microphone in real time; how your tone feels is the part it leaves to you.",
    facts: [
      "57 lessons · 11 units",
      "8 practice tools",
      "pitch off the mic, in real time",
      "audio never leaves the tab",
    ],
    highlight:
      "Every lesson is a real prerendered URL, so it can be linked, bookmarked and indexed — and each one hands you into the tool that practises it as a preset link rather than shipping a second copy of it. Prerequisites are a nudge with a link, never a lock: a padlock in front of someone's flute is how you lose them.",
    tags: ["SvelteKit", "TypeScript", "Web Audio", "Pitch detection", "VexFlow"],
    domain: "flute.rishikeshs.dev",
    liveUrl: "https://flute.rishikeshs.dev",
    accent: "#C08A4A",
    featured: true,
  },
  {
    id: "deadfall",
    title: "deadfall — Dead Component Detector",
    tagline: "Find the dead React components. Prove it before you delete them.",
    year: "2025",
    status: "on npm",
    description:
      "A CLI that parses a Next.js codebase with ts-morph, builds the component usage graph, and reports every component nothing actually renders. Exits non-zero when anything is dead, so the same command doubles as a CI gate. Generates an interactive HTML report to explore the graph. Never touches your code unless you pass --fix.",
    facts: [
      "one npx away, no install",
      "exits non-zero — drops straight into CI",
      "App Router aware, whole import graph",
      "read-only unless you pass --fix",
    ],
    highlight:
      "App Router aware static analysis over the whole import graph — no server, no build step, no code changes. Published on npm and runnable with a single npx command.",
    tags: ["TypeScript", "Node.js", "ts-morph", "Static analysis", "npm"],
    liveUrl: "https://www.npmjs.com/package/deadfall",
    liveLabel: "View on npm",
    githubUrl: "https://github.com/RishikeshSreekumar/deadfall",
    install: "npx deadfall check ./my-next-app",
    accent: "#F85149",
    featured: true,
  },
  {
    id: "ipl-fanpark",
    title: "FanPark — IPL Playoff Race Tracker",
    tagline: "Pick a result. Watch the table move.",
    year: "2026",
    status: "live",
    description:
      "A companion app for the IPL 2026 season. Pick your team and get a dashboard of fixtures, form and net run rate; then play a result forward — Match Impact recomputes NRR and the points table, and Playoff Race answers whether the top four is still reachable. Built because arguing about qualification scenarios is better with the arithmetic done.",
    facts: [
      "NRR over full quota overs, not overs faced",
      "any result played forward, table recomputed",
      "playoff reachability, not just points",
      "fixtures and results in Postgres",
    ],
    highlight:
      "NRR is the part every fan gets wrong: it is computed over full quota overs, not overs faced, and an all-out side is charged the whole 20. Getting that right is what makes a projected table trustworthy.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    // Once the CNAME for fanpark.rishikeshs.dev resolves, this becomes
    // domain: "fanpark.rishikeshs.dev" / liveUrl: "https://fanpark.rishikeshs.dev".
    domain: "fanpark.vercel.app",
    liveUrl: "https://fanpark.vercel.app",
    githubUrl: "https://github.com/RishikeshSreekumar/fanpark",
    accent: "#7C3AED",
    featured: true,
  },
  {
    id: "marvel-nexus",
    title: "Marvel Nexus — MCU Story Navigator",
    tagline: "Pick a title. Trace every branch backward.",
    year: "2024",
    status: "live",
    description:
      "Ninety-five titles — 78 MCU season-level stops and 17 legacy branches — held as a story-dependency graph rather than a list. Pick anything and see what it depends on, then mark your way through it. An Astro shell with one React island, and watched-state carried in the URL so a half-finished run is a link you can send someone.",
    facts: [
      "95 titles as a dependency graph",
      "cycle check at boot, not at render",
      "watched state lives in the URL",
      "one React island in a static shell",
    ],
    highlight:
      "The graph is validated for cycles at startup: a dependency that loops back on itself fails loudly at boot instead of quietly rendering a node you can never reach.",
    tags: ["Astro", "React", "TypeScript", "Graph traversal"],
    domain: "marvel.rishikeshs.dev",
    liveUrl: "https://marvel.rishikeshs.dev",
    githubUrl: "https://github.com/RishikeshSreekumar/marvel_nexus",
    accent: "#E62429",
    featured: true,
  },
  {
    id: "rubiks-cube-solver",
    title: "Rubik's Cube Solver",
    tagline: "Scan a real cube. Watch it solve itself.",
    year: "2024",
    status: "private repo",
    description:
      "Paint the stickers, generate a scramble, or point your webcam at a real cube — then watch an animated, step-by-step solution on a 3D model you can orbit. Kociemba's two-phase algorithm runs in a Web Worker so the UI never drops a frame. Installable as a PWA and works offline after first load.",
    facts: [
      "Kociemba two-phase, off the main thread",
      "webcam sticker scan",
      "installable PWA, works offline",
      "impossible cubes rejected with the reason",
    ],
    highlight:
      "Physically impossible cubes are rejected with the actual reason — miscount, wrong centre, twisted corner, flipped edge, swap parity — instead of a generic failure.",
    tags: ["React", "Three.js", "Web Workers", "PWA", "Computer vision"],
    accent: "#2FBF71",
    featured: true,
  },
];

/**
 * Smaller public repos — the shelf.
 *
 * Ordered by what a stranger can see for themselves: the ones with something
 * running at a URL lead, and the rest follow by year, newest first.
 *
 * Each entry carries the one sentence that says why it was interesting and the
 * handful of pieces it is actually made of, because "Go" alone does not tell
 * anyone how the thing was built.
 */
export const openSource = [
  {
    name: "The Chilli Scale",
    repo: "chilli",
    lang: "SVG",
    year: "2025",
    description:
      "Sixteen chillies by Scoville heat, drawn by one function from one anchor: scrolling grows each pod into the next rather than swapping photographs, with the accent riding green to crimson up the scale.",
    stack: ["SVG", "Scroll animation", "Generative geometry"],
    url: "https://chilli.rishikeshs.dev",
    liveUrl: "https://chilli.rishikeshs.dev",
  },
  {
    name: "weather-cast",
    repo: "nimbus",
    lang: "Go",
    year: "2025",
    description:
      "Animated ASCII weather in the terminal — a scene per condition, day/night palettes, 12h sparkline, 5-day strip. Single binary, no API key.",
    stack: ["Go", "TUI", "ASCII animation"],
    url: "https://github.com/RishikeshSreekumar/nimbus",
  },
  {
    name: "YT Music Romanizer",
    repo: "youtube_music_lyrics",
    lang: "TypeScript",
    year: "2025",
    description:
      "Offline Chrome extension that romanizes non-Latin YouTube Music lyrics — Tamil, Devanagari, Hangul, kana — one script run at a time, so a failing engine degrades only its own run.",
    stack: ["TypeScript", "Chrome Extensions", "Unicode"],
    url: "https://github.com/RishikeshSreekumar/youtube_music_lyrics",
  },
  {
    name: "Marvel Nexus",
    repo: "marvel_nexus",
    lang: "Astro",
    year: "2024",
    description:
      "MCU chronology as a story-dependency graph: 95 titles, cycle validation at startup, watched-state in the URL. Astro shell, React island.",
    stack: ["Astro", "React", "Graph traversal"],
    url: "https://github.com/RishikeshSreekumar/marvel_nexus",
    liveUrl: "https://marvel-nexus-livid.vercel.app",
  },
  {
    name: "Lift Simulation",
    repo: "lift_simulation",
    lang: "Python",
    year: "2023",
    description:
      "Discrete-event simulation of sky-lobby lift systems: BFS routing across banks, collective-control dispatch, transfers as real waits, measured against an unrestricted baseline fleet.",
    stack: ["Python", "Discrete-event sim", "BFS routing"],
    url: "https://github.com/RishikeshSreekumar/lift_simulation",
  },
];

/**
 * Skills, grouped by the job they do rather than by what kind of thing they are.
 * "Frontend / Backend / Tools" is a taxonomy of technologies; these are the seven
 * places work actually lands, which is closer to how any of it gets picked.
 *
 * The order is the pitch, then the path a request takes: the AI work first
 * because that is what the current job is, then the language everything is
 * written in, then interface → service → data → deploy, and the awkward
 * browser-as-runtime surfaces last.
 *
 * `skillGroups` carries the group's own line — the part that says how the thing
 * is used here, not that it exists.
 */
export const skillGroups = [
  {
    name: "AI in production",
    note: "Retrieval and citation over vibes: an answer a user can check beats a fluent one they cannot.",
  },
  {
    name: "Languages",
    note: "TypeScript by default. Go when it has to be one binary somebody can run. Python where the ecosystem already solved it.",
  },
  {
    name: "Interfaces",
    note: "Rendered on the server wherever the page has no reason to be an app. React islands only where state actually lives.",
  },
  {
    name: "Services & APIs",
    note: "Typed at the boundary, with the money paths — webhooks, retries, idempotency — treated as the hard part, because they are.",
  },
  {
    name: "Data",
    note: "Postgres until it genuinely stops working. Migrations in the repo, indexes chosen from the query plan, not from a guess.",
  },
  {
    name: "Ship & run",
    note: "Every environment in Terraform, every push through CI. If a deploy needs a person to remember a step, it is not done.",
  },
  {
    name: "Browser & runtime",
    note: "The awkward surfaces — extensions, workers, audio, real-time — where the browser is the runtime and there is no server to hide behind.",
  },
];

export const skills = [
  { name: "TypeScript", category: "Languages", url: "https://www.typescriptlang.org/" },
  { name: "Python", category: "Languages", url: "https://www.python.org/" },
  { name: "Go", category: "Languages", url: "https://go.dev/" },
  { name: "SQL", category: "Languages", url: "https://www.postgresql.org/docs/current/sql.html" },
  { name: "Java", category: "Languages", url: "https://dev.java/" },

  { name: "React", category: "Interfaces", url: "https://react.dev/" },
  { name: "Next.js", category: "Interfaces", url: "https://nextjs.org/" },
  { name: "Astro", category: "Interfaces", url: "https://astro.build/" },
  { name: "SvelteKit", category: "Interfaces", url: "https://svelte.dev/docs/kit" },
  { name: "Angular", category: "Interfaces", url: "https://angular.dev/" },
  { name: "Tailwind CSS", category: "Interfaces", url: "https://tailwindcss.com/" },
  { name: "Three.js", category: "Interfaces", url: "https://threejs.org/" },

  { name: "FastAPI", category: "Services & APIs", url: "https://fastapi.tiangolo.com/" },
  { name: "Node.js", category: "Services & APIs", url: "https://nodejs.org/" },
  { name: ".NET", category: "Services & APIs", url: "https://dotnet.microsoft.com/" },
  { name: "WebSockets", category: "Services & APIs", url: "https://developer.mozilla.org/docs/Web/API/WebSockets_API" },
  { name: "Stripe", category: "Services & APIs", url: "https://stripe.com/" },

  { name: "LLM applications", category: "AI in production", url: "https://docs.anthropic.com/" },
  { name: "RAG", category: "AI in production", url: "https://github.com/pgvector/pgvector" },
  { name: "Vector search", category: "AI in production", url: "https://github.com/pgvector/pgvector" },
  { name: "Model Context Protocol", category: "AI in production", url: "https://modelcontextprotocol.io/" },

  { name: "PostgreSQL", category: "Data", url: "https://www.postgresql.org/" },
  { name: "pgvector", category: "Data", url: "https://github.com/pgvector/pgvector" },
  { name: "Redis", category: "Data", url: "https://redis.io/" },
  { name: "Alembic", category: "Data", url: "https://alembic.sqlalchemy.org/" },
  { name: "SQLite", category: "Data", url: "https://www.sqlite.org/" },

  { name: "Terraform", category: "Ship & run", url: "https://www.terraform.io/" },
  { name: "Docker", category: "Ship & run", url: "https://www.docker.com/" },
  { name: "AWS", category: "Ship & run", url: "https://aws.amazon.com/" },
  { name: "Azure", category: "Ship & run", url: "https://azure.microsoft.com/" },
  { name: "GitHub Actions", category: "Ship & run", url: "https://docs.github.com/en/actions" },
  { name: "Vercel", category: "Ship & run", url: "https://vercel.com/" },

  { name: "Chrome Extensions", category: "Browser & runtime", url: "https://developer.chrome.com/docs/extensions" },
  { name: "Web Audio", category: "Browser & runtime", url: "https://developer.mozilla.org/docs/Web/API/Web_Audio_API" },
  { name: "Web Workers", category: "Browser & runtime", url: "https://developer.mozilla.org/docs/Web/API/Web_Workers_API" },
  { name: "Azure Communication Services", category: "Browser & runtime", url: "https://azure.microsoft.com/en-us/products/communication-services" },
  { name: "Playwright", category: "Browser & runtime", url: "https://playwright.dev/" },
];

/**
 * Which group a technology belongs to, for the pills that appear outside the
 * skills section — project tags and the open-source shelf — where there is no
 * group heading overhead to say it. Derived from `skills` where the name is
 * already there, extended by hand for the rest. Anything unmapped falls back to
 * a neutral pill, which is a correct outcome rather than a wrong colour.
 */
export const techCategory = {
  ...Object.fromEntries(skills.map((s) => [s.name, s.category])),
  "Bubble Tea": "Interfaces",
  TUI: "Interfaces",
  "ASCII animation": "Interfaces",
  SVG: "Interfaces",
  "Scroll animation": "Interfaces",
  VexFlow: "Interfaces",
  Supabase: "Data",
  npm: "Ship & run",
  Homebrew: "Ship & run",
  "ts-morph": "Languages",
  "Static analysis": "Languages",
  "Graph traversal": "Languages",
  "Generative geometry": "Languages",
  "Discrete-event sim": "Languages",
  "BFS routing": "Languages",
  Unicode: "Languages",
  "Pitch detection": "Browser & runtime",
  PWA: "Browser & runtime",
  "Computer vision": "Browser & runtime",
};

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
      stack: "React, Three.js, Web Workers, PWA",
      bullets: [
        "Built a browser solver running Kociemba's two-phase algorithm in a Web Worker, with webcam cube scanning",
        "Validates cube state and rejects impossible cubes with a specific reason, not a generic failure",
      ],
    },
  ],
};
