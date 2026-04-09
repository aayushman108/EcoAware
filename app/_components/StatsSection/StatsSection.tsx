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
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
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
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            counter.textContent = obj.value.toFixed(target % 1 === 0 ? 0 : 1);
          },
        });
      });

      // Animate stat items
      const statItems = sectionRef.current?.querySelectorAll(`.${styles.statItem}`);
      if (statItems) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // GSAP Hover animations for stat items
        statItems.forEach((item) => {
          const icon = item.querySelector(`.${styles.icon}`);
          const tl = gsap.timeline({ paused: true });

          tl.to(item, {
            y: -12,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            duration: 0.4,
            ease: "power2.out",
          }).to(
            icon,
            {
              scale: 1.2,
              rotate: 5,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            0,
          );

          item.addEventListener("mouseenter", () => tl.play());
          item.addEventListener("mouseleave", () => tl.reverse());
        });
      }
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
