/**
 * Home Page
 *
 * Landing page with hero section, feature cards, and call-to-action
 */

import { Metadata } from "next";
import { generateSEO } from "@/app/lib/seo";

import styles from "./page.module.scss";
import Hero from "./_components/Hero";
import EcoTip from "./_components/EcoTip/EcoTip";
import FeaturesSection from "./_components/FeaturesSection";
import StatsSection from "./_components/StatsSection";
import EcoQuiz from "./_components/EcoQuiz/EcoQuiz";
import CTASection from "./_components/CTASection";

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
      <div className="container" style={{ marginTop: '-1.5rem', position: 'relative', zIndex: 10, paddingBottom: '3rem' }}>
        <EcoTip />
      </div>
      <FeaturesSection />
      <StatsSection />
      <EcoQuiz />
      <CTASection />
    </div>
  );
}
