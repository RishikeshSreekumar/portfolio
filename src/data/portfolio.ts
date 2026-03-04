export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  status: string;
  experience: string;
  bio: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
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
}

export const personal: PersonalInfo = {
  name: "Rishikesh S",
  role: "Full Stack Developer",
  location: "India",
  email: "rishikeshpavithram@gmail.com",
  status: "Open to opportunities",
  experience: "3+ years",
  bio: "I'm a passionate developer with expertise in building modern web applications. With a keen eye for design and a love for clean code, I create digital experiences that are both beautiful and functional. I'm constantly learning and exploring new technologies to stay at the forefront of web development.",
  social: {
    github: "https://github.com/RishikeshSreekumar",
    linkedin: "https://www.linkedin.com/in/rishikesh-s-0a4a47166/",
    twitter: "https://x.com/rishikesh_s_18",
  }
};

export const stats: Stat[] = [
  { label: "years_experience", value: "3+", icon: "►" },
  { label: "projects_completed", value: "10+", icon: "►" },
  { label: "happy_clients", value: "5+", icon: "►" },
  { label: "technologies", value: "10+", icon: "►" },
];

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "ecommerce-platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and inventory management.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/ecommerce",
    featured: true,
  },
  {
    id: "task-manager",
    title: "task-manager",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    liveUrl: "https://tasks.example.com",
    githubUrl: "https://github.com/example/taskmanager",
    featured: true,
  },
  {
    id: "ai-chatbot",
    title: "ai-chatbot",
    description: "An intelligent chatbot powered by GPT-4 with features like context awareness, multi-language support, and conversation history.",
    tags: ["Python", "FastAPI", "OpenAI", "Redis"],
    liveUrl: "https://chatbot.example.com",
    githubUrl: "https://github.com/example/chatbot",
    featured: true,
  },
  {
    id: "weather-dashboard",
    title: "weather-dashboard",
    description: "A beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.",
    tags: ["Vue.js", "Tailwind", "OpenWeather API"],
    liveUrl: "https://weather.example.com",
    githubUrl: "https://github.com/example/weather",
    featured: true,
  },
];

export const skills: Skill[] = [
  { name: "JavaScript", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "React", level: 92, category: "Frontend" },
  { name: "Next.js", level: 88, category: "Frontend" },
  { name: "Vue.js", level: 75, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "HTML/CSS", level: 95, category: "Frontend" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "Python", level: 80, category: "Backend" },
  { name: "Express.js", level: 85, category: "Backend" },
  { name: "GraphQL", level: 75, category: "Backend" },
  { name: "PostgreSQL", level: 78, category: "Database" },
  { name: "MongoDB", level: 82, category: "Database" },
  { name: "Redis", level: 70, category: "Database" },
  { name: "Docker", level: 75, category: "DevOps" },
  { name: "Kubernetes", level: 65, category: "DevOps" },
  { name: "AWS", level: 70, category: "DevOps" },
  { name: "Git", level: 90, category: "Tools" },
  { name: "VS Code", level: 95, category: "Tools" },
  { name: "Figma", level: 75, category: "Tools" },
];

export const experience: Experience[] = [
  {
    company: "Tech Company",
    role: "Senior Full Stack Developer",
    period: "2022 - Present",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
  },
  {
    company: "Startup Inc",
    role: "Full Stack Developer",
    period: "2020 - 2022",
    description: "Built and maintained multiple client projects using modern JavaScript frameworks.",
  },
  {
    company: "Digital Agency",
    role: "Frontend Developer",
    period: "2019 - 2020",
    description: "Created responsive web interfaces and improved user experience across client projects.",
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

export const resumeUrl = "/resume.pdf";
