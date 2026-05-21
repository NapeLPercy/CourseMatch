import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import "../styles/Features.css";
import { FEATURES } from "../Utils/textData/features";

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

function FeatureCard({ feature, index }) {
  const [ref, inView] = useInView(0.15);
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`feat__card feat__card--${feature.color} ${inView ? "feat__card--visible" : ""}`}
      style={{ "--delay": `${index * 0.1}s` }}
    >
      <div className={`feat__icon feat__icon--${feature.color}`}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="feat__title">{feature.title}</h3>
      <p className="feat__desc">{feature.description}</p>
    </div>
  );
}

export default function Features() {
  const [headerRef, headerIn] = useInView(0.2);
  const navigate = useNavigate();

  return (
    <section className="hiw" id="features-section">
      {/* Header — same structure as HowItWorks and AboutUs */}
      <div
        ref={headerRef}
        className={`hiw__header ${headerIn ? "hiw__header--visible" : ""}`}
      >
        <span className="hiw__eyebrow">
          <span className="hiw__eyebrow-line" />
          Features
          <span className="hiw__eyebrow-line" />
        </span>
        <h2 className="hiw__title">Everything you need to choose right.</h2>
        <p className="hiw__subtitle">
          From APS calculation to AI-powered career insights — CourseMatch gives
          you the tools to make a confident, informed decision about your
          future.
        </p>
        <ChevronDown className="hiw__scroll-cue" size={22} strokeWidth={1.5} />
      </div>

      {/* Feature cards grid */}
      <div className="feat__grid">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.id} feature={feature} index={i} />
        ))}
      </div>

      <div className="feat__cta">
        <button className="feat__cta-btn" onClick={() => navigate("/login")}>
          Explore features
          <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}
