/**
 * Global Error Boundary Component (Next.js App Router)
 *
 * Catch-all for runtime errors across the application.
 */

"use client";

import { useEffect } from "react";
import Button from "@/app/components/Button";
import Section from "@/app/components/Section";
import "@/app/styles/globals.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--color-bg)'
    }}>
      <Section centered>
        <div style={{
          padding: '3rem',
          borderRadius: '2rem',
          background: 'rgba(var(--color-surface-rgb), 0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🍃</div>
          
          <h1 style={{ 
            fontSize: 'var(--font-size-3xl)', 
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: '1rem',
            color: 'var(--color-text)'
          }}>
            Something is <span style={{ color: 'var(--color-primary)' }}>Out of Balance</span>
          </h1>

          <p style={{ 
            fontSize: 'var(--font-size-lg)', 
            color: 'var(--color-text-muted)',
            marginBottom: '2.5rem',
            lineHeight: 'var(--line-height-relaxed)'
          }}>
            An unexpected error occurred. We&apos;ve been notified and are working to restore harmony to the experience.
          </p>

          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button onClick={() => reset()} size="lg">
              Try Again
            </Button>
            <Button as="link" href="/" variant="outline" size="lg">
              Back to Safety
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div style={{ 
              marginTop: '3rem', 
              padding: '1rem', 
              background: 'rgba(0,0,0,0.2)', 
              borderRadius: '0.5rem',
              textAlign: 'left',
              overflow: 'auto',
              maxHeight: '200px',
              fontSize: '0.8rem',
              fontFamily: 'monospace'
            }}>
              <p style={{ color: '#ff6b6b', marginBottom: '0.5rem' }}>Debug Info:</p>
              <code>{error.message}</code>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
