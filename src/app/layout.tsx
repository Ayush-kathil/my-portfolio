import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ayush Gupta | Software Engineer & ML Systems",
    template: "%s | Ayush Gupta",
  },
  description: "Portfolio of Ayush Gupta, a software engineer focused on frontend systems, client-side tooling, and ML-driven products that are fast, accessible, and production-ready.",
  keywords: ["Ayush Gupta", "frontend engineer", "software engineer", "machine learning", "portfolio", "Next.js", "TypeScript"],
  authors: [{ name: "Ayush Gupta" }],
  creator: "Ayush Gupta",
  publisher: "Ayush Gupta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Ayush Gupta | Software Engineer & ML Systems",
    description: "Frontend and ML portfolio focused on production-quality interfaces, client-side tooling, and measurable engineering outcomes.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ayush Gupta portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Gupta | Software Engineer & ML Systems",
    description: "Frontend and ML portfolio focused on production-quality interfaces, client-side tooling, and measurable engineering outcomes.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ayush Gupta",
    jobTitle: "Software Engineer",
    url: siteUrl,
    sameAs: [
      "https://www.linkedin.com/in/ayushkathil",
      "https://github.com/Ayush-kathil",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ayush Gupta Portfolio",
    url: siteUrl,
    description: "Portfolio showcasing frontend engineering, client-side tooling, and ML systems work.",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#0B0B0C" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FAFAF8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('portfolio-theme') === 'light' || (!('portfolio-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }

                var ua = navigator.userAgent || '';
                var isAndroid = /Android/i.test(ua);
                var cores = navigator.hardwareConcurrency || 8;
                var memory = navigator.deviceMemory || 8;
                var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                var slowNetwork = !!(connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g'));
                var lowEndAndroid = isAndroid && (cores <= 6 || memory <= 4 || slowNetwork);

                document.documentElement.classList.toggle('reduced-motion-lite', lowEndAndroid);
              } catch (_) {}
            `,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body
        className={`${interFont.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100000] focus:rounded-md focus:bg-[var(--bg-primary)] focus:px-4 focus:py-2 focus:text-[var(--text-primary)] focus:shadow-lg"
        >
          Skip to content
        </a>
        <div className="grain-overlay" aria-hidden="true"></div>
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
        <ThemeToggle />
      </body>
    </html>
  );
}
