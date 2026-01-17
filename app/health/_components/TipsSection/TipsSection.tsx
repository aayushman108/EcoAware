/**
 * Health Tips Section Component
 *
 * Actionable health tips with animated cards
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/app/components/Section";
import styles from "./TipsSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const tips = [
  {
    number: "01",
    title: "Start Your Morning Right",
    description:
      "Begin each day with a glass of water, light stretching, and a nutritious breakfast to set a positive tone.",
    color: "coral",
  },
  {
    number: "02",
    title: "Move Every Hour",
    description:
      "If you sit for work, take short breaks to stand, stretch, or walk. Your body craves movement.",
    color: "blue",
  },
  {
    number: "03",
    title: "Practice Gratitude",
    description:
      "Take a moment each day to appreciate the good things in your life. It boosts mental well-being significantly.",
    color: "green",
  },
  {
    number: "04",
    title: "Wind Down Before Sleep",
    description:
      "Create a relaxing bedtime routine. Put away screens, dim lights, and let your mind prepare for rest.",
    color: "earth",
  },
];

export default function TipsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.tipCard}`,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
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
        title="Daily Health Tips"
        subtitle="Simple Actions, Big Impact"
        background="default"
        centered
      >
        <div className={styles.tipsGrid}>
          {tips.map((tip) => (
            <article
              key={tip.number}
              className={`${styles.tipCard} ${styles[tip.color]}`}
            >
              <span className={styles.number}>{tip.number}</span>
              <div className={styles.content}>
                <h3 className={styles.title}>{tip.title}</h3>
                <p className={styles.description}>{tip.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
