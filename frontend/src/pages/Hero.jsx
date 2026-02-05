import React, { useEffect, useRef } from "react";
import "./Hero.css";
//import bg from "../assets/uni.jpg"; // uncomment when you have your image
import {useNavigate} from "react-router-dom";

export default function Hero() {
  const sectionRef = useRef(null);
  const hiwRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger entrance animations after mount
    const el = sectionRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.classList.add("intro--mounted");
      });
    }
  }, []);

  return (
    <main className="home">
      <section
        ref={sectionRef}
        className="intro"
       // style={{ backgroundImage: `url(${bg})` }}  // uncomment when using image
        aria-label="CourseMatch introduction"
      >
        {/* Geometric ambient shapes */}
        <div className="intro__geo intro__geo--1" aria-hidden="true" />
        <div className="intro__geo intro__geo--2" aria-hidden="true" />
        <div className="intro__geo intro__geo--3" aria-hidden="true" />

        {/* Gradient mesh background */}
        <div className="intro__mesh" aria-hidden="true" />

        {/* Image layer (activates when bg is provided) */}
        {/* <div className="intro__image" style={{ backgroundImage: `url(${bg})` }} /> */}
        <div className="intro__overlay" aria-hidden="true" />

        {/* Main content */}
        <div className="intro__content">
          {/* Top badge */}
          <div className="intro__badge">
            <span className="intro__badge-dot" />
            AI-ASSISTED Course Matching
          </div>

          {/* Headline */}
          <h1 className="intro__title">
            Find your <br />
            <span className="intro__title-highlight">perfect</span> course.
          </h1>

          {/* Sub-headline */}
          <p className="intro__text">
            CourseMatch ranks every course you qualify for — instantly. See exactly
            where you stand, what you need to improve, and which doors are already open.
          </p>

          {/* CTA buttons */}
          <div className="intro__actions">
            <button className="btn btn--primary-start" type="button" onClick={()=>{
              navigate("/register");
            }}>
              <span className="btn__inner">Get Started</span>
            </button>
            <button className="btn btn--ghost" type="button" style={{
              border: "1px solid white",borderRadius: 10
            }}>
              <span className="btn__inner"><a href="#hiw-section" style={{
                textDecoration:"none",
                color: "white"
                
                }}>How it works</a></span>
            </button>
          </div>

          {/* Trust pills */}
          <div className="intro__pills">
            <span className="intro__pill">
              <svg className="intro__pill-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Requirements clarity
            </span>
            <span className="intro__pill-divider" aria-hidden="true" />
            <span className="intro__pill">
              <svg className="intro__pill-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Instant ranking
            </span>
            <span className="intro__pill-divider" aria-hidden="true" />
            <span className="intro__pill">
              <svg className="intro__pill-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Student-first
            </span>
          </div>
        </div>

        {/* Decorative scroll hint */}
        <div className="intro__scroll" aria-label="Scroll down">
          <span className="intro__scroll-line" />
        </div>
      </section>
    </main>
  );
}