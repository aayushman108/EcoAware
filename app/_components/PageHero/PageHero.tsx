/**
 * Page Hero Component
 *
 * Reusable hero section for inner pages
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import styles from "./PageHero.module.scss";

interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color?: "green" | "blue" | "coral" | "earth";
}

export default function PageHero({
  title,
  subtitle,
  description,
  icon,
  color = "green",
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(`.${styles.iconWrapper}`, {
        scale: 0,
        rotation: -180,
        duration: 0.8,
      })
        .from(
          `.${styles.subtitle}`,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.3",
        )
        .from(
          `.${styles.title}`,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
          },
          "-=0.3",
        )
        .from(
          `.${styles.description}`,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.3",
        );

      // Floating animation
      gsap.to(`.${styles.icon}`, {
        y: -8,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={`${styles.pageHero} ${styles[color]}`}>
      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          </div>

          <span className={styles.subtitle}>{subtitle}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      {/* Background decorations */}
      <div className={styles.decorations} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </div>
    </section>
  );
}
