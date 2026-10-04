import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Target,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  FlaskConical,
  Code2,
  Palette,
} from "lucide-react";
import "../styles/Hero.css";
// import {
//   BookOpen,
//   Brain,
//   Target,
//   Sparkles,
//   Code2,
//   FlaskConical,
//   GraduationCap,
// } from "lucide-react";
/* ── Product screenshots ── */
const PRODUCTS = [
  {
    src: "/ai_course_recommendation_hero.png",
    label: "AI Course Recommendations",
  },
  { src: "/course_deep_dive_hero.png", label: "Career Deep Dive" },
  { src: "/course_comparison_hero.png", label: "Course Comparison" },
];

const INPUTS = [
  {
    icon: BookOpen,
    label: "Subjects",
    sub: "Maths · Science · IT",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.12)",
  },
  {
    icon: Brain,
    label: "Personality",
    sub: "Analytical · Creative",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.12)",
  },
  {
    icon: Target,
    label: "Goals",
    sub: "Technology · Innovation",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.12)",
  },
];

const OUTPUTS = [
  { icon: Code2, label: "BSc Computer Science", score: "94%" },
  { icon: FlaskConical, label: "BEng Software Engineering", score: "91%" },
  { icon: GraduationCap, label: "BSc Data Science", score: "88%" },
  { icon: Briefcase, label: "BSc Information Systems", score: "85%" },
  { icon: Palette, label: "BDes Interaction Design", score: "82%" },
];

/* ── Product showcase ── */
function ProductShowcase() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handler = () => {
      const idx = Math.round(track.scrollLeft / (track.offsetWidth * 0.82));
      setActive(Math.min(idx, PRODUCTS.length - 1));
    };
    track.addEventListener("scroll", handler, { passive: true });
    return () => track.removeEventListener("scroll", handler);
  }, []);

  function scrollTo(i) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.offsetWidth * 0.82, behavior: "smooth" });
    setActive(i);
  }

  return (
    <div className="ps">
      <div className="ps__track" ref={trackRef}>
        {PRODUCTS.map((p, i) => (
          <div key={p.src} className="ps__card">
            <div className="ps__img-wrap">
              <img
                src={p.src}
                alt={p.label}
                className="ps__img"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
            <p className="ps__label">{p.label}</p>
          </div>
        ))}
      </div>
      <div className="ps__dots" role="tablist">
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            className={`ps__dot ${i === active ? "ps__dot--active" : ""}`}
            onClick={() => scrollTo(i)}
            type="button"
            aria-label={`View ${PRODUCTS[i].label}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Desktop diagram ── */

function DiagramDesktop() {
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
            d="M -30 13 C 80 13, 120 40, 200 40"
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
            d="M -30 67 C 80 67, 120 40, 200 40"
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
  );}

/* ── Mobile diagram ── */
function DiagramMobile() {
  return (
    <div className="dg dg--mobile" aria-label="How CourseMatch works">
      {/* Input nodes row */}
      <div className="dg__m-inputs">
        {INPUTS.map((inp) => {
          const Icon = inp.icon;
          return (
            <div
              key={inp.label}
              className="dg__m-node"
              style={{ "--c": inp.color, "--bg": inp.bg }}
            >
              <div className="dg__m-icon">
                <Icon size={14} strokeWidth={2} />
              </div>
              <span className="dg__m-label">{inp.label}</span>
            </div>
          );
        })}
      </div>

      {/* Down lines → engine */}
      <svg
        className="dg__m-svg"
        viewBox="0 0 240 56"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 40 0  C 40 30 120 40 120 56"
          stroke="rgba(147,197,253,0.4)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 120 0 L 120 56"
          stroke="rgba(147,197,253,0.55)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 200 0 C 200 30 120 40 120 56"
          stroke="rgba(147,197,253,0.4)"
          strokeWidth="1.5"
          fill="none"
        />
        {[
          { path: "M 40 0 C 40 30 120 40 120 56", delay: "0s" },
          { path: "M 120 0 L 120 56", delay: "0.3s" },
          { path: "M 200 0 C 200 30 120 40 120 56", delay: "0.6s" },
        ].map((p, i) => (
          <circle key={i} r="3" fill="#93c5fd" opacity="0.85">
            <animateMotion
              dur="1.8s"
              repeatCount="indefinite"
              begin={p.delay}
              path={p.path}
            />
          </circle>
        ))}
      </svg>

      {/* Engine */}
      <div className="dg__m-engine">
        <div className="dg__engine-glow" aria-hidden="true" />
        <Sparkles size={16} strokeWidth={1.8} className="dg__engine-sparkle" />
        <span className="dg__engine-name">CourseMatch</span>
        {/* <div className="dg__engine-score">
          <span className="dg__score-num">94%</span>
          <span className="dg__score-label">match</span>
        </div> */}
      </div>

      {/* Down lines → outputs */}
      <svg
        className="dg__m-svg dg__m-svg--out"
        viewBox="0 0 240 56"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 120 0 C 120 16 40 26 40 56"
          stroke="rgba(147,197,253,0.35)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
        />
        <path
          d="M 120 0 C 120 20 80 30 80 56"
          stroke="rgba(147,197,253,0.4)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
        />
        <path
          d="M 120 0 L 120 56"
          stroke="rgba(147,197,253,0.55)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 120 0 C 120 20 160 30 160 56"
          stroke="rgba(147,197,253,0.4)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
        />
        <path
          d="M 120 0 C 120 16 200 26 200 56"
          stroke="rgba(147,197,253,0.35)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
        />
        {[
          { path: "M 120 0 C 120 16 40 26 40 56", delay: "0s" },
          { path: "M 120 0 C 120 20 80 30 80 56", delay: "0.2s" },
          { path: "M 120 0 L 120 56", delay: "0.4s" },
          { path: "M 120 0 C 120 20 160 30 160 56", delay: "0.6s" },
          { path: "M 120 0 C 120 16 200 26 200 56", delay: "0.8s" },
        ].map((p, i) => (
          <circle key={i} r="2.5" fill="#93c5fd" opacity="0.7">
            <animateMotion
              dur="1.8s"
              repeatCount="indefinite"
              begin={p.delay}
              path={p.path}
            />
          </circle>
        ))}
      </svg>

      {/* Output courses — horizontal scroll */}
      <div className="dg__m-outputs">
        {OUTPUTS.map((o) => {
          const Icon = o.icon;
          return (
            <div key={o.label} className="dg__m-output">
              <span className="dg__output-score">{o.score}</span>
              <span className="dg__output-name">{o.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Hero ── */
export default function Hero() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("hero--mounted"));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero"
      aria-label="CourseMatch introduction"
    >
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />
      <div className="hero__mesh" aria-hidden="true" />

      <div className="hero__inner">
        {/* ── Top: copy left, diagram right ── */}
        <div className="hero__top">
          {/* Copy */}
          <div className="hero__copy">
            {/* <div className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              AI-Powered Course Matching
            </div> */}

            <h1 className="hero__title">
              Find your perfect{" "}
              <span className="hero__title-accent">course.</span>
            </h1>

            <p className="hero__subtitle">
              CourseMatch uses your subjects, marks, and personality to find
              courses that suit you. Discover your strongest matches based on
              what you're good at, what you enjoy, and where you want to go.
            </p>

            <ul className="hero__pills">
              {[
                "Personalized matches",
                "Subjects + personality",
                "Built for you",
              ].map((p) => (
                <li key={p} className="hero__pill">
                  <CheckCircle2
                    size={14}
                    strokeWidth={2.5}
                    className="hero__pill-icon"
                  />
                  {p}
                </li>
              ))}
            </ul>

            <div className="hero__actions">
              <button
                className="hero__btn hero__btn--primary"
                type="button"
                onClick={() => navigate("/login")}
              >
                Get Started
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
              <button
                className="hero__btn hero__btn--ghost"
                type="button"
                onClick={() =>
                  document.getElementById("hiw-section")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              >
                How it works
              </button>
            </div>
          </div>

          {/* Desktop diagram */}
          <div className="hero__diagram-wrap hero__diagram-wrap--desktop">
            <DiagramDesktop />
          </div>
        </div>

        {/* Mobile diagram — sits between copy and showcase */}
        <div className="hero__diagram-wrap hero__diagram-wrap--mobile">
          <DiagramMobile />
        </div>

        {/* ── Bottom: product showcase ── */}
        <div className="hero__showcase">
          <p className="hero__showcase-label">See CourseMatch in action</p>
          <ProductShowcase />
        </div>
      </div>
    </section>
  );
}
