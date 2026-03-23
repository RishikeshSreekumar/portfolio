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

export interface Stat {
  label: string;
  value: string;
  icon: string;
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
  level: number;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Languages';
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
    "I'm a founding software engineer at Mando, building AI-powered enterprise products from the ground up. I graduated from IIT Madras with a B.Tech in Engineering Design — a programme that blends systems thinking, applied mathematics, and human-centred design. That combination of analytical rigour and product intuition shapes how I approach every engineering problem.",
    "My focus is the intersection of AI and full-stack engineering — building systems where large language models meet real enterprise workflows. At Mando I've shipped natural language search over Workday's knowledge base, a Chrome extension that auto-generates documentation from recorded workflows, and a Stripe-integrated billing platform. Before that, at Quantitative Brokers, I worked on high-throughput trading systems — cutting one application's load time from 40 seconds to under one second and reducing trading system latency by 20%.",
    "Right now I'm deepening my work in multi-agent architectures and making LLM-powered workflows more reliable and cost-efficient at scale. I also enjoy the infrastructure side — I manage cloud environments with Terraform and care about the reproducibility it brings to deployments.",
    "Outside work, I follow cricket closely — it's part of why the IPL Scenario Builder is one of my favourite side projects. I'm drawn to problems where data and real-world intuition intersect, whether that's sports analytics or financial systems.",
  ],
  social: {
    github: "https://github.com/RishikeshSreekumar",
    linkedin: "https://www.linkedin.com/in/rishikesh-s-0a4a47166/",
    cal: "https://cal.com/rishikesh-s",
  }
};

export const stats: Stat[] = [
  { label: "load_time_reduced", value: "40s → <1s", icon: "►" },
  { label: "latency_improvement", value: "-20%", icon: "►" },
  { label: "order_throughput", value: "200/sec", icon: "►" },
  { label: "products_shipped", value: "4+", icon: "►" },
];

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
  { name: "JavaScript", level: 92, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "React", level: 88, category: "Frontend" },
  { name: "Next.js", level: 90, category: "Frontend" },
  { name: "Angular", level: 80, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "HTML/CSS", level: 92, category: "Frontend" },
  { name: "Python", level: 90, category: "Backend" },
  { name: "FastAPI", level: 88, category: "Backend" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "NestJS", level: 75, category: "Backend" },
  { name: "Java", level: 70, category: "Backend" },
  { name: "PostgreSQL", level: 88, category: "Database" },
  { name: "MongoDB", level: 75, category: "Database" },
  { name: "Redis", level: 68, category: "Database" },
  { name: "Terraform", level: 80, category: "DevOps" },
  { name: "Docker", level: 78, category: "DevOps" },
  { name: "AWS", level: 75, category: "DevOps" },
  { name: "CI/CD", level: 80, category: "DevOps" },
  { name: "Git", level: 90, category: "Tools" },
  { name: "Stripe", level: 80, category: "Tools" },
  { name: "LLMs", level: 82, category: "Tools" },
  { name: "Shell Scripting", level: 78, category: "Tools" },
  { name: "Alembic", level: 75, category: "Tools" },
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

