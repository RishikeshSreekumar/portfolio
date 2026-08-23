import * as content from './content.js';

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  status: string;
  experience: string;
  bio: string;
  aboutParagraphs: string[];
  website: string;
  resumeFile: string;
  social: {
    github?: string;
    linkedin?: string;
    cal?: string;
  };
}

export interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface Education {
  institution: string;
  shortName: string;
  degree: string;
  period: string;
  location: string;
  grade: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  highlight?: string;
  install?: string;
  tags: string[];
  /** Host shown in the preview frame's address bar, e.g. `marvel.rishikeshs.dev`. */
  domain?: string;
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  /** Committed capture under `public/previews/`; absent means a drawn frame. */
  preview?: string;
  /** Drawn terminal output, for the CLIs that have no page to photograph. */
  terminal?: { cmd?: string; out?: string; note?: string; dim?: boolean }[];
  previewAlt?: string;
  /** The project's own colour, used only to tint its preview frame on hover. */
  accent?: string;
  featured: boolean;
}

export interface OpenSourceItem {
  name: string;
  repo: string;
  lang: string;
  description: string;
  url: string;
  liveUrl?: string;
}

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'AI/ML'
  | 'Data'
  | 'Infrastructure'
  | 'Tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  url?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  resumeHighlights?: string[];
  tags: string[];
}

export const personal = content.personal as PersonalInfo;
export const stats = content.stats as Stat[];
export const projects = content.projects as Project[];
export const openSource = content.openSource as OpenSourceItem[];
export const skills = content.skills as Skill[];
export const experience = content.experience as Experience[];
export const education = content.education as Education[];
export const achievements = content.achievements as string[];
