import React, { useRef, useState, useEffect } from "react";
import {
  Target,
  Sparkles,
  BookOpen,
  Heart,
  Compass,
  TrendingUp,
  BarChart2,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import img from "../assets/about.jpg";

/* ─── Scroll-reveal hook ───────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── AI factor data ────────────────────────────────────────── */
const AI_FACTORS = [
  { Icon: BarChart2, text: "Your academic strengths and subject preferences" },
  { Icon: Target, text: "Personal goals and career aspirations" },
  { Icon: Compass, text: "Learning environment preferences" },
  {
    Icon: Heart,
    text: "Hobbies and interests that align with different fields",
  },
  { Icon: TrendingUp, text: "Long-term career objectives" },
];

/* ─── Stats bar ─────────────────────────────────────────────── */
const STATS = [
  { value: "12 000+", label: "Students matched" },
  { value: "340+", label: "Courses catalogued" },
  { value: "98%", label: "Satisfaction rate" },
];

/* ─────────────────── COMPONENT ─────────────────────────────── */
export default function About() {
  const navigate = useNavigate();
  /* Hero split */
  const [heroRef, heroIn] = useInView(0.12);
  /* Mission + What We Do */
  const [missionRef, missionIn] = useInView(0.15);
  /* AI section */
  const [aiRef, aiIn] = useInView(0.15);
  /* Why choose */
  const [whyRef, whyIn] = useInView(0.15);
  /* Contact */
  const [contactRef, contactIn] = useInView(0.2);

  return (
    <div className="about">
      {/* ════════ HERO SPLIT ════════ */}
      <section
        ref={heroRef}
        className={`about-hero ${heroIn ? "about-hero--visible" : ""}`}
      >
        <div className="about-hero__bg" aria-hidden="true" />

        {/* Left — text */}
        <div className="about-hero__text">
          <span className="about-hero__eyebrow">
            <span className="about-hero__eyebrow-line" />
            About Us
          </span>
          <h1 className="about-hero__title">
            Empowering students
            <br />
            to make <span className="about-hero__accent">informed</span>
            <br />
            decisions.
          </h1>
          <p className="about-hero__sub">
            CourseMatch is built for South African students who deserve a
            clearer path to higher education — not another endless search.
          </p>
        </div>

        {/* Right — image */}
        <div className="about-hero__image-wrap">
          <div className="about-hero__image-frame">
            {/* Placeholder image built with CSS — swap src for a real photo */}
            <img
              className="about-hero__image"
              src={img}
              aria-label="Students studying"
            />

            {/* Floating badge */}
            <div className="about-hero__badge">
              <Sparkles size={16} className="about-hero__badge-icon" />
              <span>AI-ASSISTED</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ STATS BAR ════════ */}
      <div className="about-stats">
        {STATS.map((s) => (
          <div key={s.label} className="about-stats__item">
            <span className="about-stats__value">{s.value}</span>
            <span className="about-stats__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ════════ MISSION + WHAT WE DO (two-col) ════════ */}
      <section
        ref={missionRef}
        className={`about-twin ${missionIn ? "about-twin--visible" : ""}`}
      >
        <div className="about-twin__card about-twin__card--mission">
          <div className="about-twin__icon-wrap">
            <Target size={26} strokeWidth={1.6} className="about-twin__icon" />
          </div>
          <span className="about-twin__label">Our Mission</span>
          <h2 className="about-twin__title">Every student deserves a path.</h2>
          <p className="about-twin__text">
            Course Match is dedicated to helping South African students navigate
            the complex world of university admissions. We believe every student
            deserves to find their perfect academic path based on both their
            achievements and their passions.
          </p>
        </div>

        <div className="about-twin__card about-twin__card--what">
          <div className="about-twin__icon-wrap">
            <BookOpen
              size={26}
              strokeWidth={1.6}
              className="about-twin__icon"
            />
          </div>
          <span className="about-twin__label">What We Do</span>
          <h2 className="about-twin__title">Marks meet meaning.</h2>
          <p className="about-twin__text">
            Our platform combines academic qualification matching with
            AI-powered personalisation. By analysing your matric marks alongside
            your personal strengths, interests, and career goals, we provide
            tailored course recommendations that go beyond just meeting entry
            requirements.
          </p>
        </div>
      </section>

      {/* ════════ AI-POWERED MATCHING ════════ */}
      <section
        ref={aiRef}
        className={`about-ai ${aiIn ? "about-ai--visible" : ""}`}
      >
        <div className="about-ai__inner">
          {/* Left — heading block */}
          <div className="about-ai__head">
            <div className="about-ai__icon-wrap">
              <Sparkles
                size={28}
                strokeWidth={1.5}
                className="about-ai__icon"
              />
            </div>
            <span className="about-ai__label">AI-Powered Matching</span>
            <h2 className="about-ai__title">
              Smarter matching,
              <br />
              <span className="about-ai__accent">deeper insights.</span>
            </h2>
            <p className="about-ai__intro">
              Our intelligent system considers multiple factors to build a
              picture of who you really are — not just what your marks say.
            </p>
          </div>

          {/* Right — factor list */}
          <div className="about-ai__list">
            {AI_FACTORS.map((f, i) => (
              <div
                key={i}
                className="about-ai__factor"
                style={{ "--delay": `${i * 0.1}s` }}
              >
                <div className="about-ai__factor-icon">
                  <f.Icon size={20} strokeWidth={1.8} />
                </div>
                <span className="about-ai__factor-text">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ WHY CHOOSE US ════════ */}
      <section
        ref={whyRef}
        className={`about-why ${whyIn ? "about-why--visible" : ""}`}
      >
        <div className="about-why__inner">
          <div className="about-why__icon-wrap">
            <CheckCircle2
              size={26}
              strokeWidth={1.6}
              className="about-why__icon"
            />
          </div>
          <span className="about-why__label">Why Choose Us</span>
          <h2 className="about-why__title">
            Beyond grades — it's about
            <br />
            <span className="about-why__accent">where you'll thrive.</span>
          </h2>
          <p className="about-why__text">
            We understand that choosing a university course is about more than
            just grades. It's about finding where you'll thrive, grow, and build
            the future you envision. Course Match bridges the gap between
            qualification and aspiration.
          </p>
        </div>
      </section>

      {/* ════════ CONTACT BANNER ════════ */}
      <section
        ref={contactRef}
        className={`about-contact ${contactIn ? "about-contact--visible" : ""}`}
      >
        <div className="about-contact__glow" aria-hidden="true" />
        <div className="about-contact__content">
          <div className="about-contact__icon-wrap">
            <Mail size={24} strokeWidth={1.6} className="about-contact__icon" />
          </div>
          <h2 className="about-contact__title">Have questions?</h2>
          <p className="about-contact__text">
            We're here to help you on your journey to higher education.
          </p>
          <button
            className="btn btn--primary"
            type="button"
            onClick={() => {
              navigate("/contact-us");
              window.scrollTo({
                top:0, left:0,behavior: 'smooth' 
              });
            }}
          >
            <span>Contact Us</span>
            <ArrowRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </section>
    </div>
  );
}
