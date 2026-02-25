/**
 * Contact Info Component
 *
 * Contact information and social links
 */

"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactInfo.module.scss";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  {
    icon: "📧",
    label: "Email",
    value: "aayushmansharma108@gmail.com",
    href: "mailto:aayushmansharma108@gmail.com",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Global (Remote)",
    href: null,
  },
  {
    icon: "🕐",
    label: "Response Time",
    value: "Within 48 hours",
    href: null,
  },
];

const socialLinks = [
  { icon: "𝕏", label: "Twitter", href: "https://x.com/aayushman1008" },
  {
    icon: "f",
    label: "Facebook",
    href: "https://www.facebook.com/aayush.maan.9461",
  },
  {
    icon: "📷",
    label: "Instagram",
    href: "https://www.instagram.com/aayushmaan108",
  },
  {
    icon: "in",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aayushman-sharma-a8abbb277",
  },
];

export default function ContactInfo() {
  const infoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, infoRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={infoRef} className={styles.contactInfo}>
      <div className={styles.infoCard}>
        <h3 className={styles.cardTitle}>Contact Information</h3>

        <ul className={styles.detailsList}>
          {contactDetails.map((detail) => (
            <li key={detail.label} className={styles.detailItem}>
              <span className={styles.detailIcon} aria-hidden="true">
                {detail.icon}
              </span>
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>{detail.label}</span>
                {detail.href ? (
                  <Link href={detail.href} className={styles.detailValue}>
                    {detail.value}
                  </Link>
                ) : (
                  <span className={styles.detailValue}>{detail.value}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.socialCard}>
        <h3 className={styles.cardTitle}>Follow Us</h3>
        <p className={styles.socialText}>
          Stay updated with the latest insights on health, nutrition, and
          sustainability.
        </p>

        <div className={styles.socialLinks}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.faqCard}>
        <h3 className={styles.cardTitle}>Frequently Asked</h3>
        <div className={styles.faqItem}>
          <h4 className={styles.faqQuestion}>How can I contribute?</h4>
          <p className={styles.faqAnswer}>
            Share our content, adopt sustainable practices, and spread awareness
            in your community.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h4 className={styles.faqQuestion}>Is content free to use?</h4>
          <p className={styles.faqAnswer}>
            Yes! Our educational content is free. Attribution is appreciated
            when sharing.
          </p>
        </div>
      </div>
    </div>
  );
}
