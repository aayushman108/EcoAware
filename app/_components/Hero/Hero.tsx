/**
 * Hero Section Component
 *
 * Impactful hero section with GSAP animations
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Button from "@/app/components/Button";
import styles from "./Hero.module.scss";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate background decorations
      tl.from(
        decorRef.current?.querySelectorAll(".decor-item") || [],
        {
          scale: 0,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
        },
        0,
      );

      // Animate headline
      tl.from(
        headlineRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 1,
        },
        0.3,
      );

      // Animate subtitle
      tl.from(
        subtitleRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        0.5,
      );

      // Animate buttons
      tl.from(
        buttonsRef.current?.children || [],
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
        },
        0.7,
      );

      // Floating animation for decorations
      gsap.to(decorRef.current?.querySelectorAll(".decor-item") || [], {
        y: -15,
        duration: 2.5,
        ease: "sine.inOut",
        stagger: {
          each: 0.4,
          repeat: -1,
          yoyo: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Welcome">
      {/* Background decorations */}
      <div ref={decorRef} className={styles.decorations} aria-hidden="true">
        <div className={`${styles.decorItem} ${styles.leaf1} decor-item`}>
          🌿
        </div>
        <div className={`${styles.decorItem} ${styles.leaf2} decor-item`}>
          🍃
        </div>
        <div className={`${styles.decorItem} ${styles.heart} decor-item`}>
          💚
        </div>
        <div className={`${styles.decorItem} ${styles.earth} decor-item`}>
          🌍
        </div>
        <div className={`${styles.decorItem} ${styles.sun} decor-item`}>☀️</div>
        <div className={`${styles.decorItem} ${styles.water} decor-item`}>
          💧
        </div>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 ref={headlineRef} className={styles.headline}>
            <span className={styles.highlightLine}>Conscious Choices</span>
            <span className={styles.normalLine}>for a Healthier You</span>
            <span className={styles.gradientLine}>& a Sustainable Planet</span>
          </h1>

          <p ref={subtitleRef} className={styles.subtitle}>
            Discover science-backed insights on health, nutrition, and
            environmental sustainability. Together, we can build a brighter,
            greener future.
          </p>

          <div ref={buttonsRef} className={styles.buttons}>
            <Button as="link" href="#features" size="lg">
              Explore Topics
            </Button>
            <Button as="link" href="/about" variant="outline" size="lg">
              Learn About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
