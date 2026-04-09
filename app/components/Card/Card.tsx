/**
 * Card Component
 *
 * Versatile card component for feature cards, topic cards, etc.
 */

"use client";

/* eslint-disable @next/next/no-img-element */
import { ReactNode, useRef } from "react";
import Link from "next/link";
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
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

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
    <div ref={cardRef} className={classes}>
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
