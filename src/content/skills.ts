import type { SkillCategory } from "@/types/portfolio";

/**
 * I recommend not using remote CDN URLs directly in your UI.
 * If jsDelivr is slow or unavailable, your icons won't load.
 * A better approach is to install lucide-react (already installed) or react-icons.
 * If you specifically want technology logos (Android, Docker, Kubernetes...), use devicon SVGs stored locally in public/icons/.
 */

import {
  Smartphone,
  Server,
  Monitor,
  Database,
  Container,
  BrainCircuit,
} from "lucide-react";

export const skillCategories: SkillCategory[] = [
  {
    name: "Mobile",
    icon: Smartphone,
    items: ["Android SDK", "Java"],
  },
  {
    name: "Backend",
    icon: Server,
    items: ["Spring Boot", "Node.js", "Django"],
  },
  {
    name: "Frontend",
    icon: Monitor,
    items: ["React", "Next.js"],
  },
  {
    name: "Databases",
    icon: Database,
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    name: "DevOps",
    icon: Container,
    items: [
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Terraform",
      "Jenkins",
      "...more",
    ],
  },
  {
    name: "AI",
    icon: BrainCircuit,
    items: ["TensorFlow", "Scikit-learn"],
  },
];