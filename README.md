This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Portfolio Website

A modern, responsive personal portfolio built with **Next.js 15**, **React**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**.

The goal of this project is to showcase my work, experience, and technical skills through a clean, scalable architecture and a polished user experience. The portfolio emphasizes maintainability by separating content from presentation, allowing updates without modifying UI components.

---

## Preview

> Add screenshots or deployment link here.

- 🌐 Live Demo: *Coming Soon*
- 📄 Resume: `public/resume/Houssem_Eddine_Leghelimi_Resume.pdf`

---

# Features

- Responsive design
- Light / Dark mode
- Animated atmosphere system
- Dynamic Hero portrait with SVG fallback
- Interactive CRT terminal widget
- Portfolio sections driven by structured content
- Certifications, Education & Experience timeline
- Reusable component architecture
- SEO metadata & sitemap support
- Accessibility-minded design
- Built with modern React & Next.js best practices

---

# Tech Stack

## Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS v4
- shadcn/ui

## UI & Styling

- Lucide React
- CSS Animations
- Glassmorphism
- Responsive Layouts

## Development

- pnpm
- ESLint

---

# Getting Started

## Install dependencies

```bash
pnpm install
```

---

## Start the development server

```bash
pnpm dev
```

---

## Run

Dev or Build

```bash
pnpm Dev
```

Run server:

```bash
pnpm start
```

---

# Project Structure

```text
src/
├── app/                  # Next.js App Router (layouts, pages, metadata, global styles)
├── assets/               # Source assets bundled with the application
├── components/
│   ├── atmosphere/       # Ambient gradients & floating particles
│   ├── layout/           # Navbar, Footer, Theme Toggle, Mobile Navigation
│   ├── portfolio/
│   │   ├── about/        # About section & CRT terminal widget
│   │   ├── hero/         # Hero section, portrait & SVG fallback
│   │   ├── skills/       # Skills section
│   │   ├── projects/     # Projects section
│   │   ├── experience/   # Experience timeline
│   │   ├── education/    # Education section
│   │   ├── certifications/ # Certifications section
│   │   ├── contact/      # Interactive contact component
│   │   └── shared/       # Shared portfolio UI components
│   ├── providers/        # React providers
│   └── ui/               # shadcn/ui primitives
├── content/              # Structured portfolio content
├── hooks/                # Custom React hooks
├── lib/                  # Shared helpers and constants
├── styles/               # Global CSS & custom animations
├── types/                # Shared TypeScript types
└── utils/                # Generic utility helpers
```

---

# Folder Responsibilities

## `src/content`

The single source of truth for portfolio data.

Contains:

- Hero content
- About
- Skills
- Experience
- Projects
- Education
- Certifications
- Contact
- Navigation
- Terminal scenes

Updating portfolio information typically only requires editing files in this directory.

---

## `src/components/portfolio`

Contains every portfolio section as an isolated React component.

Each component focuses solely on rendering and presentation.

---

## `src/components/portfolio/shared`

Reusable UI building blocks shared across multiple sections.

Examples:

- Card
- Badge
- Section Container
- Section Header

---

## `src/components/portfolio/about/terminal-monitor`

Custom CRT monitor implementation used in the About section.

Includes:

- Monitor Frame
- Screen Rendering
- Scanlines
- Pixel Scenes
- Glow Effects
- Dead Pixels

---

## `src/components/atmosphere`

Visual effects responsible for the site's atmosphere.

Includes:

- Animated gradients
- Floating ash (Dark Theme)
- Floating light particles (Light Theme)

---

## `src/lib`

Framework-independent helpers.

Examples:

- Hero image detection
- Site metadata
- Social links
- Shared utility functions

---

## `src/hooks`

Reusable custom React hooks.

Current examples:

- Active section tracking

---

## `src/styles`

Custom CSS that complements Tailwind.

Examples:

- CRT monitor styling
- Atmosphere animations

---

## `src/types`

Shared TypeScript interfaces used across both content and components.

Keeping the data strongly typed helps ensure consistency throughout the application.

---

# Hero Image

The Hero section automatically detects a portrait placed inside the `public` directory.

Supported filenames:

```text
public/
├── hero-image.jpg
├── hero-image.jpeg
├── hero-image.png
├── hero-image.webp
├── hero-image.avif
└── hero-image.gif
```

If no image exists, the portfolio automatically falls back to the built-in SVG illustration.

---

# Customization

Most portfolio content can be updated without touching React components.

Edit the files .ts inside:

```text
src/content/
```

Including:

- About
- Skills
- Experience
- Education
- Projects
- Certifications
- Contact
- Navigation

---

# Future Improvements

Proposed Ideas planned for future versions:

- Multi-language support
- Analytics dashboard
- Project filtering
- Search functionality

---

# License

This portfolio is a personal project and is shared for viewing purposes only.