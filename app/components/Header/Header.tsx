/**
 * Header/Navigation Component
 *
 * Responsive navigation with mobile menu, theme toggle,
 * and scroll-based styling changes
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/context/ThemeProvider";
import { gsap } from "gsap";
import styles from "./Header.module.scss";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Health", href: "/health" },
  { label: "Food", href: "/food" },
  { label: "Environment", href: "/environment" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  // Animate menu open/close
  useEffect(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.fromTo(
        menuRef.current.querySelectorAll("a"),
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.1 },
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <nav className={styles.nav} aria-label="Main navigation">
        <Link
          href="/"
          className={styles.logo}
          aria-label="Home - EcoAware"
          onClick={closeMenu}
        >
          <span className={styles.logoIcon}>🌿</span>
          <span className={styles.logoText}>EcoAware</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks} role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
                role="menuitem"
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={closeMenu}
              >
                {link.label}
                <span className={styles.linkUnderline} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle & Menu Button */}
        <div className={styles.actions}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
          >
            <span className={styles.themeIcon}>
              {resolvedTheme === "dark" ? "☀️" : "🌙"}
            </span>
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${styles.menuButton} ${isMenuOpen ? styles.open : ""}`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={styles.mobileMenu}
          aria-hidden={!isMenuOpen}
        >
          <ul role="menu">
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.active : ""}`}
                  role="menuitem"
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </nav>
    </header>
  );
}
