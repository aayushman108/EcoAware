/**
 * CTA Section Component
 *
 * Call-to-action section with animated background
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/Button";
import styles from "./CTASection.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content entrance
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate floating elements - subtle float
      gsap.to(`.${styles.floatingIcon}`, {
        y: -30,
        rotation: 15,
        duration: 4,
        ease: "sine.inOut",
        stagger: {
          each: 0.8,
          repeat: -1,
          yoyo: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.ctaSection}>
      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🌱</span>
            <span>Join the Movement</span>
          </div>

          <h2 className={styles.title}>
            Ready to Make a<br />
            <span className={styles.highlight}>Positive Impact?</span>
          </h2>

          <p className={styles.description}>
            Start your journey towards a healthier lifestyle and a more
            sustainable future. Every choice matters, and together we can create
            lasting change.
          </p>

          <div className={styles.buttons}>
            <Button as="link" href="/contact" size="lg">
              Get In Touch
            </Button>
            <Button as="link" href="/about" variant="ghost" size="lg">
              Learn More →
            </Button>
          </div>
        </div>
      </div>

      {/* Floating decorations */}
      <div className={styles.decorations} aria-hidden="true">
        <span className={`${styles.floatingIcon} ${styles.icon1}`}>🌿</span>
        <span className={`${styles.floatingIcon} ${styles.icon2}`}>💚</span>
        <span className={`${styles.floatingIcon} ${styles.icon3}`}>🌍</span>
        <span className={`${styles.floatingIcon} ${styles.icon4}`}>🍃</span>
      </div>

      {/* Gradient background */}
      <div className={styles.gradientBg} aria-hidden="true" />
    </section>
  );
}
