import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Calculator,
  Sparkles,
  Microscope,
  Scale,
  Bot,
  Banknote,
} from "lucide-react";
import "../styles/Features.css";
import SEO from "../components/ui/SEO";
import { FEATURES } from "../Utils/textData/features";

/* ══════════════════════════════════════════
   HOOK
   ══════════════════════════════════════════ */
function useInView(threshold = 0.15) {
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

/* ══════════════════════════════════════════
   PREVIEW COMPONENTS
   ══════════════════════════════════════════ */
function APSPreview({ data }) {
  return (
    <div className="fp fp--green">
      <span className="fp__eyebrow fp__eyebrow--green">
        <Calculator size={11} strokeWidth={2.5} /> APS Score
      </span>
      <div className="fp__aps-score">
        <span className="fp__aps-num">39</span>
        <span className="fp__aps-label">points</span>
      </div>
      <div className="fp__divider" />
      <div className="fp__list">
        {data.universities.map((u, i) => (
          <div key={i} className="fp__row">
            <div className="fp__row-avatar fp__row-avatar--green">
              {u.university
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </div>
            <span className="fp__row-label">{u.university}</span>
            <span className="fp__badge fp__badge--green">APS {u.aps}</span>
          </div>
        ))}
      </div>
      <div className="fp__bar-group">
        {[
          ["Mathematics", 78],
          ["English HL", 72],
          ["Physical Sci", 65],
        ].map(([sub, mark]) => (
          <div key={sub} className="fp__bar-item">
            <div className="fp__bar-meta">
              <span className="fp__bar-label">{sub}</span>
              <span className="fp__bar-val">{mark}%</span>
            </div>
            <div className="fp__bar-track">
              <div
                className="fp__bar-fill fp__bar-fill--green"
                style={{ width: `${mark}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EligibilityPreview({ data }) {
  const q = data.qualification;
  return (
    <div className="fp fp--orange">
      <span className="fp__eyebrow fp__eyebrow--orange">
        <CheckCircle2 size={11} strokeWidth={2.5} /> 52 qualifications unlocked
      </span>
      <div className="fp__card fp__card--orange">
        <div className="fp__card-head">
          <p className="fp__card-title">{q.name}</p>
          <span className="fp__badge fp__badge--orange">NQF {q.nqf}</span>
        </div>
        <div className="fp__tags">
          <span className="fp__tag">{q.code}</span>
          <span className="fp__tag">APS {q.minAPS}+</span>
          <span className="fp__tag">{q.duration}</span>
        </div>
        <div className="fp__divider" />
        <p className="fp__micro-label">Prerequisites</p>
        <div className="fp__prereqs">
          {q.prerequisites.map((p, i) => (
            <span key={i} className="fp__prereq">
              <CheckCircle2 size={10} strokeWidth={2.5} /> {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecommendationPreview({ data }) {
  const q = data.qualification;
  return (
    <div className="fp fp--purple">
      <span className="fp__eyebrow fp__eyebrow--purple">
        <Sparkles size={11} strokeWidth={2} /> AI Recommended
      </span>
      <div className="fp__card fp__card--purple">
        <div className="fp__card-head">
          <p className="fp__card-title">{q.name}</p>
          <div className="fp__fit-ring">
            <svg viewBox="0 0 48 48" className="fp__ring-svg">
              <circle cx="24" cy="24" r="20" className="fp__ring-bg" />
              <circle
                cx="24"
                cy="24"
                r="20"
                className="fp__ring-fill fp__ring-fill--purple"
                style={{ strokeDashoffset: 125.6 - (125.6 * q.fitScore) / 100 }}
              />
            </svg>
            <span className="fp__ring-num">{q.fitScore}%</span>
          </div>
        </div>
        <div className="fp__tags">
          <span className="fp__tag">{q.code}</span>
          <span className="fp__badge fp__badge--purple">{q.fitScore}% fit</span>
        </div>
        <div className="fp__divider" />
        <p className="fp__micro-label">Why this course?</p>
        <p className="fp__reason">{q.reason}</p>
      </div>
    </div>
  );
}

function DeepDivePreview({ data }) {
  const q = data.qualification;
  return (
    <div className="fp fp--red">
      <span className="fp__eyebrow fp__eyebrow--red">
        <Microscope size={11} strokeWidth={2} /> Career Deep Dive
      </span>
      <div className="fp__card fp__card--red">
        <p className="fp__card-title">{q.name}</p>
        <p className="fp__desc">{q.description}</p>
        <div className="fp__divider" />
        <p className="fp__micro-label">Salary outlook</p>
        <div className="fp__salary-bars">
          {[
            ["Entry", 30, "#94a3b8"],
            ["Mid", 62, "#2563eb"],
            ["Senior", 95, "#16a34a"],
          ].map(([l, p, c]) => (
            <div key={l} className="fp__salary-row">
              <span className="fp__salary-label">{l}</span>
              <div className="fp__bar-track fp__bar-track--sm">
                <div
                  className="fp__bar-fill"
                  style={{ width: `${p}%`, background: c }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComparisonPreview({ data }) {
  const isLeftWinner = data.winner === "left";
  return (
    <div className="fp fp--blue">
      <span className="fp__eyebrow fp__eyebrow--blue">
        <Scale size={11} strokeWidth={2} /> Side-by-side comparison
      </span>
      <div className="fp__cmp-cols">
        {[
          { ...data.left, win: isLeftWinner },
          { ...data.right, win: !isLeftWinner },
        ].map((side, i) => (
          <div
            key={i}
            className={`fp__cmp-col ${side.win ? "fp__cmp-col--win" : ""}`}
          >
            {side.win && (
              <span className="fp__cmp-trophy">
                <Trophy size={10} strokeWidth={2.5} /> Winner
              </span>
            )}
            <div className="fp__cmp-score-wrap">
              <span
                className={`fp__cmp-score ${side.win ? "fp__cmp-score--win" : ""}`}
              >
                {side.score}%
              </span>
              <span className="fp__cmp-score-label">match</span>
            </div>
            <div className="fp__bar-track">
              <div
                className="fp__bar-fill"
                style={{
                  width: `${side.score}%`,
                  background: side.win ? "#2563eb" : "#cbd5e1",
                }}
              />
            </div>
            <p className="fp__cmp-name">{side.name}</p>
          </div>
        ))}
      </div>
      <div className="fp__divider" />
      <div className="fp__cmp-attrs">
        {[
          ["Academic fit", 88, 72],
          ["Personality", 90, 65],
          ["Career outlook", 85, 70],
        ].map(([attr, a, b]) => (
          <div key={attr} className="fp__cmp-attr">
            <span className="fp__micro-label">{attr}</span>
            <div className="fp__cmp-attr-bars">
              <div className="fp__bar-track fp__bar-track--sm">
                <div
                  className="fp__bar-fill"
                  style={{ width: `${a}%`, background: "#2563eb" }}
                />
              </div>
              <div className="fp__bar-track fp__bar-track--sm">
                <div
                  className="fp__bar-fill"
                  style={{ width: `${b}%`, background: "#cbd5e1" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatPreview({ data }) {
  return (
    <div className="fp fp--green">
      <div className="fp__chat-header">
        <div className="fp__chat-avatar">
          <Bot size={14} strokeWidth={1.8} />
        </div>
        <div>
          <p className="fp__chat-name">CourseMate</p>
          <p className="fp__chat-status">
            <span className="fp__status-dot" /> Online
          </p>
        </div>
      </div>
      <div className="fp__messages">
        {data.messages.map((m, i) => (
          <div key={i} className={`fp__bubble fp__bubble--${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="fp__chat-input">
        <span className="fp__chat-placeholder">Ask me anything…</span>
        <div className="fp__chat-send">→</div>
      </div>
    </div>
  );
}

function NSFASPreview({ data }) {
  return (
    <div className="fp fp--teal">
      <span className="fp__eyebrow fp__eyebrow--teal">
        <Banknote size={11} strokeWidth={2} /> NSFAS Check
      </span>
      <div className="fp__nsfas-cards">
        {data.cards.map((c, i) => (
          <div key={i} className={`fp__nsfas-card fp__nsfas-card--${c.status}`}>
            <span className={`fp__nsfas-icon fp__nsfas-icon--${c.status}`}>
              {c.status === "eligible" ? "✓" : "✕"}
            </span>
            <p className="fp__nsfas-title">{c.title}</p>
            <p className="fp__nsfas-desc">{c.description}</p>
          </div>
        ))}
      </div>
      <div className="fp__divider" />
      <div className="fp__nsfas-criteria">
        {[
          ["SA Citizen", true],
          ["Income ≤ R350k", true],
          ["Public Institution", true],
          ["N+1 Rule", false],
        ].map(([label, pass]) => (
          <div key={label} className="fp__criteria-row">
            <span
              className={`fp__criteria-dot fp__criteria-dot--${pass ? "pass" : "fail"}`}
            />
            <span className="fp__criteria-label">{label}</span>
          </div>
        ))}
      </div>
      <p className="fp__disclaimer">{data.disclaimer}</p>
    </div>
  );
}

function FeaturePreview({ feature }) {
  switch (feature.preview.type) {
    case "aps":
      return <APSPreview data={feature.preview} />;
    case "eligibility":
      return <EligibilityPreview data={feature.preview} />;
    case "recommendation":
      return <RecommendationPreview data={feature.preview} />;
    case "deepDive":
      return <DeepDivePreview data={feature.preview} />;
    case "comparison":
      return <ComparisonPreview data={feature.preview} />;
    case "chat":
      return <ChatPreview data={feature.preview} />;
    case "nsfas":
      return <NSFASPreview data={feature.preview} />;
    default:
      return null;
  }
}

/* ══════════════════════════════════════════
   FEATURE CARD
   ══════════════════════════════════════════ */
function FeatureCard({ feature, index }) {
  const [ref, inView] = useInView(0.12);
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`fc fc--${feature.color} ${inView ? "fc--visible" : ""}`}
      style={{ "--delay": `${index * 0.08}s` }}
    >
      <div className="fc__meta">
        <div className={`fc__icon fc__icon--${feature.color}`}>
          <Icon size={18} strokeWidth={1.8} />
        </div>
        <h3 className="fc__title">{feature.title}</h3>
        <p className="fc__desc">{feature.description}</p>
      </div>
      <div className="fc__preview">
        <FeaturePreview feature={feature} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */
export default function Features() {
  const navigate = useNavigate();
  const [headerRef, headerIn] = useInView(0.2);

  return (
    <>
      <SEO
        title="CourseMatch Features | APS Calculator, AI Course Matching & NSFAS Tools"
        description="Explore CourseMatch features including APS calculation, qualification eligibility checking, AI course recommendations, career insights, qualification comparisons, and NSFAS eligibility checking."
        url="https://coursematchapp.co.za/features"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "CourseMatch Features",
          description:
            "Explore CourseMatch tools including APS Calculator, Qualification Eligibility Checker, AI Course Recommendations, Career Deep Dive, Qualification Comparison, and NSFAS Eligibility Checker.",
          url: "https://coursematchapp.co.za/features",
        }}
      />

      <section className="feat" id="features-section">
        <div
          ref={headerRef}
          className={`feat__header ${headerIn ? "feat__header--visible" : ""}`}
        >
          <span className="feat__eyebrow">Features</span>
          <h1 className="feat__heading">
            Everything you need to choose right.
          </h1>
          <p className="feat__subheading">
            From APS calculation to AI-powered career insights — CourseMatch
            gives you the tools to make a confident, informed decision about
            your future.
          </p>
          <ChevronDown
            className="feat__scroll-cue"
            size={22}
            strokeWidth={1.5}
          />
        </div>

        <div className="feat__grid">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        <div className="feat__cta">
          <p className="feat__cta-text">Ready to find your perfect course?</p>
          <button className="feat__cta-btn" onClick={() => navigate("/login")}>
            Get started free
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </section>
    </>
  );
}
