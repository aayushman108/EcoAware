/**
 * SocialShare Component
 * 
 * Reusable component to share the current page on social platforms.
 */

"use client";

import { useState } from "react";
import styles from "./SocialShare.module.scss";

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
}

export default function SocialShare({ title, description, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => url || (typeof window !== "undefined" ? window.location.href : "https://envoware.org");
  const getTitle = () => title || (typeof document !== "undefined" ? document.title : "Envoware");

  const handleShare = async (platform: "twitter" | "facebook" | "copy") => {
    const shareUrl = getUrl();
    const shareTitle = getTitle();

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link", err);
      }
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getTitle(),
          text: description || "Check out this informative page on Envoware!",
          url: getUrl(),
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Native share failed", err);
        }
      }
    } else {
      handleShare("twitter"); // Fallback if no native share
    }
  };

  return (
    <div className={styles.socialShare}>
      <p className={styles.title}>Spread Awareness</p>
      <div className={styles.buttons}>
        <button 
          className={`${styles.shareButton} twitter`}
          onClick={() => handleShare("twitter")}
          aria-label="Share on X (Twitter)"
        >
          𝕏
        </button>
        <button 
          className={`${styles.shareButton} facebook`}
          onClick={() => handleShare("facebook")}
          aria-label="Share on Facebook"
        >
          f
        </button>
        <button 
          className={`${styles.shareButton} copy ${copied ? styles.copied : ""}`}
          onClick={() => handleShare("copy")}
          aria-label="Copy link"
        >
          {copied ? "✓" : "🔗"}
          {copied && <span className={styles.copyFeedback}>Copied!</span>}
        </button>
        
        {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
          <button 
            className={styles.shareButton}
            onClick={handleNativeShare}
            aria-label="Other sharing options"
          >
            📱
          </button>
        )}
      </div>
    </div>
  );
}
