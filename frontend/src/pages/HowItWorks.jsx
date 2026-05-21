import React, { useEffect, useRef, useState } from "react";
import { Compass,BookOpen, Sparkles, ClipboardList, CheckCircle2, ChevronDown } from "lucide-react";
import "./HowItWorks.css";
import { HOW_IT_WORKS } from "../Utils/textData/howItWorks";
/* ─── Scroll-reveal hook ───────────────────────────────────── */
function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ─── Individual step card ─────────────────────────────────── */
function StepCard({ step, index }) {
  const [ref, inView] = useInView(0.15);

  const icons = [ClipboardList, BookOpen, Sparkles, Compass];
  const Icon = icons[index];

  return (
    <div
      ref={ref}
      className={`step ${inView ? "step--visible" : ""}`}
      style={{ "--delay": `${index * 0.18}s` }}
    >
      {/* Step number + icon */}
      <div className="step__head">
        <div className="step__icon-wrap">
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <span className="step__number">0{step.id}</span>
      </div>

      {/* Body */}
      <div className="step__body">
        <h3 className="step__title">{step.title}</h3>
        <p className="step__desc">{step.description}</p>
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
        <h2 className="hiw__title">Four steps to clarity.</h2>
        <p className="hiw__subtitle">
          No hidden fees, no endless scrolling through university websites.
          CourseMatch does the heavy lifting so you can focus on your future.
        </p>
        <ChevronDown className="hiw__scroll-cue" size={22} strokeWidth={1.5} />
      </div>

      {/* Steps grid */}
      <div className="hiw__steps">
        {HOW_IT_WORKS.map((step, i) => (
          <StepCard key={step.id} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
