/**
 * Infographic Section Component
 *
 * Visual infographic-style layout for food statistics
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./InfographicSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const infographicData = [
  {
    category: "Fruits & Vegetables",
    percentage: 50,
    color: "green",
    description: "Should make up half of your plate",
    icon: "🥬",
  },
  {
    category: "Whole Grains",
    percentage: 25,
    color: "earth",
    description: "Choose whole over refined",
    icon: "🌾",
  },
  {
    category: "Protein",
    percentage: 25,
    color: "coral",
    description: "Mix plant and animal sources",
    icon: "🥜",
  },
];

const impactStats = [
  { value: "30%", label: "of global emissions from food", icon: "🌡️" },
  { value: "70%", label: "of freshwater used in agriculture", icon: "💧" },
  { value: "50%", label: "of habitable land for farming", icon: "🌍" },
];

export default function InfographicSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate plate segments
      barsRef.current.forEach((bar, index) => {
        if (!bar) return;

        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Animate impact stats
      gsap.fromTo(
        `.${styles.impactCard}`,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.impactGrid}`,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.infographicSection}>
      <div className={styles.container}>
        {/* Plate Guide */}
        <div className={styles.plateSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.subtitle}>Visual Guide</span>
            <h2 className={styles.title}>The Healthy Plate</h2>
            <p className={styles.description}>
              A simple guide to building balanced meals every day.
            </p>
          </div>

          <div className={styles.plateCard}>
            <div className={styles.barChart}>
              {infographicData.map((item, index) => (
                <div key={item.category} className={styles.barRow}>
                  <div className={styles.barLabel}>
                    <span className={styles.barIcon}>{item.icon}</span>
                    <span>{item.category}</span>
                  </div>
                  <div className={styles.barContainer}>
                    <div
                      ref={(el) => {
                        barsRef.current[index] = el;
                      }}
                      className={`${styles.bar} ${styles[item.color]}`}
                      style={{ width: `${item.percentage}%` }}
                    >
                      <span className={styles.barValue}>
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <p className={styles.barDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className={styles.impactSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.subtitle}>Environmental Impact</span>
            <h2 className={styles.title}>Food{"'"}s Footprint on Earth</h2>
          </div>

          <div className={styles.impactGrid}>
            {impactStats.map((stat) => (
              <div key={stat.label} className={styles.impactCard}>
                <span className={styles.impactIcon}>{stat.icon}</span>
                <span className={styles.impactValue}>{stat.value}</span>
                <span className={styles.impactLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
