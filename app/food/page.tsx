/**
 * Food Page
 *
 * Information about balanced diet, organic food, and food waste reduction
 */

import { Metadata } from "next";
import { generateSEO } from "@/app/lib/seo";
import PageHero from "../_components/PageHero";
import FoodTopics from "./_components/FoodTopics";
import InfographicSection from "./_components/InfographicSection";
import styles from "./page.module.scss";

export const metadata: Metadata = generateSEO({
  title: "Food & Nutrition",
  description:
    "Explore the power of nutritious eating. Learn about balanced diets, organic choices, and sustainable food habits that benefit you and the planet.",
  keywords: [
    "nutrition",
    "balanced diet",
    "organic food",
    "food waste",
    "sustainable eating",
    "healthy recipes",
  ],
  url: "/food",
});

export default function FoodPage() {
  return (
    <div className={styles.foodPage}>
      <PageHero
        title="Food & Nutrition"
        subtitle="Eat Well, Live Well"
        description="Explore the power of nutritious eating. What you put on your plate affects your health, your community, and our planet."
        color="green"
      />
      <FoodTopics />
      <InfographicSection />
    </div>
  );
}
