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
  title: "Ayush Gupta | Creative Developer & AI Student",
  description: "Portfolio of Ayush Gupta - B.Tech CSE (AIML) Student intersecting AI with robust software engineering.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('portfolio-theme') === 'light' || (!('portfolio-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${interFont.variable} font-sans antialiased`}
      >
        <div className="grain-overlay"></div>
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
        <ThemeToggle />
      </body>
    </html>
  );
}
