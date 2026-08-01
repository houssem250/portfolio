export type QuickFact = {
  label: string;
  value: string;
};

export type AboutContent = {
  title: string;
  subtitle: string;
  paragraphs: string[];
  facts: QuickFact[];
};

import type { LucideIcon } from "lucide-react";
export type SkillCategory = {
  name: string;
  items: string[];
  icon: string | LucideIcon;
};

export type ExperienceEntry = {
  year: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectEntry = {
  title: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
};

export type EducationEntry = {
  degree: string;
  field: string;
  institution: string;
  period: string;
  description: string;
};

export type CertificationEntry = {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyHref?: string;
  skills?: string[];
};

export type ContactLink = {
  label: string;
  href: string;
  value: string;
};
