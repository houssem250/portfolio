export interface TerminalLine {
  command: string;
  output: string[];
}

export const terminalLines: TerminalLine[] = [
  { command: "whoami", output: ["Houssem Eddine LEGHELIMI"] },
  { command: "role", output: ["Software Engineer"] },
  {
    command: "focus",
    output: [
      "Web Development",
      "Mobile Development",
    ],
  },
  {
    command: "technologies",
    output: [
      "Android Native (Java, XML)",
      "Spring Boot",
      "Next.js",
      "Docker",
    ],
  },
  {
    command: "currently_learning",
    output: ["System Design", "Odoo", "Android (Kotlin)", "Flutter", "AI Agents"],
  },
  { command: "status", output: ["Building. Learning. Improving."] },
];
