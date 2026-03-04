# Portfolio Data Configuration

This file contains all the data for your portfolio. Edit this file to update your information.

## File Location

`src/data/portfolio.ts`

## How to Edit

### Personal Information

```typescript
export const personal: PersonalInfo = {
  name: "Your Name",              // Your full name
  role: "Your Role",              // Your job title
  location: "Your Location",      // City, Country
  email: "your@email.com",        // Your email
  status: "Open to opportunities", // Availability status
  experience: "5+ years",         // Years of experience
  bio: "Your bio...",             // Short description about you
  social: {
    github: "https://github.com/...",
    linkedin: "https://linkedin.com/in/...",
    twitter: "https://twitter.com/...",
    website: "https://yourwebsite.com",
  }
};
```

### Stats

```typescript
export const stats: Stat[] = [
  { label: "years_experience", value: "5+", icon: "►" },
  { label: "projects_completed", value: "50+", icon: "►" },
  // Add more stats
];
```

### Projects

```typescript
export const projects: Project[] = [
  {
    id: "project-id",              // URL-friendly ID
    title: "Project Title",        // Display name
    description: "Description...", // Project description
    tags: ["React", "Node.js"],    // Technology tags
    liveUrl: "https://...",        // Live demo URL (optional)
    githubUrl: "https://...",      // GitHub URL (optional)
    featured: true,                // Show in featured section
  },
  // Add more projects
];
```

### Skills

```typescript
export const skills: Skill[] = [
  { name: "JavaScript", level: 95, category: "Frontend" },
  { name: "Node.js", level: 85, category: "Backend" },
  // Categories: Frontend | Backend | Database | DevOps | Tools | Languages
];
```

### Experience

```typescript
export const experience: Experience[] = [
  {
    company: "Company Name",
    role: "Job Title",
    period: "2020 - 2022",
    description: "Description...",
  },
];
```

## Tips

1. **Keep descriptions concise** - They should fit well in the terminal layout
2. **Use realistic skill levels** - 0-100 scale
3. **Update regularly** - Keep your portfolio current
4. **Test after changes** - Refresh the page to see updates

## Development

Run the dev server to see your changes:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```
