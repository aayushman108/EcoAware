/**
 * Hero Section Component
 *
 * Impactful hero section with GSAP animations
 */

"use client";

import { useRef, useLayoutEffect } from "react";
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
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Animate background decorations
      tl.fromTo(
        decorRef.current?.querySelectorAll(".decor-item") || [],
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
        0,
      );

      // Animate headline
      tl.fromTo(
        headlineRef.current,
        {
          y: 100,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
        },
        0.2,
      );

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        {
          y: 60,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
        },
        0.4,
      );

      // Animate buttons
      tl.fromTo(
        buttonsRef.current?.children || [],
        {
          y: 40,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
        },
        0.6,
      );

      // Floating animation for decorations - use more subtle easing
      gsap.to(decorRef.current?.querySelectorAll(".decor-item") || [], {
        y: -20,
        duration: 3,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
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
        <div className={`${styles.decorItem} ${styles.leaf1} decor-item js-animate`}>
          🌿
        </div>
        <div className={`${styles.decorItem} ${styles.leaf2} decor-item js-animate`}>
          🍃
        </div>
        <div className={`${styles.decorItem} ${styles.heart} decor-item js-animate`}>
          💚
        </div>
        <div className={`${styles.decorItem} ${styles.earth} decor-item js-animate`}>
          🌍
        </div>
        <div className={`${styles.decorItem} ${styles.sun} decor-item js-animate`}>☀️</div>
        <div className={`${styles.decorItem} ${styles.water} decor-item js-animate`}>
          💧
        </div>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 ref={headlineRef} className={`${styles.headline} js-animate`}>
            <span className={styles.highlightLine}>Conscious Choices</span>
            <span className={styles.normalLine}>for a Healthier You</span>
            <span className={styles.gradientLine}>& a Sustainable Planet</span>
          </h1>

          <p ref={subtitleRef} className={`${styles.subtitle} js-animate`}>
            Discover science-backed insights on health, nutrition, and
            environmental sustainability. Together, we can build a brighter,
            greener future.
          </p>

          <div ref={buttonsRef} className={`${styles.buttons} js-animate`}>
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
