/**
 * Section Component
 *
 * Reusable section wrapper with consistent spacing and optional heading
 */

import { ReactNode } from "react";
import styles from "./Section.module.scss";

type SectionBackground = "default" | "surface" | "gradient" | "dark";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  background?: SectionBackground;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
  centered?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  background = "default",
  className = "",
  children,
  fullWidth = false,
  centered = false,
}: SectionProps) {
  const classes = [
    styles.section,
    styles[background],
    centered && styles.centered,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes}>
      <div className={fullWidth ? styles.fullWidthWrapper : styles.container}>
        {(title || subtitle) && (
          <header className={styles.header}>
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
            {title && <h2 className={styles.title}>{title}</h2>}
          </header>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
