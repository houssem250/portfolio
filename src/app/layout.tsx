import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AmbientGradient } from "@/components/atmosphere/ambient-gradient";
import { AmbientParticles } from "@/components/atmosphere/ambient-particles";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_AUTHOR,
  SITE_LOCALE,
} from "@/lib/site";
import { SOCIAL } from "@/lib/social";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_AUTHOR}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  keywords: [
    "Houssem Eddine",
    "Houssem Eddine Leghelimi",
    "Software Engineer",
    "Backend Engineer",
    "DevOps",
    "Cloud",
    "AI",
    "Spring Boot",
    "Next.js",
    "Portfolio",
  ],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// JSON-LD structured data: describes the person behind the portfolio
// to search engines. Rendered as a <script type="application/ld+json">.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_AUTHOR,
  url: SITE_URL,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  knowsAbout: [
    "Backend Development",
    "DevOps",
    "Cloud Computing",
    "Artificial Intelligence",
    "Spring Boot",
    "Next.js",
  ],
  sameAs: [
    SOCIAL.github,
    SOCIAL.linkedin,
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "DZ",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          // dangerouslySetInnerHTML is the canonical way to inject JSON-LD.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AmbientGradient />
          <AmbientParticles />
          <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-md">
            <Navbar />
          </header>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
