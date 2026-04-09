/**
 * Contact Form Component
 *
 * Accessible contact form with validation
 */

"use client";

import { useState, useEffect, useRef, useLayoutEffect, FormEvent } from "react";
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
  submit?: string;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

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

  const handleSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
    setIsDropdownOpen(false);
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: undefined }));
    }
  };

  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "health", label: "Health & Wellness" },
    { value: "nutrition", label: "Food & Nutrition" },
    { value: "environment", label: "Environment & Climate" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "feedback", label: "Feedback & Suggestions" },
  ];

  const currentSubject = subjectOptions.find(
    (opt) => opt.value === formData.subject,
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors((prev) => ({ ...prev, submit: undefined }));
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          submit: result.error ?? "Failed to send message. Please try again.",
        }));
        return;
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setErrors((prev) => ({
        ...prev,
        submit: "Network error. Please check your connection and try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
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
        <div className={styles.successState} role="status" aria-live="polite">
          <div className={styles.successIconLarge} aria-hidden="true">
            ✓
          </div>
          <h3 className={styles.successTitle}>Message Sent Successfully</h3>
          <p className={styles.successText}>
            Thank you for reaching out. We received your message and will reply
            within 48 hours.
          </p>
          <button
            type="button"
            className={styles.sendAnotherButton}
            onClick={() => setIsSubmitted(false)}
          >
            Send another message
          </button>
        </div>
      )}
      {errors.submit && (
        <div className={styles.submitError} role="alert">
          {errors.submit}
        </div>
      )}

      {!isSubmitted && (
        <>
          <div className={styles.formFields}>
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
                  <span
                    id="name-error"
                    className={styles.errorMessage}
                    role="alert"
                  >
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
                  <span
                    id="email-error"
                    className={styles.errorMessage}
                    role="alert"
                  >
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
              <div className={styles.selectWrapper} ref={dropdownRef}>
                <button
                  type="button"
                  className={`${styles.selectButton} ${isDropdownOpen ? styles.active : ""} ${errors.subject ? styles.inputError : ""}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  aria-labelledby="contact-subject-label"
                >
                  <span className={styles.selectValue}>
                    {currentSubject ? currentSubject.label : "Select a topic..."}
                  </span>
                  <svg
                    className={styles.arrowIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className={styles.dropdown} role="listbox">
                    {subjectOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`${styles.dropdownOption} ${formData.subject === option.value ? styles.selected : ""}`}
                        onClick={() => handleSelect(option.value)}
                        role="option"
                        aria-selected={formData.subject === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.subject && (
                <span
                  id="subject-error"
                  className={styles.errorMessage}
                  role="alert"
                >
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
                <span
                  id="message-error"
                  className={styles.errorMessage}
                  role="alert"
                >
                  {errors.message}
                </span>
              )}
            </div>
          </div>

          <Button type="submit" size="lg" loading={isSubmitting} fullWidth>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </>
      )}
    </form>
  );
}
