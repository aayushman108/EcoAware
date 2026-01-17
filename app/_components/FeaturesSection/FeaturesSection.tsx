/**
 * Features Section Component
 *
 * Three animated cards showcasing Health, Food, and Environment topics
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/app/components/Section";
import Button from "@/app/components/Button";
import styles from "./FeaturesSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "health",
    title: "Health & Wellness",
    description:
      "Discover the foundations of physical and mental well-being. From exercise routines to mindfulness practices, learn how to nurture your body and mind.",
    icon: "❤️",
    color: "coral",
    href: "/health",
    stats: "10M+ Lives Impacted",
  },
  {
    id: "food",
    title: "Nutrition & Food",
    description:
      "Explore the power of nutritious eating. Learn about balanced diets, organic choices, and sustainable food habits that benefit you and the planet.",
    icon: "🥗",
    color: "green",
    href: "/food",
    stats: "50K+ Recipes Shared",
  },
  {
    id: "environment",
    title: "Environment & Climate",
    description:
      "Understand climate change, conservation, and sustainability. Every small action counts towards protecting our precious Earth for future generations.",
    icon: "🌍",
    color: "blue",
    href: "/environment",
    stats: "1M+ Trees Planted",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      const cards = cardsRef.current?.querySelectorAll(`.${styles.card}`);

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
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section
        id="features"
        title="Explore Key Topics"
        subtitle="Our Focus Areas"
        background="surface"
        centered
      >
        <div ref={cardsRef} className={styles.grid}>
          {features.map((feature) => (
            <article
              key={feature.id}
              className={`${styles.card} ${styles[feature.color]}`}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon} aria-hidden="true">
                    {feature.icon}
                  </span>
                </div>

                <h3 className={styles.title}>{feature.title}</h3>

                <p className={styles.description}>{feature.description}</p>

                <div className={styles.stats}>
                  <span className={styles.statValue}>{feature.stats}</span>
                </div>

                <Button
                  as="link"
                  href={feature.href}
                  variant="outline"
                  size="sm"
                  className={styles.button}
                >
                  Learn More
                </Button>
              </div>

              <div className={styles.cardGlow} aria-hidden="true" />
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
