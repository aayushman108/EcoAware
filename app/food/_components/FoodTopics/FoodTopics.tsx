/**
 * Food Topics Component
 *
 * Grid of food and nutrition topics
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/app/components/Section";
import styles from "./FoodTopics.module.scss";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    id: "balanced-diet",
    title: "Balanced Diet",
    description:
      "A balanced diet provides all the nutrients your body needs. Include fruits, vegetables, whole grains, proteins, and healthy fats in your meals.",
    icon: "🍽️",
    facts: [
      "Aim for 5 servings of fruits and vegetables daily",
      "Choose whole grains over refined grains",
      "Limit added sugars and processed foods",
    ],
  },
  {
    id: "organic-food",
    title: "Organic Choices",
    description:
      "Organic foods are produced without synthetic pesticides or fertilizers. They support biodiversity and are often more nutrient-dense.",
    icon: "🌱",
    facts: [
      "Organic farming uses 45% less energy",
      "Supports pollinators and wildlife",
      "Reduces chemical exposure",
    ],
  },
  {
    id: "food-waste",
    title: "Reducing Food Waste",
    description:
      "One-third of all food produced globally is wasted. Simple changes in shopping, storage, and cooking can make a huge difference.",
    icon: "♻️",
    facts: [
      "1.3 billion tons of food wasted yearly",
      "Plan meals before shopping",
      "Compost food scraps when possible",
    ],
  },
];

export default function FoodTopics() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.topicCard}`,
        { opacity: 0, y: 60, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section
        title="Nutrition Essentials"
        subtitle="Know What You Eat"
        background="surface"
        centered
      >
        <div className={styles.grid}>
          {topics.map((topic) => (
            <article key={topic.id} className={styles.topicCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon} aria-hidden="true">
                  {topic.icon}
                </span>
              </div>

              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.description}>{topic.description}</p>

              <ul className={styles.facts}>
                {topic.facts.map((fact, idx) => (
                  <li key={idx} className={styles.factItem}>
                    <span className={styles.factBullet}>•</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
