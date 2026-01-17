/**
 * Timeline Section Component
 *
 * Animated timeline showing environmental milestones and goals
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TimelineSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "1970",
    title: "First Earth Day",
    description:
      "The first Earth Day mobilized 20 million Americans for environmental protection.",
    icon: "🌍",
  },
  {
    year: "1987",
    title: "Montreal Protocol",
    description:
      "Global agreement to phase out ozone-depleting substances. The ozone layer is now recovering.",
    icon: "🛡️",
  },
  {
    year: "2015",
    title: "Paris Agreement",
    description:
      "195 nations committed to limiting global warming to 1.5°C above pre-industrial levels.",
    icon: "🤝",
  },
  {
    year: "2030",
    title: "UN SDG Goals",
    description:
      "Target year for achieving Sustainable Development Goals, including climate action.",
    icon: "🎯",
  },
  {
    year: "2050",
    title: "Net Zero Target",
    description:
      "Many nations aim to achieve net-zero carbon emissions by 2050 to combat climate change.",
    icon: "🌱",
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(
        `.${styles.timelineLine}`,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate timeline items
      const items = timelineRef.current?.querySelectorAll(
        `.${styles.timelineItem}`,
      );
      if (items) {
        items.forEach((item, index) => {
          const isEven = index % 2 === 0;

          gsap.fromTo(
            item,
            {
              opacity: 0,
              x: isEven ? -60 : 60,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.timelineSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Progress & Goals</span>
          <h2 className={styles.title}>Environmental Milestones</h2>
          <p className={styles.description}>
            Key moments in our collective journey towards a sustainable future.
          </p>
        </div>

        <div ref={timelineRef} className={styles.timeline}>
          <div className={styles.timelineLine} aria-hidden="true" />

          {timelineData.map((item, index) => (
            <div
              key={item.year}
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              <div className={styles.timelineDot} aria-hidden="true">
                <span className={styles.dotIcon}>{item.icon}</span>
              </div>

              <div className={styles.timelineContent}>
                <span className={styles.year}>{item.year}</span>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
