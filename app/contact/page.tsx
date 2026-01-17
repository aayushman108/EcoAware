/**
 * Contact Page
 *
 * Contact form and information
 */

import { Metadata } from "next";
import { generateSEO } from "@/app/lib/seo";
import PageHero from "../_components/PageHero";
import ContactForm from "./_components/ContactForm";
import ContactInfo from "./_components/ContactInfo";
import styles from "./page.module.scss";

export const metadata: Metadata = generateSEO({
  title: "Contact Us",
  description:
    "Get in touch with EcoAware. We would love to hear from you about health, nutrition, or environmental topics.",
  keywords: ["contact", "get in touch", "feedback", "support"],
  url: "/contact",
});

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <PageHero
        title="Get In Touch"
        subtitle="Contact Us"
        description="Have questions, feedback, or ideas? We would love to hear from you. Reach out and let's make a difference together."
        icon="✉️"
        color="green"
      />
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </div>
  );
}
