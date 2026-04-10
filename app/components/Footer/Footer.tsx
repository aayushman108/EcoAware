/**
 * Footer Component
 *
 * Site footer with navigation, social links, and newsletter signup
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

const footerLinks = {
  explore: [
    { label: "Health", href: "/health" },
    { label: "Food", href: "/food" },
    { label: "Environment", href: "/environment" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  resources: [
    { label: "Nutrition Guide", href: "https://www.healthline.com/nutrition" },
    { label: "Eco News", href: "https://www.treehugger.com/" },
    { label: "Carbon Footprint", href: "https://www.footprintnetwork.org/resources/footprint-calculator/" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: "𝕏" },
  { label: "Facebook", href: "https://facebook.com", icon: "f" },
  { label: "Instagram", href: "https://instagram.com", icon: "📷" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setEmail("");
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe");
      setStatus("idle");
    }
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.content}>
          {/* Brand Section */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>🌿</span>
              <span className={styles.logoText}>Envoware</span>
            </Link>
            <p className={styles.tagline}>
              Empowering conscious choices for a healthier you and a sustainable
              planet.
            </p>

            {/* Social Links */}
            <div className={styles.social}>
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

          {/* Navigation Links */}
          <nav className={styles.links} aria-label="Footer navigation">
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Explore</h3>
              <ul>
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Company</h3>
              <ul>
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Resources</h3>
              <ul>
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Newsletter Section */}
          <div className={styles.newsletter}>
            <h3 className={styles.newsletterTitle}>Stay Updated</h3>
            <p className={styles.newsletterText}>
              Get weekly insights on health, nutrition, and sustainability.
            </p>
            {status === "success" ? (
              <div className={styles.successMessage}>
                <span className={styles.successIcon}>✨</span>
                <p>Thanks for subscribing! Check your inbox soon.</p>
              </div>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  required
                />
                <button
                  type="submit"
                  className={styles.newsletterButton}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Envoware. All rights reserved.
          </p>
          <p className={styles.madeWith}>Made with 💚 for a greener future</p>
        </div>
      </div>
    </footer>
  );
}
