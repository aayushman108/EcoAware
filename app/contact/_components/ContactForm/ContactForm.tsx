/**
 * Contact Form Component
 *
 * Accessible contact form with validation
 */

"use client";

import { useState, useRef, useLayoutEffect, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/Button";
import styles from "./ContactForm.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (no backend)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
    >
      <h2 className={styles.formTitle}>Send Us a Message</h2>
      <p className={styles.formDescription}>
        Fill out the form below and we will get back to you as soon as possible.
      </p>

      {isSubmitted && (
        <div className={styles.successMessage} role="alert">
          <span className={styles.successIcon}>✓</span>
          <span>Thank you! Your message has been sent successfully.</span>
        </div>
      )}

      <div className={styles.formGrid}>
        {/* Name Field */}
        <div className={styles.formGroup}>
          <label htmlFor="contact-name" className={styles.label}>
            Your Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            placeholder="John Doe"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" className={styles.errorMessage} role="alert">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className={styles.formGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            Email Address <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            placeholder="john@example.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className={styles.errorMessage} role="alert">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {/* Subject Field */}
      <div className={styles.formGroup}>
        <label htmlFor="contact-subject" className={styles.label}>
          Subject <span className={styles.required}>*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`${styles.input} ${styles.select} ${errors.subject ? styles.inputError : ""}`}
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        >
          <option value="">Select a topic...</option>
          <option value="general">General Inquiry</option>
          <option value="health">Health & Wellness</option>
          <option value="nutrition">Food & Nutrition</option>
          <option value="environment">Environment & Climate</option>
          <option value="partnership">Partnership Opportunity</option>
          <option value="feedback">Feedback & Suggestions</option>
        </select>
        {errors.subject && (
          <span id="subject-error" className={styles.errorMessage} role="alert">
            {errors.subject}
          </span>
        )}
      </div>

      {/* Message Field */}
      <div className={styles.formGroup}>
        <label htmlFor="contact-message" className={styles.label}>
          Your Message <span className={styles.required}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ""}`}
          placeholder="Tell us how we can help..."
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span id="message-error" className={styles.errorMessage} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <Button type="submit" size="lg" loading={isSubmitting} fullWidth>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
