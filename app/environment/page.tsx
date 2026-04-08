/**
 * Environment Page
 *
 * Information about climate change, pollution, sustainability, and recycling
 */

import { Metadata } from "next";
import { generateSEO } from "@/app/lib/seo";
import PageHero from "../_components/PageHero";
import EnvironmentTopics from "./_components/EnvironmentTopics";
import TimelineSection from "./_components/TimelineSection";
import styles from "./page.module.scss";

export const metadata: Metadata = generateSEO({
  title: "Environment & Climate",
  description:
    "Understand climate change, conservation, and sustainability. Learn how every small action counts towards protecting our precious Earth.",
  keywords: [
    "environment",
    "climate change",
    "sustainability",
    "recycling",
    "pollution",
    "conservation",
  ],
  url: "/environment",
});

export default function EnvironmentPage() {
  return (
    <div className={styles.environmentPage}>
      <PageHero
        title="Environment & Climate"
        subtitle="Our Planet, Our Responsibility"
        description="Understand the challenges our planet faces and discover how every small action can contribute to a sustainable future."
        color="blue"
      />
      <EnvironmentTopics />
      <TimelineSection />
    </div>
  );
}
