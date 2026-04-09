/**
 * Values Section Component
 *
 * Core values of the platform
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ValuesSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: "🌱",
    title: "Sustainability",
    description:
      "Every recommendation we make considers long-term impact on people and planet.",
  },
  {
    icon: "🔬",
    title: "Science-Based",
    description:
      "Our content is grounded in research and reviewed by experts in their fields.",
  },
  {
    icon: "🤝",
    title: "Inclusivity",
    description:
      "We believe sustainable living should be accessible to everyone, regardless of background.",
  },
  {
    icon: "💚",
    title: "Compassion",
    description:
      "We approach health and environment with empathy, understanding change takes time.",
  },
  {
    icon: "🔄",
    title: "Action-Oriented",
    description:
      "We focus on practical steps that anyone can take, not just raising awareness.",
  },
  {
    icon: "🌍",
    title: "Global Perspective",
    description:
      "Environmental and health challenges are global, and so are the solutions we advocate.",
  },
];

export default function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(`.${styles.valueCard}`);

      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // GSAP Hover animations
        cards.forEach((card) => {
          const icon = card.querySelector(`.${styles.icon}`);
          const tl = gsap.timeline({ paused: true });

          tl.to(card, {
            y: -8,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            duration: 0.4,
            ease: "power2.out",
          }).to(
            icon,
            {
              scale: 1.25,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            0,
          );

          card.addEventListener("mouseenter", () => tl.play());
          card.addEventListener("mouseleave", () => tl.reverse());
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.valuesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>What Guides Us</span>
          <h2 className={styles.title}>Our Core Values</h2>
        </div>

        <div className={styles.grid}>
          {values.map((value) => (
            <article key={value.title} className={styles.valueCard}>
              <span className={styles.icon} aria-hidden="true">
                {value.icon}
              </span>
              <h3 className={styles.cardTitle}>{value.title}</h3>
              <p className={styles.cardDescription}>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
