/**
 * Premium 404 Page (Next.js App Router)
 * 
 * Re-imagined as an interactive "Lost in Nature" discovery experience.
 */

"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Button from "@/app/components/Button";
import styles from "./NotFound.module.scss";

const QUICK_LINKS = [
  { icon: "🌍", title: "Environment", href: "/environment" },
  { icon: "🥗", title: "Sustainable Food", href: "/food" },
  { icon: "🧘", title: "Health & Wellbeing", href: "/health" },
];

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(cardRef.current, 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
      .fromTo([`.${styles.errorCode}`, `.${styles.title}`, `.${styles.description}`, `.${styles.action}`], 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        "-=0.6"
      )
      .fromTo(`.${styles.linkCard}`, 
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.1 },
        "-=0.4"
      );

      // Subtle float animation for decorations
      gsap.to(`.${styles.decoration}`, {
        y: "random(-40, 40)",
        rotation: "random(-10, 10)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.notFoundPage}>
      {/* Visual background elements */}
      <div className={styles.gradientBg} aria-hidden="true" />
      <div className={`${styles.decoration} ${styles.dec1}`} aria-hidden="true">🌿</div>
      <div className={`${styles.decoration} ${styles.dec2}`} aria-hidden="true">🍃</div>

      <div className={styles.container}>
        <div ref={cardRef} className={styles.heroContent}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>
            Treading on <span className={styles.highlight}>Unknown Soil</span>
          </h1>
          <p className={styles.description}>
            The peak you are looking for hasn&apos;t been reached yet, or the path has moved. 
            Don&apos;t worry, every explorer takes a wrong turn sometimes.
          </p>
          
          <div className={styles.action}>
            <Button as="link" href="/" size="lg">
              Return to Sanctuary
            </Button>
          </div>
        </div>

        <div ref={linksRef} className={styles.compass}>
          <span className={styles.subtitle}>Find your way back</span>
          <div className={styles.quickLinks}>
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.linkCard}>
                <span className={styles.icon}>{link.icon}</span>
                <span className={styles.cardTitle}>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
