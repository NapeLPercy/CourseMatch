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
    <div className="dg dg--desktop" aria-label="How CourseMatch works">
      {/* Left — inputs */}
      <div className="dg__inputs">
        {INPUTS.map((inp) => {
          const Icon = inp.icon;
          return (
            <div
              key={inp.label}
              className="dg__input-node"
              style={{ "--c": inp.color, "--bg": inp.bg }}
            >
              <div className="dg__input-icon">
                <Icon size={15} strokeWidth={2} />
              </div>
              <div>
                <p className="dg__input-label">{inp.label}</p>
                <p className="dg__input-sub">{inp.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center — engine */}
      <div className="dg__engine">
        <div className="dg__engine-glow" aria-hidden="true" />
        <Sparkles size={18} strokeWidth={1.8} className="dg__engine-sparkle" />
        <span className="dg__engine-name">CourseMatch Engine</span>
        {/* <div className="dg__engine-score">
          <span className="dg__score-num">94%</span>
          <span className="dg__score-label">match</span>
        </div> */}
      </div>

      {/* Right — outputs */}
      <div className="dg__outputs">
        {OUTPUTS.map((o) => {
          const Icon = o.icon;
          return (
            <div key={o.label} className="dg__output-node">
              {/* <div className="dg__output-icon">
                <Icon size={13} strokeWidth={2} />
              </div> */}
              <span className="dg__output-name">{o.label}</span>
              <span className="dg__output-score">{o.score}</span>
            </div>
          );
        })}
      </div>

      {/* Single SVG overlay — covers the whole diagram */}
      <svg
        className="dg__overlay-svg"
        viewBox="0 0 600 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* incoming — meet on left face of engine */}
        <path
          d="M 0 70  C 140 70  230 160 230 160"
          stroke="rgba(147,197,253,0.5)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 0 160 L 230 160"
          stroke="rgba(147,197,253,0.65)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 0 250 C 140 250 230 160 230 160"
          stroke="rgba(147,197,253,0.5)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* outgoing */}
        <path
          d="M 350 160 C 380 160 410 32  440 32"
          stroke="rgba(147,197,253,0.38)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="5 3"
        />
        <path
          d="M 350 160 C 380 160 410 96  440 96"
          stroke="rgba(147,197,253,0.42)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="5 3"
        />
        <path
          d="M 350 160 L 440 160"
          stroke="rgba(147,197,253,0.55)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 350 160 C 380 160 410 224 440 224"
          stroke="rgba(147,197,253,0.42)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="5 3"
        />
        <path
          d="M 350 160 C 380 160 410 288 440 288"
          stroke="rgba(147,197,253,0.38)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="5 3"
        />

        {/* animated pulses — incoming */}
        <circle r="3" fill="#93c5fd" opacity="0.9">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            begin="0s"
            path="M 0 70 C 140 70 230 160 230 160"
          />
        </circle>
        <circle r="3" fill="#93c5fd" opacity="0.9">
          <animateMotion
            dur="1.7s"
            repeatCount="indefinite"
            begin="0.3s"
            path="M 0 160 L 230 160"
          />
        </circle>
        <circle r="3" fill="#93c5fd" opacity="0.9">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            begin="0.6s"
            path="M 0 250 C 140 250 230 160 230 160"
          />
        </circle>

        <circle r="2.5" fill="#93c5fd" opacity="0.7">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            begin="0.1s"
            path="M 350 160 C 380 160 410 32 440 32"
          />
        </circle>
        <circle r="2.5" fill="#93c5fd" opacity="0.7">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            begin="0.35s"
            path="M 350 160 C 380 160 410 96 440 96"
          />
        </circle>
        <circle r="2.5" fill="#93c5fd" opacity="0.7">
          <animateMotion
            dur="1.7s"
            repeatCount="indefinite"
            begin="0.6s"
            path="M 350 160 L 440 160"
          />
        </circle>
        <circle r="2.5" fill="#93c5fd" opacity="0.7">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            begin="0.85s"
            path="M 350 160 C 380 160 410 224 440 224"
          />
        </circle>
        <circle r="2.5" fill="#93c5fd" opacity="0.7">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            begin="1.1s"
            path="M 350 160 C 380 160 410 288 440 288"
          />
        </circle>
      </svg>
    </div>
  );
}

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
