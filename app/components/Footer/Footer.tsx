/**
 * Footer Component
 *
 * Site footer with navigation, social links, and newsletter signup
 */

"use client";

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
            <form
              className={styles.newsletterForm}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
                aria-label="Email address for newsletter"
                required
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
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
