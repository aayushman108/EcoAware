/**
 * Health Topics Grid Component
 *
 * Grid of health topics with scroll animations
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/app/components/Section";
import styles from "./TopicsGrid.module.scss";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    id: "mental-health",
    title: "Mental Health",
    description:
      "Mental well-being is just as important as physical health. Practice mindfulness, manage stress, and seek support when needed.",
    tips: [
      "Practice meditation daily",
      "Connect with loved ones",
      "Set healthy boundaries",
    ],
    icon: "🧠",
    stat: "1 in 4",
    statLabel: "people affected globally",
  },
  {
    id: "exercise",
    title: "Regular Exercise",
    description:
      "Physical activity strengthens your body, boosts mood, and reduces the risk of chronic diseases. Find activities you enjoy.",
    tips: [
      "150 minutes of activity weekly",
      "Mix cardio and strength training",
      "Stay consistent",
    ],
    icon: "🏃",
    stat: "30 min",
    statLabel: "daily exercise recommended",
  },
  {
    id: "sleep",
    title: "Quality Sleep",
    description:
      "Sleep is when your body repairs and your mind consolidates memories. Prioritize 7-9 hours of quality rest each night.",
    tips: [
      "Maintain consistent sleep schedule",
      "Limit screen time before bed",
      "Create a restful environment",
    ],
    icon: "😴",
    stat: "7-9 hrs",
    statLabel: "sleep needed for adults",
  },
  {
    id: "hydration",
    title: "Proper Hydration",
    description:
      "Water is essential for every cell in your body. Stay hydrated to maintain energy, focus, and overall health.",
    tips: [
      "Drink 8 glasses daily",
      "Start your day with water",
      "Carry a reusable bottle",
    ],
    icon: "💧",
    stat: "2-3 L",
    statLabel: "daily water intake",
  },
];

export default function TopicsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(`.${styles.topicCard}`);

      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // GSAP Hover animations
        cards.forEach((card) => {
          const icon = card.querySelector(`.${styles.icon}`);
          const badge = card.querySelector(`.${styles.statBadge}`);
          const tl = gsap.timeline({ paused: true });

          tl.to(card, {
            y: -12,
            boxShadow: "0 20px 48px rgba(0, 0, 0, 0.12)",
            borderColor: "rgba(16, 185, 129, 0.3)",
            duration: 0.4,
            ease: "power2.out",
          })
            .to(icon, {
              scale: 1.2,
              duration: 0.4,
              ease: "back.out(1.7)",
            }, 0)
            .to(badge, {
              scale: 1.05,
              y: -5,
              duration: 0.4,
            }, 0);

          card.addEventListener("mouseenter", () => tl.play());
          card.addEventListener("mouseleave", () => tl.reverse());
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section
        title="Key Health Topics"
        subtitle="What Matters Most"
        background="surface"
        centered
      >
        <div className={styles.grid}>
          {topics.map((topic) => (
            <article key={topic.id} className={styles.topicCard}>
              <div className={styles.cardHeader}>
                <span className={styles.icon} aria-hidden="true">
                  {topic.icon}
                </span>
                <div className={styles.statBadge}>
                  <span className={styles.statValue}>{topic.stat}</span>
                  <span className={styles.statLabel}>{topic.statLabel}</span>
                </div>
              </div>

              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.description}>{topic.description}</p>

              <ul className={styles.tips}>
                {topic.tips.map((tip, idx) => (
                  <li key={idx} className={styles.tipItem}>
                    <span className={styles.tipIcon}>✓</span>
                    {tip}
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
