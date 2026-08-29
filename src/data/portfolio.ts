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
  /** Year the thing was finished, shown beside its status in the card's rule. */
  year?: string;
  /** Where it stands today: `live`, `on npm`, `released`, `private repo`. */
  status?: string;
  description: string;
  /** The three or four decisions that make the project the shape it is. */
  facts?: string[];
  highlight?: string;
  install?: string;
  tags: string[];
  /** Host shown as the live link's label, e.g. `marvel.rishikeshs.dev`. */
  domain?: string;
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  /** The project's own colour, used only to mark the card's edge. */
  accent?: string;
  featured: boolean;
}

export interface OpenSourceItem {
  name: string;
  repo: string;
  lang: string;
  year?: string;
  description: string;
  /** The pieces it is actually made of — "Go" alone says too little. */
  stack?: string[];
  url: string;
  liveUrl?: string;
}

export type SkillCategory =
  | 'Languages'
  | 'Interfaces'
  | 'Services & APIs'
  | 'AI in production'
  | 'Data'
  | 'Ship & run'
  | 'Browser & runtime';

export interface Skill {
  name: string;
  category: SkillCategory;
  url?: string;
}

/** A skill group and the line that says how it is used here. */
export interface SkillGroup {
  name: SkillCategory;
  note: string;
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
export const skillGroups = content.skillGroups as SkillGroup[];
/** Technology → group, for pills that appear outside the skills section. */
export const techCategory = content.techCategory as Record<string, SkillCategory>;
export const experience = content.experience as Experience[];
export const education = content.education as Education[];
export const achievements = content.achievements as string[];
