/**
 * Mission Section Component
 *
 * Displays the mission and vision of the platform
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/app/components/Section";
import styles from "./MissionSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.card}`,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section background="surface">
        <div className={styles.grid}>
          {/* Mission Card */}
          <article className={`${styles.card} ${styles.mission}`}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🎯</span>
            </div>
            <h2 className={styles.title}>Our Mission</h2>
            <p className={styles.description}>
              To empower individuals with knowledge and tools to make conscious
              choices that benefit their health, their communities, and our
              planet. We believe that small, informed actions can lead to
              transformative change.
            </p>
            <ul className={styles.points}>
              <li>Provide accurate, science-backed information</li>
              <li>Make sustainability accessible to everyone</li>
              <li>Inspire action through awareness</li>
            </ul>
          </article>

          {/* Vision Card */}
          <article className={`${styles.card} ${styles.vision}`}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🔭</span>
            </div>
            <h2 className={styles.title}>Our Vision</h2>
            <p className={styles.description}>
              A world where every person understands the impact of their choices
              and actively contributes to a healthier, more sustainable future.
              We envision communities united in the pursuit of well-being for
              all.
            </p>
            <ul className={styles.points}>
              <li>Global awareness leading to global action</li>
              <li>Harmony between human progress and nature</li>
              <li>Health and sustainability for future generations</li>
            </ul>
          </article>
        </div>

        {/* Purpose Statement */}
        <div className={styles.purpose}>
          <h3 className={styles.purposeTitle}>Why We Exist</h3>
          <p className={styles.purposeText}>
            In a world facing unprecedented challenges — from climate change to
            public health crises — we recognized the need for a trusted platform
            that cuts through the noise. Envoware was founded to bridge the gap
            between complex science and everyday choices, making it easier for
            everyone to live more consciously.
          </p>
        </div>
      </Section>
    </div>
  );
}
