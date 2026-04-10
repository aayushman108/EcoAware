/**
 * Root Layout Component
 *
 * Main layout wrapper for the entire application with providers,
 * header, footer, and global styles
 */

import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/app/context/ThemeProvider";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { defaultMetadata } from "@/app/lib/seo";
import ServiceWorkerRegister from "@/app/components/ServiceWorkerRegister";
import "@/app/styles/globals.scss";

export const metadata: Metadata = {
  ...defaultMetadata,
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1419" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('awareness-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                  document.documentElement.classList.add('js');
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Envoware",
              "url": "https://envoware.netlify.app",
              "description": "Your guide to conscious living, health, and environmental sustainability.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "{search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="system">
          <ServiceWorkerRegister />
          {/* Skip to main content link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <Header />

          <main id="main-content" role="main">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
