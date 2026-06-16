export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  status: string;
  experience: string;
  bio: string;
  aboutParagraphs: string[];
  social: {
    github?: string;
    linkedin?: string;
    cal?: string;
  };
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlight?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'AI/ML' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Languages';
  url?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export const personal: PersonalInfo = {
  name: "Rishikesh S",
  role: "Founding Software Engineer",
  location: "India",
  email: "rishikeshpavithram@gmail.com",
  status: "Building at Mando",
  experience: "3+ years",
  bio: "IIT Madras graduate and Founding Engineer at Mando — I build AI-powered enterprise products from zero to production. I've shipped natural language search over enterprise knowledge bases, workflow automation tools, and service management platforms. Previously at Quantitative Brokers, where I cut application load time from 40s to under 1s and reduced trading system latency by 20%. I work across the full stack: Next.js, FastAPI, PostgreSQL, Terraform — and I move fast without breaking things.",
  aboutParagraphs: [
    "I'm a <strong>founding software engineer at Mando</strong>, building AI-powered enterprise products from the ground up. I graduated from <strong>IIT Madras</strong> with a B.Tech in Engineering Design — a programme that blends systems thinking, applied mathematics, and human-centred design. That combination of analytical rigour and product intuition shapes how I approach every engineering problem.",
    "My focus is the <strong>intersection of AI and full-stack engineering</strong> — building systems where large language models meet real enterprise workflows. At Mando I've shipped <strong>natural language search over Workday's knowledge base</strong>, a Chrome extension that auto-generates documentation from recorded workflows, and a Stripe-integrated billing platform. Before that, at Quantitative Brokers, I worked on high-throughput trading systems — cutting one application's load time from <strong>40 seconds to under one second</strong> and reducing trading system latency by <strong>20%</strong>.",
    "Right now I'm deepening my work in <strong>multi-agent architectures</strong> and making LLM-powered workflows more <strong>reliable and cost-efficient at scale</strong>. I also enjoy the infrastructure side — I manage cloud environments with Terraform and care about the reproducibility it brings to deployments.",
    "Outside work, I follow cricket closely — it's part of why the <strong>IPL Scenario Builder</strong> is one of my favourite side projects. I'm drawn to problems where <strong>data and real-world intuition intersect</strong>, whether that's sports analytics or financial systems.",
  ],
  social: {
    github: "https://github.com/RishikeshSreekumar",
    linkedin: "https://www.linkedin.com/in/rishikesh-s-0a4a47166/",
    cal: "https://cal.com/rishikesh-s",
  }
};

export const projects: Project[] = [
  {
    id: "ipl-fanpark",
    title: "IPL FanPark — Scenario Builder & Prediction Engine",
    description: "A fan engagement platform for cricket's IPL that lets users construct custom match scenarios and get AI-powered win probability predictions in real time. Configure team lineups, pitch type, weather conditions, and batting order — the model updates predictions as you build. Backed by historical IPL match data, player performance analytics, and venue-specific factors. Built to explore the intersection of sports analytics and interactive AI.",
    highlight: "Prediction engine dynamically updates win probabilities across team lineup, pitch, weather, and batting order combinations — backed by historical IPL match data from 2008–2024.",
    tags: ["Next.js", "Python", "FastAPI", "Machine Learning", "PostgreSQL", "Data Analytics"],
    featured: true,
  },
  {
    id: "deadfall",
    title: "deadfall — Dead Component Detector for React/Next.js",
    description: "An open-source CLI dev tool that statically maps React and Next.js component usage and surfaces dead, unused components as a dependency graph. Parses the codebase with ts-morph, builds an import/usage graph, and renders an interactive Cytoscape visualization so teams can find and prune orphaned components. Supports the Next.js App Router. Published on npm.",
    highlight: "Static analysis with ts-morph builds a full component dependency graph and flags unreachable components — interactive Cytoscape visualization, App Router aware, installable from npm.",
    tags: ["TypeScript", "Node.js", "CLI", "ts-morph", "Cytoscape", "Static Analysis"],
    liveUrl: "https://www.npmjs.com/package/deadfall",
    githubUrl: "https://github.com/RishikeshSreekumar/deadfall",
    featured: true,
  },
  {
    id: "rubiks-cube-solver",
    title: "Rubik's Cube Solver",
    description: "A web application to solve Rubik's Cube using algorithms. Enables users to solve the cube by feeding the current state and visualizing the step-by-step solution in an interactive 3D view.",
    highlight: "Implemented Kociemba's two-phase algorithm in the browser, solving any valid cube configuration in under 20 moves with step-by-step 3D visualization via Three.js.",
    tags: ["Next.js", "Three.js", "Algorithms"],
    githubUrl: "https://github.com/RishikeshSreekumar/rubiks-cube-solver",
    featured: true,
  },
];

export const skills: Skill[] = [
  { name: "TypeScript", category: "Frontend", url: "https://www.typescriptlang.org/" },
  { name: "React", category: "Frontend", url: "https://react.dev/" },
  { name: "Next.js", category: "Frontend", url: "https://nextjs.org/" },
  { name: "Tailwind CSS", category: "Frontend", url: "https://tailwindcss.com/" },
  { name: "Angular", category: "Frontend", url: "https://angular.dev/" },
  { name: "JavaScript", category: "Frontend", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "LLMs", category: "AI/ML", url: "https://platform.openai.com/docs" },
  { name: "Multi-Agent Systems", category: "AI/ML", url: "https://langchain-ai.github.io/langgraph/" },
  { name: "RAG", category: "AI/ML" },
  { name: "LangGraph", category: "AI/ML", url: "https://langchain-ai.github.io/langgraph/" },
  { name: "Model Context Protocol", category: "AI/ML", url: "https://modelcontextprotocol.io/" },
  { name: "Anthropic / OpenAI APIs", category: "AI/ML", url: "https://docs.anthropic.com/" },
  { name: "Vector Search", category: "AI/ML", url: "https://github.com/pgvector/pgvector" },
  { name: "Python", category: "Backend", url: "https://www.python.org/" },
  { name: "FastAPI", category: "Backend", url: "https://fastapi.tiangolo.com/" },
  { name: "Node.js", category: "Backend", url: "https://nodejs.org/" },
  { name: "NestJS", category: "Backend", url: "https://nestjs.com/" },
  { name: "SQLAlchemy", category: "Backend", url: "https://www.sqlalchemy.org/" },
  { name: "Java", category: "Backend", url: "https://www.java.com/" },
  { name: "PostgreSQL", category: "Database", url: "https://www.postgresql.org/" },
  { name: "Neon", category: "Database", url: "https://neon.tech/" },
  { name: "pgvector", category: "Database", url: "https://github.com/pgvector/pgvector" },
  { name: "Redis", category: "Database", url: "https://redis.io/" },
  { name: "MongoDB", category: "Database", url: "https://www.mongodb.com/" },
  { name: "Terraform", category: "DevOps", url: "https://www.terraform.io/" },
  { name: "Docker", category: "DevOps", url: "https://www.docker.com/" },
  { name: "AWS", category: "DevOps", url: "https://aws.amazon.com/" },
  { name: "CI/CD", category: "DevOps", url: "https://docs.github.com/en/actions" },
  { name: "Vercel", category: "DevOps", url: "https://vercel.com/" },
  { name: "Git", category: "Tools", url: "https://git-scm.com/" },
  { name: "Stripe", category: "Tools", url: "https://stripe.com/" },
  { name: "Shell Scripting", category: "Tools", url: "https://www.gnu.org/software/bash/manual/" },
  { name: "Alembic", category: "Tools", url: "https://alembic.sqlalchemy.org/" },
];

export const experience: Experience[] = [
  {
    company: "Mando",
    role: "Founding Software Engineer",
    period: "Sep 2024 - Present",
    description: "Building AI-powered enterprise products from scratch as a founding engineer, owning the full stack across multiple product lines.",
    highlights: [
      "Architected a natural language search and conversational AI interface over Workday's knowledge base for enterprise users",
      "Designed a knowledge collection platform for capturing structured insights from industry subject matter experts",
      "Built a Chrome browser extension that records user workflows and auto-generates documentation and training materials",
      "Developed a services platform (Jira/Zendesk-like) for support ticket creation and expert resolution workflows",
      "Integrated Stripe for end-to-end customer billing, subscription management, and payment processing",
      "Own the full stack: Next.js + Tailwind CSS, FastAPI, PostgreSQL, Terraform for infrastructure-as-code",
    ],
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Terraform", "Stripe", "Tailwind CSS", "LLMs"],
  },
  {
    company: "Quantitative Brokers",
    role: "Software Engineer",
    period: "Jul 2022 - Sep 2024",
    description: "Built and optimized real-time trading systems for a quantitative finance firm, spanning order monitoring, risk control, and order entry applications.",
    highlights: [
      "Designed a scalable order monitoring system processing 200 messages/sec of 800-1000 bytes from multiple sources",
      "Reduced application load time from ~40 seconds to under 1 second by migrating data loading to server-side",
      "Optimized critical paths to reduce latency by 20% and CPU usage by 50% in the order entry application",
      "Implemented DV01-based risk calculations for CASH instruments, improving cash stream revenue by 5%",
      "Built real-time data aggregation and dynamic market data ladder visualizations for desk analysts",
    ],
    tags: ["Angular", "Node.js", ".NET", "PostgreSQL", "Real-time Systems"],
  },
  {
    company: "Quantitative Brokers",
    role: "Software Development Intern",
    period: "May 2021 - Jul 2021",
    description: "Built proof-of-concept integrations and data visualization tools for a quantitative trading platform.",
    highlights: [
      "Created a desktop integration prototype using OpenFin to enable context sharing across four applications",
      "Developed an Angular app for plotting financial curves with real-time kdb database integration using Highcharts",
    ],
    tags: ["Angular", "OpenFin", "kdb", "Highcharts"],
  },
  {
    company: "Prescribe",
    role: "Android App Developer",
    period: "Feb 2021 - May 2021",
    description: "Developed a healthcare mobile application for patient data collection and feedback management.",
    highlights: [
      "Developed an Android application for collecting patient details and displaying collected feedback",
      "Leveraged Firebase services to create API endpoints and a customised notification system",
      "Implemented techniques for analysis of user interaction at each point in the app",
    ],
    tags: ["Android", "Firebase", "Java", "Mobile"],
  },
  {
    company: "Workfence Technologies",
    role: "Software Development Intern",
    period: "May 2020 - Jul 2020",
    description: "Built mobile applications and visualization tools for workplace safety and attendance tracking.",
    highlights: [
      "Developed a mobile app for social distancing and a hardware solution for automatic distance calculation",
      "Created a scalable visualization interface for 1,000 to 100,000 users and built a geofencing-based attendance system",
      "Designed responsive mobile UI/UX features with custom views and elements",
    ],
    tags: ["Android", "Mobile", "Geofencing", "UI/UX"],
  },
];

export const education: Education[] = [
  {
    institution: "IIT Madras",
    degree: "B.Tech, Engineering Design",
    period: "2018 – 2022",
    highlights: [
      "Indian Institute of Technology Madras — one of India's top-ranked engineering institutions",
      "Coursework spanning algorithms, systems design, applied mathematics, and human-centred design",
      "Strong foundation in both analytical problem-solving and end-to-end product thinking",
    ],
  },
];

export const asciiArt = {
  logo: `
░█████████  ░██           ░██        ░██░██                             ░██             ░██████   
░██     ░██               ░██           ░██                             ░██            ░██   ░██  
░██     ░██ ░██ ░███████  ░████████  ░██░██    ░██ ░███████   ░███████  ░████████     ░██         
░█████████  ░██░██        ░██    ░██ ░██░██   ░██ ░██    ░██ ░██        ░██    ░██     ░████████  
░██   ░██   ░██ ░███████  ░██    ░██ ░██░███████  ░█████████  ░███████  ░██    ░██            ░██ 
░██    ░██  ░██       ░██ ░██    ░██ ░██░██   ░██ ░██               ░██ ░██    ░██     ░██   ░██  
░██     ░██ ░██ ░███████  ░██    ░██ ░██░██    ░██ ░███████   ░███████  ░██    ░██ ░██  ░██████   `,
  welcome: `
╔═══════════════════════════════════════════════════════════╗
║                      WELCOME TO                           ║
║                 RISHIKESH'S PORTFOLIO                    ║
║                                                           ║
║           Type 'help' to see available commands          ║
╚═══════════════════════════════════════════════════════════╝`,
};

export const commands = {
  help: `
Available commands:
  about       - Display information about me
  projects    - List all projects
  skills      - Show my technical skills
  contact     - Display contact information
  experience  - Show work experience
  clear       - Clear the terminal
  help        - Show this help message
  theme       - Toggle light/dark theme
  export      - Export portfolio data as JSON
  
Navigation:
  Use the links above or type a command name`,
};

