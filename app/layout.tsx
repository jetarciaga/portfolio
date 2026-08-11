import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
  ),
  title: "Jethro Arciaga — Data & AI/LLM Engineer",
  description:
    "Python and data engineer building scalable pipelines, extraction systems, AWS integrations, and AI-native workflows.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <a
            className="fixed left-4 top-4 z-50 -translate-y-24 rounded-token bg-accent px-4 py-3 font-mono text-sm text-bg transition-transform duration-150 ease-out focus-visible:translate-y-0"
            href="#main-content"
          >
            Skip to content
          </a>
          <Nav />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
