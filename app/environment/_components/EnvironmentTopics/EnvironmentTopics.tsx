/**
 * Environment Topics Component
 *
 * Grid of environmental topics with animated cards
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/app/components/Section";
import styles from "./EnvironmentTopics.module.scss";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    id: "climate-change",
    title: "Climate Change",
    description:
      "Global temperatures are rising due to greenhouse gas emissions. This leads to extreme weather, melting ice caps, and ecosystem disruption.",
    icon: "🌡️",
    action: "Reduce carbon footprint",
    stats: "+1.1°C since pre-industrial era",
  },
  {
    id: "pollution",
    title: "Pollution",
    description:
      "Air, water, and soil pollution harm human health and ecosystems. From plastic in oceans to smog in cities, pollution is a global crisis.",
    icon: "🏭",
    action: "Choose eco-friendly products",
    stats: "8M tons of plastic enter oceans yearly",
  },
  {
    id: "sustainability",
    title: "Sustainability",
    description:
      "Sustainable living means meeting our needs without compromising future generations. It involves mindful consumption and renewable resources.",
    icon: "♻️",
    action: "Embrace circular economy",
    stats: "We need 1.7 Earths at current rate",
  },
  {
    id: "recycling",
    title: "Recycling",
    description:
      "Recycling conserves resources, reduces landfill waste, and lowers emissions. Proper sorting and recycling can make a significant difference.",
    icon: "🔄",
    action: "Recycle, reuse, reduce",
    stats: "Only 9% of plastic is recycled globally",
  },
];

export default function EnvironmentTopics() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const topicCards = sectionRef.current?.querySelectorAll(`.${styles.topicCard}`);
      
      if (topicCards) {
        gsap.fromTo(
          topicCards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // GSAP Hover animations
        topicCards.forEach((card) => {
          const icon = card.querySelector(`.${styles.icon}`);
          const badge = card.querySelector(`.${styles.actionBadge}`);
          
          const tl = gsap.timeline({ paused: true });

          tl.to(card, {
            y: -12,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
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
              x: 5,
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              duration: 0.3,
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
        title="Understanding Our Impact"
        subtitle="Environmental Challenges"
        background="surface"
        centered
      >
        <div className={styles.grid}>
          {topics.map((topic) => (
            <article key={topic.id} className={styles.topicCard}>
              <div className={styles.cardTop}>
                <span className={styles.icon} aria-hidden="true">
                  {topic.icon}
                </span>
                <span className={styles.stats}>{topic.stats}</span>
              </div>

              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.description}>{topic.description}</p>

              <div className={styles.actionBadge}>
                <span className={styles.actionIcon}>→</span>
                <span>{topic.action}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
