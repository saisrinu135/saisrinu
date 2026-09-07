import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { portfolio } from "@/content/portfolio";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const { name, tagline, location, social } = portfolio.personal;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saisrinu.in";
const description =
  "Python backend developer in Hyderabad building AI-powered APIs, automation pipelines, and cloud-integrated systems with FastAPI, PostgreSQL, LangChain, and the OpenAI API.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${name} — ${tagline}`,
  description,
  alternates: { canonical: "/" },
  authors: [{ name, url: social.github }],
  keywords: [
    "Saisrinu Gampa",
    "Python developer",
    "backend developer",
    "FastAPI",
    "LangChain",
    "AI engineer",
    "Hyderabad",
  ],
  openGraph: {
    type: "profile",
    url: "/",
    siteName: name,
    title: `${name} — ${tagline}`,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} — ${tagline}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

// Runs before paint so a dark-mode visitor never sees a white flash.
const themeScript = `try{const t=localStorage.theme;if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch{}`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  url: siteUrl,
  jobTitle: "Associate Software Engineer",
  description,
  worksFor: { "@type": "Organization", name: "Ahex Technologies" },
  address: { "@type": "PostalAddress", addressLocality: location },
  // This is what ties the identity to the GitHub/LinkedIn profiles.
  sameAs: [social.linkedin, social.github, social.instagram],
  knowsAbout: portfolio.skills.flatMap((s) => s.items),
  alumniOf: portfolio.education.map((e) => ({
    "@type": "EducationalOrganization",
    name: e.institute,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/*
          Scroll reveal uses motion, which serialises its `initial` state into
          the SSR'd HTML as inline opacity:0. Without JS those sections would
          never un-hide, so force them visible.
          ponytail: an inline-style substring selector rather than reworking
          every reveal — 3 lines, and it only ever applies when JS is off.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
