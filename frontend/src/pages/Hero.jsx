
import "../styles/Hero.css";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles, ArrowRight, CheckCircle2,
  BookOpen, Brain, Target, GraduationCap,
} from "lucide-react";

const AI_IMG         = "/ai_course_recommendation_hero.png";
const DEEP_DIVE_IMG  = "/course_deep_dive_hero.png";
const COMPARISON_IMG = "/course_comparison_hero.png";

const SCREENSHOTS = [
  { src: AI_IMG,         label: "AI Course Recommendations" },
  { src: DEEP_DIVE_IMG,  label: "Career Deep Dive"          },
  { src: COMPARISON_IMG, label: "Course Comparison"         },
];

/* ── Matching Visualization ─────────────── */
function MatchingViz() {
  return (
    <div className="viz" aria-hidden="true">

      {/* Input nodes */}
      <div className="viz__inputs">
        <div className="viz__node viz__node--input">
          <div className="viz__node-icon">
            <BookOpen size={14} strokeWidth={2} />
          </div>
          <div className="viz__node-text">
            <span className="viz__node-label">Subjects</span>
            <span className="viz__node-sub">Maths · IT · English</span>
          </div>
        </div>

        <div className="viz__node viz__node--input">
          <div className="viz__node-icon viz__node-icon--purple">
            <Brain size={14} strokeWidth={2} />
          </div>
          <div className="viz__node-text">
            <span className="viz__node-label">Personality</span>
            <span className="viz__node-sub">Creative · Analytical</span>
          </div>
        </div>

        <div className="viz__node viz__node--input">
          <div className="viz__node-icon viz__node-icon--green">
            <Target size={14} strokeWidth={2} />
          </div>
          <div className="viz__node-text">
            <span className="viz__node-label">Goals</span>
            <span className="viz__node-sub">Technology · Innovation</span>
          </div>
        </div>
      </div>

      {/* Connector lines */}
      <div className="viz__connectors">
        <svg
          className="viz__svg"
          viewBox="0 0 200 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 13 C 80 13, 120 40, 200 40"
            fill="none"
            stroke="rgba(147,197,253,0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M 0 40 C 80 40, 120 40, 200 40"
            fill="none"
            stroke="rgba(147,197,253,0.5)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M 0 67 C 80 67, 120 40, 200 40"
            fill="none"
            stroke="rgba(147,197,253,0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <circle cx="200" cy="40" r="3" fill="rgba(147,197,253,0.6)" />
        </svg>
      </div>

      {/* Central node */}
      <div className="viz__center">
        <div className="viz__center-ring viz__center-ring--outer" />
        <div className="viz__center-ring viz__center-ring--inner" />
        <div className="viz__center-core">
          <Sparkles size={18} strokeWidth={1.8} />
          <span className="viz__center-label">CourseMatch</span>
        </div>
      </div>

      {/* Output connector */}
      <div className="viz__output-line">
        <svg
          className="viz__svg"
          viewBox="0 0 200 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 40 C 80 40, 120 20, 200 13"
            fill="none"
            stroke="rgba(74,222,128,0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M 0 40 C 80 40, 120 40, 200 40"
            fill="none"
            stroke="rgba(74,222,128,0.6)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M 0 40 C 80 40, 120 60, 200 67"
            fill="none"
            stroke="rgba(74,222,128,0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        </svg>
      </div>

      {/* Output courses */}
      <div className="viz__outputs">
        <div className="viz__course viz__course--a">
          <div className="viz__course-score">94%</div>
          <div className="viz__course-info">
            <span className="viz__course-name">BSc Computer Science</span>
            <span className="viz__course-uni">UP</span>
          </div>
        </div>

        <div className="viz__course viz__course--b">
          <div className="viz__course-score viz__course-score--mid">88%</div>
          <div className="viz__course-info">
            <span className="viz__course-name">BSc Information Systems</span>
            <span className="viz__course-uni">UJ</span>
          </div>
        </div>

        <div className="viz__course viz__course--c">
          <div className="viz__course-score viz__course-score--lo">81%</div>
          <div className="viz__course-info">
            <span className="viz__course-name">BEng Software Eng</span>
            <span className="viz__course-uni">TUT</span>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ── Product Showcase ───────────────────── */
function ProductShowcase() {
  const trackRef   = useRef(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setActive(Math.min(idx, SCREENSHOTS.length - 1));
  };

  return (
    <div className="showcase">
      <div
        className="showcase__track"
        ref={trackRef}
        onScroll={handleScroll}
      >
        {SCREENSHOTS.map((s, i) => (
          <div key={i} className="showcase__card">
            <div className="showcase__img-wrap">
              <img
                src={s.src}
                alt={s.label}
                className="showcase__img"
                loading="lazy"
              />
            </div>
            {/* <div className="showcase__card-footer">
              <span className="showcase__card-num">0{i + 1}</span>
              <span className="showcase__card-label">{s.label}</span>
            </div> */}
          </div>
        ))}
      </div>

      {/* Pagination dots — visible on mobile */}
      <div className="showcase__dots">
        {SCREENSHOTS.map((_, i) => (
          <button
            key={i}
            className={`showcase__dot ${active === i ? "showcase__dot--active" : ""}`}
            onClick={() => {
              const el = trackRef.current;
              if (el) el.scrollTo({ left: i * el.offsetWidth, behavior: "smooth" });
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main Hero ──────────────────────────── */
export default function Hero() {
  const navigate = useNavigate();

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero">

      <div className="hero__light hero__light--a" />
      <div className="hero__light hero__light--b" />

      <div className="hero__inner">

        {/* ── TOP — two column ── */}
        <div className="hero__top">

          {/* Copy */}
          <div className="hero__copy">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              <Sparkles size={12} strokeWidth={2} />
              AI-Powered Course Matching
            </div>

            <h1 className="hero__title">
              Find your{" "}
              <em className="hero__title-em">perfect</em>{" "}
              course.
            </h1>

            <p className="hero__subtitle">
              CourseMatch uses your subjects, marks, and personality to find
              courses that suit you. Discover your strongest matches based on
              what you're good at, what you enjoy, and where you want to go.
            </p>

            <div className="hero__actions">
              <button
                className="hero__btn hero__btn--primary"
                onClick={() => navigate("/login")}
              >
                Get Started
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
              <button
                className="hero__btn hero__btn--ghost"
                onClick={() => scrollTo("hiw-section")}
              >
                How it works
              </button>
            </div>

            <div className="hero__pills">
              {["Personalised matches", "Subjects + personality", "Built for you"].map((p) => (
                <span key={p} className="hero__pill">
                  <CheckCircle2 size={11} strokeWidth={2.5} />
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Visualization */}
          <div className="hero__viz-wrap">
            <MatchingViz />
          </div>

        </div>

        {/* ── BOTTOM — product showcase ── */}
        <ProductShowcase />

      </div>
    </section>
  );
}
