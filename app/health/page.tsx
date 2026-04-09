/**
 * Health Page
 *
 * Information about mental health, exercise, sleep, and hydration
 */

import { Metadata } from "next";
import { generateSEO } from "@/app/lib/seo";
import PageHero from "../_components/PageHero";
import TopicsGrid from "./_components/TopicsGrid";
import TipsSection from "./_components/TipsSection";
import SocialShare from "@/app/components/SocialShare/SocialShare";
import styles from "./page.module.scss";

export const metadata: Metadata = generateSEO({
  title: "Health & Wellness",
  description:
    "Discover the foundations of physical and mental well-being. Learn about exercise, nutrition, sleep, and mindfulness practices for a healthier life.",
  keywords: [
    "health",
    "wellness",
    "mental health",
    "exercise",
    "sleep",
    "hydration",
    "mindfulness",
  ],
  url: "/health",
});

export default function HealthPage() {
  return (
    <div className={styles.healthPage}>
      <PageHero
        title="Health & Wellness"
        subtitle="Your Well-Being Journey"
        description="Discover the foundations of physical and mental well-being. Small daily habits can lead to transformative results."
        color="coral"
      />
      <TopicsGrid />
      <TipsSection />
      
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <SocialShare 
          title="Foundations of Health & Wellness | EcoAware"
          description="Check out these science-backed insights on physical and mental well-being from EcoAware."
        />
      </div>
    </div>
  );
}
