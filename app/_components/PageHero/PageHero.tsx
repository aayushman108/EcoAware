/**
 * Page Hero Component
 *
 * Reusable hero section for inner pages
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import styles from "./PageHero.module.scss";

interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  color?: "green" | "blue" | "coral" | "earth";
}

export default function PageHero({
  title,
  subtitle,
  description,
  color = "green",
}: PageHeroProps) {
  const pathname = usePathname();
  const resolvedColor = color ?? "green";
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const floatingDecorIcons: Record<NonNullable<PageHeroProps["color"]>, string[]> = {
    green: ["🌿", "🍃", "💚", "🌱", "☀️", "💧"],
    blue: ["💧", "🌊", "🫧", "🐳", "☁️", "✨"],
    coral: ["🪸", "🐠", "🌺", "🐚", "⭐", "🌊"],
    earth: ["🌍", "🍂", "🪨", "🌾", "🌤️", "🍃"],
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate background decorations (same feel as homepage hero)
      tl.fromTo(
        decorRef.current?.querySelectorAll(".decor-item") || [],
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 0.85,
          duration: 1.2,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        0,
      );

      // Animate page hero content
      tl.fromTo(
        subtitleRef.current,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
        },
        0.4,
      );

      tl.fromTo(
        titleRef.current,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
        },
        0.55,
      );

      tl.fromTo(
        descriptionRef.current,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
        },
        0.7,
      );

      // Floating animation for background decorations (same pattern as homepage hero)
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
  }, [pathname]);

  return (
    <section
      ref={heroRef}
      className={`${styles.pageHero} ${styles[resolvedColor]}`}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <span ref={subtitleRef} className={`${styles.subtitle} js-animate`}>
            {subtitle}
          </span>
          <h1 ref={titleRef} className={`${styles.title} js-animate`}>
            <span className={styles.gradientTitle}>{title}</span>
          </h1>
          <p ref={descriptionRef} className={`${styles.description} js-animate`}>
            {description}
          </p>
        </div>
      </div>

      {/* Background decorations */}
      <div ref={decorRef} className={styles.decorations} aria-hidden="true">
        <div className={`${styles.decorItem} ${styles.float1} decor-item js-animate`}>
          {floatingDecorIcons[resolvedColor][0]}
        </div>
        <div className={`${styles.decorItem} ${styles.float2} decor-item js-animate`}>
          {floatingDecorIcons[resolvedColor][1]}
        </div>
        <div className={`${styles.decorItem} ${styles.float3} decor-item js-animate`}>
          {floatingDecorIcons[resolvedColor][2]}
        </div>
        <div className={`${styles.decorItem} ${styles.float4} decor-item js-animate`}>
          {floatingDecorIcons[resolvedColor][3]}
        </div>
        <div className={`${styles.decorItem} ${styles.float5} decor-item js-animate`}>
          {floatingDecorIcons[resolvedColor][4]}
        </div>
        <div className={`${styles.decorItem} ${styles.float6} decor-item js-animate`}>
          {floatingDecorIcons[resolvedColor][5]}
        </div>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </div>
    </section>
  );
}
