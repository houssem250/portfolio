import type { ProjectEntry } from "@/types/portfolio";

export const projectEntries: ProjectEntry[] = [
  {
    title: "Portfolio Platform",
    description:
      "A modern portfolio application showcasing my projects, skills, and experience through a responsive interface, reusable architecture, and carefully crafted user experience.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    links: [
      { label: "Case Study", href: "#about" },
    ],
  },
  {
    title: "Hybrid Digital Twin for Predictive Maintenance",
    description:
      "A real-time digital twin for FDM 3D printers, combining a live 3D replica with a ML pipeline to detect nozzle clogging, motion-axis vibration, and overheating before they cause failures. Built on a low-cost sensor kit with no firmware modification.",
    stack: ["Three.js", "Vite", "React", "MQTT", "IoT", "Blender", "Fusion360", "ML"],
    links: [
      { label: "Live Demo", href: "https://octo-fleet-omega.vercel.app/" },
    ],
  },
  {
    title: "Gamified Learning Platform for CS Education",
    description:
      "A full-stack web platform that gamifies computer science education, turning coursework into interactive, motivating challenges to improve student engagement and learning outcomes.",
    stack: ["React", "Django", "Python", "REST API"],
    links: [],
  },
];
