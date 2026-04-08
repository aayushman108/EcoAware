/**
 * About Page
 *
 * Information about the platform, mission, and vision
 */

import { Metadata } from "next";
import { generateSEO } from "@/app/lib/seo";
import PageHero from "../_components/PageHero";

import styles from "./page.module.scss";
import MissionSection from "./_components/MissionSection";
import ValuesSection from "./_components/ValuesSection";

export const metadata: Metadata = generateSEO({
  title: "About Us",
  description:
    "Learn about EcoAware - our mission to spread awareness about health, nutrition, and environmental sustainability for a better tomorrow.",
  keywords: [
    "about",
    "mission",
    "vision",
    "sustainability",
    "awareness platform",
  ],
  url: "/about",
});

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <PageHero
        title="About EcoAware"
        subtitle="Our Story"
        description="We believe that awareness is the first step towards change. Learn about our mission to empower conscious choices."
        color="earth"
      />
      <MissionSection />
      <ValuesSection />
    </div>
  );
}
