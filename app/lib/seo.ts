/**
 * SEO Component
 *
 * Reusable SEO metadata component using Next.js Metadata API
 */

import { Metadata } from "next";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecoaware.org";
const SITE_NAME = "EcoAware";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * Generate metadata for a page
 */
export function generateSEO({
  title,
  description,
  keywords = [],
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = "website",
}: SEOConfig): Metadata {
  const fullTitle = title === "Home" ? SITE_NAME : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "awareness",
      "health",
      "food",
      "environment",
      "sustainability",
      "climate",
      "wellness",
      ...keywords,
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@ecoaware",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Default metadata for the site
 */
export const defaultMetadata: Metadata = generateSEO({
  title: "Home",
  description:
    "EcoAware - Your guide to conscious living. Learn about health, nutrition, and environmental sustainability for a better tomorrow.",
});
