/**
 * Home Page
 *
 * Landing page with hero section, feature cards, and call-to-action
 */

import { Metadata } from "next";
import { generateSEO } from "@/app/lib/seo";
import Hero from "./_components/Hero";
import FeaturesSection from "./_components/FeaturesSection";
import StatsSection from "./_components/StatsSection";
import CTASection from "./_components/CTASection";
import styles from "./page.module.scss";

export const metadata: Metadata = generateSEO({
  title: "Home",
  description:
    "EcoAware - Your guide to conscious living. Discover insights on health, nutritious food, and environmental sustainability for a better tomorrow.",
  keywords: [
    "conscious living",
    "sustainable lifestyle",
    "eco-friendly",
    "wellness",
  ],
});

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <Hero />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
