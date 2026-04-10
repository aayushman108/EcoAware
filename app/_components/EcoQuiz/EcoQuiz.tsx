/**
 * EcoQuiz Component
 * 
 * An interactive quiz to calculate sustainability score.
 * Redesigned to match CTASection vibrant style while remaining distinct.
 */

"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/app/components/Button";
import styles from "./EcoQuiz.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    points: number;
    icon: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How often do you include meat in your meals?",
    options: [
      { label: "Every meal", points: 10, icon: "🥩" },
      { label: "Once a day", points: 30, icon: "🍗" },
      { label: "Few times a week", points: 60, icon: "🐟" },
      { label: "Rarely/Never", points: 100, icon: "🥦" },
    ],
  },
  {
    id: 2,
    text: "What is your primary mode of transportation?",
    options: [
      { label: "Private Car", points: 10, icon: "🚗" },
      { label: "Carpooling", points: 40, icon: "🚘" },
      { label: "Public Transit", points: 70, icon: "🚌" },
      { label: "Bike/Walk", points: 100, icon: "🚲" },
    ],
  },
  {
    id: 3,
    text: "How much of your waste do you recycle?",
    options: [
      { label: "None", points: 0, icon: "🗑️" },
      { label: "Some", points: 40, icon: "♻️" },
      { label: "Most", points: 80, icon: "📦" },
      { label: "Everything possible", points: 100, icon: "✨" },
    ],
  },
  {
    id: 4,
    text: "How often do you buy new clothing?",
    options: [
      { label: "Every month", points: 10, icon: "🛍️" },
      { label: "Every few months", points: 40, icon: "👕" },
      { label: "When I need it", points: 80, icon: "👖" },
      { label: "Mostly second-hand", points: 100, icon: "♻️" },
    ],
  },
];

export default function EcoQuiz() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quizWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for content
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 80, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate floating elements - subtle float
      gsap.to(`.js-animate.${styles.floatingIcon}`, {
        y: -30,
        rotation: 15,
        duration: 4,
        ease: "sine.inOut",
        stagger: {
          each: 0.8,
          repeat: -1,
          yoyo: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const startQuiz = () => {
    gsap.to(quizWrapperRef.current || contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        setStep("quiz");
        setCurrentQuestionIndex(0);
        setScore(0);
        setAnswers([]);
        gsap.fromTo(quizWrapperRef.current || contentRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 });
      }
    });
  };

  const handleSelectOption = (points: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = points;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        gsap.to(quizWrapperRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.2,
          onComplete: () => {
            setCurrentQuestionIndex(prev => prev + 1);
            gsap.fromTo(quizWrapperRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3 });
          }
        });
      } else {
        showResults(newAnswers);
      }
    }, 400);
  };

  const showResults = (finalAnswers: number[]) => {
    const total = finalAnswers.reduce((acc, curr) => acc + curr, 0);
    const average = Math.round(total / QUESTIONS.length);
    
    gsap.to(quizWrapperRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      onComplete: () => {
        setScore(average);
        setStep("result");
        gsap.fromTo(quizWrapperRef.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
      }
    });
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const getFeedback = () => {
    if (score >= 80) return { title: "Eco-Warrior!", text: "You are doing amazing things for our planet. Keep up the great work!" };
    if (score >= 50) return { title: "Nice Progress!", text: "You have some great habits, but there's room for improvement in a few areas." };
    return { title: "Let's Scale Up!", text: "Small changes can have a huge impact. Let's start making more conscious choices today." };
  };

  return (
    <section ref={sectionRef} className={styles.ecoQuiz} id="quiz">
      <div className={styles.container}>
        <div ref={contentRef} className={`${styles.content} js-animate`}>
          <div className={styles.badge}>
            <span aria-hidden="true">🎯</span>
            <span>Sustainability Quiz</span>
          </div>

          <h2 className={styles.title}>
            What’s Your <span className={styles.highlight}>Eco-Score?</span>
          </h2>

          <div ref={quizWrapperRef} className={styles.quizWrapper} aria-live="polite">
            {step === "intro" && (
              <div className={styles.intro}>
                <p className={styles.description}>Take our 1-minute sustainability quiz to find out your impact score and get personalized tips to improve.</p>
                <Button size="lg" onClick={startQuiz}>Start the Quiz</Button>
              </div>
            )}

            {step === "quiz" && (
              <div>
                <div className={styles.progress}>
                  <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                </div>
                <div className={styles.question}>
                  <h3>{currentQuestion.text}</h3>
                  <div className={styles.options}>
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.label}
                        className={`${styles.optionButton} ${answers[currentQuestionIndex] === option.points ? styles.selected : ""}`}
                        onClick={() => handleSelectOption(option.points)}
                      >
                        <span aria-hidden="true">{option.icon}</span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === "result" && (
              <div className={styles.results}>
                <div className={styles.scoreCircle}>{score}</div>
                <div className={styles.feedback}>
                  <h4>{getFeedback().title}</h4>
                  <p>{getFeedback().text}</p>
                </div>
                
                <div className={styles.tipBox}>
                  <strong>Actionable Tip:</strong>
                  <p>
                    {score < 50 
                      ? "Try switching one commute per week to biking or walking. It's great for your health and the environment." 
                      : "Consider joining a local environmental group to amplify your positive impact even further."}
                  </p>
                </div>

                <div className={styles.buttons}>
                  <Button onClick={startQuiz} variant="outline" size="lg">Try Again</Button>
                  <Button as="link" href="/environment" size="lg">Deep Dive</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating decorations */}
      <div className={styles.decorations} aria-hidden="true">
        <span className={`${styles.floatingIcon} ${styles.icon1} js-animate`}>🥦</span>
        <span className={`${styles.floatingIcon} ${styles.icon2} js-animate`}>🚲</span>
        <span className={`${styles.floatingIcon} ${styles.icon3} js-animate`}>♻️</span>
        <span className={`${styles.floatingIcon} ${styles.icon4} js-animate`}>💡</span>
      </div>

      {/* Gradient background */}
      <div className={styles.gradientBg} aria-hidden="true" />
    </section>
  );
}
