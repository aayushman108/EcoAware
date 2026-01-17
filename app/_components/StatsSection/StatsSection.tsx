/**
 * Stats Section Component
 *
 * Animated statistics counter section with scroll-triggered animations
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StatsSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 2.7,
    suffix: "B+",
    label: "People Lacking Healthy Diet",
    icon: "🍽️",
  },
  {
    value: 8.1,
    suffix: "M+",
    label: "Deaths from Pollution Yearly",
    icon: "🏭",
  },
  {
    value: 1,
    suffix: "M+",
    label: "Species at Risk of Extinction",
    icon: "🦋",
  },
  {
    value: 11,
    suffix: "%",
    label: "Global Food Waste",
    icon: "🗑️",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate counters
      counterRefs.current.forEach((counter, index) => {
        if (!counter) return;

        const target = stats[index].value;
        const obj = { value: 0 };

        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            counter.textContent = obj.value.toFixed(target % 1 === 0 ? 0 : 1);
          },
        });
      });

      // Animate stat items
      gsap.fromTo(
        `.${styles.statItem}`,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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
    <section ref={sectionRef} className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>The Reality</span>
          <h2 className={styles.title}>Why Awareness Matters</h2>
          <p className={styles.description}>
            These numbers tell a story that demands our attention and action.
            Together, we can create meaningful change.
          </p>
        </div>

        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.icon} aria-hidden="true">
                {stat.icon}
              </span>
              <div className={styles.valueWrapper}>
                <span
                  ref={(el) => {
                    counterRefs.current[index] = el;
                  }}
                  className={styles.value}
                >
                  0
                </span>
                <span className={styles.suffix}>{stat.suffix}</span>
              </div>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className={styles.bgPattern} aria-hidden="true" />
    </section>
  );
}
