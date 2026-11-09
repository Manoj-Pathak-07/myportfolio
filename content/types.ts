export const locales = ['en', 'ne'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** A string that exists in every supported language. */
export type Localized = Record<Locale, string>;

export const projectCategories = [
  'saas',
  'web',
  'ecommerce',
  'mobile',
  'business',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectStatus = 'live' | 'in-development' | 'private';

export interface ProjectLinks {
  live?: string;
  github?: string;
  demo?: string;
}

export interface ArchitectureLayer {
  name: Localized;
  detail: Localized;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** Hidden projects stay in the data file but are never rendered or exported. */
  visible: boolean;
  featured: boolean;
  order: number;
  summary: Localized;
  description: Localized;
  role: Localized;
  challenge: Localized;
  solution: Localized;
  features: Localized[];
  contributions?: Localized[];
  architecture: ArchitectureLayer[];
  stack: string[];
  cover: string;
  screenshots: string[];
  links: ProjectLinks;
  seoTitle: Localized;
  seoDescription: Localized;
  /** Publisher / employer attribution. */
  employer?: string;
  /** Shown in the UI when something about this record still needs confirming. */
  verificationNote?: Localized;
}

export interface Workstream {
  id: string;
  title: Localized;
  summary: Localized;
  focus: Localized;
  category: ProjectCategory;
  employer: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: Localized;
  period: Localized;
  location: Localized;
  summary: Localized;
  responsibilities: Localized[];
  stack: string[];
  current: boolean;
  visible: boolean;
  /** Set to false until employment dates and responsibilities are confirmed. */
  verified: boolean;
  verificationNote?: string;
}

export interface EducationItem {
  id: string;
  qualification: Localized;
  institution?: string;
  affiliation?: string;
  period: Localized;
  status: Localized;
  description?: Localized;
  note?: Localized;
}

export const skillClusterIds = [
  'frontend',
  'backend',
  'mobile',
  'database',
  'architecture',
  'tools',
] as const;

export type SkillClusterId = (typeof skillClusterIds)[number];

export interface SkillCluster {
  id: SkillClusterId;
  label: Localized;
  summary: Localized;
  skills: string[];
  relatedProjects: string[];
}

export interface Service {
  id: string;
  icon: 'layers' | 'cloud' | 'shopping-bag' | 'smartphone' | 'server' | 'gauge';
  title: Localized;
  body: Localized;
}

export interface PerformanceHighlight {
  id: string;
  title: Localized;
  body: Localized;
}

export interface LabExperiment {
  id: string;
  title: Localized;
  description: Localized;
  kind: Localized;
  order: number;
}
