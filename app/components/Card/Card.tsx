/**
 * Card Component
 *
 * Versatile card component for feature cards, topic cards, etc.
 */

"use client";

import { ReactNode, useRef } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/app/hooks/useGSAP";
import styles from "./Card.module.scss";

type CardVariant = "default" | "featured" | "glass" | "gradient";

interface CardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  image?: string;
  href?: string;
  variant?: CardVariant;
  color?: "green" | "blue" | "earth" | "coral";
  className?: string;
  children?: ReactNode;
  animate?: boolean;
}

export default function Card({
  title,
  description,
  icon,
  image,
  href,
  variant = "default",
  color = "green",
  className = "",
  children,
  animate = true,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Apply scroll animation if enabled
  const animatedRef = useScrollAnimation({
    from: { opacity: 0, y: 50, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1, duration: 0.8 },
  });

  const classes = [styles.card, styles[variant], styles[color], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt="" className={styles.image} loading="lazy" />
          <div className={styles.imageOverlay} />
        </div>
      )}

      <div className={styles.content}>
        {icon && (
          <div className={styles.icon} aria-hidden="true">
            {icon}
          </div>
        )}

        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}

        {children}

        {href && (
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        )}
      </div>

      {variant === "gradient" && (
        <div className={styles.gradientBg} aria-hidden="true" />
      )}
    </>
  );

  const cardElement = (
    <div ref={animate ? animatedRef : cardRef} className={classes}>
      {content}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={styles.cardLink}>
        {cardElement}
      </Link>
    );
  }

  return cardElement;
}
