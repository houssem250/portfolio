import type { ContactLink } from "@/types/portfolio";
import { SOCIAL } from "@/lib/social";

export const contactHeading = "Let\'s work together.";

export const contactDescription =
  "I am open to backend, cloud, and AI-focused opportunities where clear thinking and reliable delivery matter.";

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: SOCIAL.email_personel,
    value: SOCIAL.email_personel.replace("mailto:", ""),
  },
  {
    label: "LinkedIn",
    href: SOCIAL.linkedin,
    value: SOCIAL.linkedin.replace("https://linkedin.com/in/", ""),
  },
  {
    label: "GitHub",
    href: SOCIAL.github,
    value: SOCIAL.github.replace("https://github.com/", ""),
  },
];
