import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Target,
  Lightbulb,
  Users,
  BookOpen,
  Star,
} from "lucide-react";
import "./About.css";
import aboutDesktop from "../assets/aboutDesktop.png";
import aboutPhone from "../assets/aboutPhone.png";
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

const STATS = [
  { value: "100+", label: "Students matched", icon: Users },
  { value: "500+", label: "Courses catalogued", icon: BookOpen },
  { value: "90%", label: "Satisfaction rate", icon: Star },
];

export default function AboutUs() {
  const [headerRef, headerIn] = useInView(0.2);
  const [contentRef, contentIn] = useInView(0.15);
  const [statsRef, statsIn] = useInView(0.15);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="hiw" id="about-section">
      {/* Section header — same structure, different text */}
      <div
        ref={headerRef}
        className={`hiw__header ${headerIn ? "hiw__header--visible" : ""}`}
      >
        <span className="hiw__eyebrow">
          <span className="hiw__eyebrow-line" />
          About us
          <span className="hiw__eyebrow-line" />
        </span>
        <h2 className="hiw__title">Built for South African students.</h2>
        <p className="hiw__subtitle">
          CourseMatch was created to remove the confusion around university
          applications — giving every student a clear, personalized path forward
          regardless of where they come from.
        </p>
        <ChevronDown className="hiw__scroll-cue" size={22} strokeWidth={1.5} />
      </div>

      {/* Two-column content */}
      <div
        ref={contentRef}
        className={`au__content ${contentIn ? "au__content--visible" : ""}`}
      >
        {/* Left — what we do + mission stacked */}
        <div className="au__left">
          <div className="au__card">
            <div className="au__card-icon">
              <Lightbulb size={20} strokeWidth={1.8} />
            </div>
            <h3 className="au__card-title">What we do</h3>
            <p className="au__card-desc">
              CourseMatch helps matric students and graduates discover
              university courses they actually qualify for. We combine your APS
              score, subject choices, and personal profile to surface the right
              qualifications — from the right institutions — without the
              guesswork.
            </p>
          </div>

          <div className="au__card">
            <div className="au__card-icon au__card-icon--green">
              <Target size={20} strokeWidth={1.8} />
            </div>
            <h3 className="au__card-title">Our mission</h3>
            <p className="au__card-desc">
              To make higher education accessible and understandable for every
              South African student. We believe the right information at the
              right time changes lives — and we're building the tool that
              delivers it.
            </p>
          </div>
        </div>

        {/* Right — image */}
        <div className="au__right">
          <div className="au__image-wrap">
            <img
              src={isDesktop ? "/aboutDesktop.png" : "/aboutPhone.png"}
              alt="Student using CourseMatch"
              className="au__image"
            />
            <div className="au__image-overlay" />
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div
        ref={statsRef}
        className={`au__stats ${statsIn ? "au__stats--visible" : ""}`}
      >
        {STATS.map(({ value, label, icon: Icon }, i) => (
          <div key={label} className="au__stat" style={{ "--i": i }}>
            <div className="au__stat-icon">
              <Icon size={18} strokeWidth={1.8} />
            </div>
            <strong className="au__stat-value">{value}</strong>
            <span className="au__stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
