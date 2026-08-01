/**
 * Site-wide constants.
 *
 * This is the single source of truth for anything that needs to know
 * the deployed URL, the brand name, or the owner. Importers:
 *   - src/app/layout.tsx        (metadata, JSON-LD, viewport)
 *   - src/app/robots.ts         (sitemap URL)
 *   - src/app/sitemap.ts        (entry loc + alternates)
 *
 * Override the deployed URL by setting NEXT_PUBLIC_SITE_URL at build
 * time (or in a .env file). It is the only thing that should ever
 * change between environments.
 */

// During Development: "http://localhost:3000"
// Deployement Example : "https://houssem-portfolio.vercel.app"
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Houssem Eddine | Software Engineer";

export const SITE_DESCRIPTION =
  "Portfolio of Houssem Eddine Leghelimi, a software engineer building reliable backend systems, cloud-native applications, and AI-powered solutions.";

export const SITE_AUTHOR = "Houssem Eddine Leghelimi";

export const SITE_LOCALE = "en_US";