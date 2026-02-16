import React, { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import "./HowItWorks.css";

/* ─── Scroll-reveal hook ───────────────────────────────────── */
function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ─── Step data ─────────────────────────────────────────────── */
const STEPS = [
  {
    id: 1,
    Icon: ClipboardList,
    label: "Assess",
    title: "Submit Your Academic Profile",
    description:
      "Enter your matric subjects, marks, and key profile details. CourseMatch calculates your APS, checks endorsement eligibility, and prepares your academic snapshot instantly.",
    tags: ["APS calculation", "Endorsement check", "Subject validation"],
  },
  {
    id: 2,
    Icon: BookOpen,
    label: "Match",
    title: "See What You Qualify For",
    description:
      "Get a ranked list of real university qualifications you meet the requirements for. See your fit score, required subjects, and exactly where you stand.",
    tags: ["Requirement matching", "Fit scoring", "University database"],
  },
  {
    id: 3,
    Icon: Sparkles,
    label: "Refine",
    title: "Discover Your Best-Fit Path",
    description:
      "Layer in your strengths, interests, and goals. Our AI surfaces overlooked opportunities and ranks options by true academic potential — not guesswork.",
    tags: ["AI insights", "Goal alignment", "Hidden opportunities"],
  },
];


/* ─── Individual step card ─────────────────────────────────── */
function StepCard({ step, index }) {
  const [ref, inView] = useInView(0.15);

  return (
    <div
      ref={ref}
      className={`step ${inView ? "step--visible" : ""}`}
      style={{ "--delay": `${index * 0.18}s` }}
    >
      {/* Connector line (hidden on last) */}
      {index < STEPS.length - 1 && (
        <div className="step__connector" aria-hidden="true">
          <span className="step__connector-line" />
          <ArrowRight className="step__connector-arrow" size={16} />
        </div>
      )}

      {/* Icon ring */}
      <div className="step__icon-wrap">
        <div className="step__icon-glow" aria-hidden="true" />
        <div className="step__icon-ring">
          <step.Icon className="step__icon" size={28} strokeWidth={1.6} />
        </div>
        <span className="step__number">{step.id}</span>
      </div>

      {/* Card body */}
      <div className="step__body">
        <span className="step__label">{step.label}</span>
        <h3 className="step__title">{step.title}</h3>
        <p className="step__desc">{step.description}</p>

        {/* Feature tags */}
        <div className="step__tags">
          {step.tags.map((tag) => (
            <span key={tag} className="step__tag">
              <CheckCircle2 size={11} strokeWidth={2.2} className="step__tag-icon" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page root ─────────────────────────────────────────────── */
export default function HowItWorks() {
  const [headerRef, headerIn] = useInView(0.2);

  return (
    <section className="hiw" id="hiw-section">
      {/* Ambient geometry */}
      <div className="hiw__geo hiw__geo--1" aria-hidden="true" />
      <div className="hiw__geo hiw__geo--2" aria-hidden="true" />

      {/* Section header */}
      <div
        ref={headerRef}
        className={`hiw__header ${headerIn ? "hiw__header--visible" : ""}`}
      >
        <span className="hiw__eyebrow">
          <span className="hiw__eyebrow-line" />
          How it works
          <span className="hiw__eyebrow-line" />
        </span>
        <h2 className="hiw__title">
          Three steps to<br />
          <span className="hiw__title-accent">clarity.</span>
        </h2>
        <p className="hiw__subtitle">
          No hidden fees, no endless scrolling through university websites. CourseMatch
          does the heavy lifting so you can focus on your future.
        </p>
        <ChevronDown className="hiw__scroll-cue" size={22} strokeWidth={1.5} />
      </div>

      {/* Steps grid */}
      <div className="hiw__steps">
        {STEPS.map((step, i) => (
          <StepCard key={step.id} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}