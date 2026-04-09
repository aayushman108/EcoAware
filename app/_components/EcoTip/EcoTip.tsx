/**
 * EcoTip Component
 * 
 * Displays a practical, actionable sustainability tip.
 * Refined with GSAP transitions and premium glassmorphism.
 */

"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/Button";
import styles from "./EcoTip.module.scss";

interface Tip {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const ECO_TIPS: Tip[] = [
  {
    id: 1,
    icon: "💡",
    title: "Switch to LED Bulbs",
    description: "LEDs use 75% less energy and last 25 times longer than incandescent lighting.",
  },
  {
    id: 2,
    icon: "🚿",
    title: "Shorter Showers",
    description: "Cutting just two minutes from your shower can save up to 10 gallons of water per day.",
  },
  {
    id: 3,
    icon: "🧴",
    title: "Reusable Bottles",
    description: "Use a refillable water bottle to save money and prevent hundreds of plastic bottles from entering landfills.",
  },
  {
    id: 4,
    icon: "🥗",
    title: "Meatless Mondays",
    description: "Eating one meat-free meal a day can significantly reduce your carbon footprint and save thousands of gallons of water.",
  },
  {
    id: 5,
    icon: "🔌",
    title: "Unplug Idle Devices",
    description: "Electronics can consume energy even when turned off. Unplug them when not in use to save on your utility bill.",
  },
  {
    id: 6,
    icon: "👕",
    title: "Cold Water Wash",
    description: "Washing clothes in cold water saves 90% of a washing machine's energy and helps your clothes last longer.",
  },
  {
    id: 7,
    icon: "🛍️",
    title: "Bring Your Own Bag",
    description: "Keep reusable bags in your car or by the door to avoid single-use plastic bags when shopping.",
  },
  {
    id: 8,
    icon: "🍎",
    title: "Compost Scraps",
    description: "Composting food waste reduces methane emissions from landfills and creates nutrient-rich soil for gardens.",
  },
  {
    id: 9,
    icon: "🚲",
    title: "Walk or Bike",
    description: "For trips under 2 miles, consider walking or biking. It's better for your heart and the environment.",
  },
  {
    id: 10,
    icon: "🧺",
    title: "Air Dry Clothes",
    description: "Using a clothesline or drying rack saves the energy used by a dryer and is gentler on your fabrics.",
  },
];

export default function EcoTip() {
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tipContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsMounted(true);
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const tipIndex = dayOfYear % ECO_TIPS.length;
      setCurrentTip(ECO_TIPS[tipIndex]);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const shuffleTip = () => {
    if (!currentTip || !tipContentRef.current) return;

    // Animate out
    gsap.to(tipContentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * ECO_TIPS.length);
        } while (ECO_TIPS[nextIndex].id === currentTip.id);
        
        setCurrentTip(ECO_TIPS[nextIndex]);
        
        // Animate in
        gsap.fromTo(tipContentRef.current, 
          { opacity: 0, y: -20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "expo.out" 
          }
        );
      }
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite floating animation for the icon
      const icon = cardRef.current?.querySelector(`.${styles.icon}`);
      if (icon) {
        gsap.to(icon, {
          y: -15,
          rotation: 5,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Hover timeline initialization
      if (cardRef.current) {
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(cardRef.current, {
          y: -12,
          scale: 1.02,
          duration: 0.5,
          ease: "expo.out",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
        });

        const onEnter = () => hoverTl.play();
        const onLeave = () => hoverTl.reverse();

        cardRef.current.addEventListener("mouseenter", onEnter);
        cardRef.current.addEventListener("mouseleave", onLeave);
      }
    }, cardRef);

    return () => ctx.revert();
  }, [currentTip]); // Re-run when tip changes to ensure icon ref is valid if it re-renders

  if (!isMounted || !currentTip) return null;

  return (
    <section 
      className={styles.ecoTip} 
      aria-labelledby="eco-tip-title" 
      ref={cardRef}
    >
      <div className={styles.decoration} aria-hidden="true">🌿</div>
      <div className={styles.container}>
        <span className={styles.label}>Eco-Tip of the Day</span>
        <div className={styles.tipCard}>
          <div ref={tipContentRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'inherit' }}>
            <div className={styles.icon} aria-hidden="true">{currentTip.icon}</div>
            <div className={styles.content}>
              <h3 id="eco-tip-title" className={styles.title}>{currentTip.title}</h3>
              <p className={styles.description}>{currentTip.description}</p>
            </div>
          </div>
          
          <div className={styles.nextButton}>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={shuffleTip}
              icon={<span>→</span>}
              iconPosition="right"
            >
              Show me another
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
