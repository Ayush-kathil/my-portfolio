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

export const metadata: Metadata = {
  title: "Ayush Gupta | Software Engineer & ML Systems",
  description: "Portfolio of Ayush Gupta - B.Tech CSE (AI/ML) at VIT Bhopal. Building client-side processing tools and ML inference pipelines.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
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
