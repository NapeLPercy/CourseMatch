import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Building2,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Trophy,
} from "lucide-react";
import "../../styles/GuestResultsSummary.css";
import AddSubjects from "../forms/GuestCalculateAPS";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";

export default function GuestResultsSummary({ data }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [back, setBack] = useState(false);
  const ctaRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!data) return null;
  if (back) return <AddSubjects />;

  const { courses = [], universityAPS = [], qualifiedUniversities = 0 } = data;

  const scrollToCta = () =>
    ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <>
      <Helmet>
        <title>Compare APS Requirements by University | CourseMatch</title>
        <meta
          name="description"
          content="Compare your APS score against entry requirements for South African universities."
        />
        <link
          rel="canonical"
          href="https://coursematchapp.co.za/aps-calculator"
        />
      </Helmet>

      <div className="grs">
        {/* Back */}
        <button className="grs__back" onClick={() => setBack(true)}>
          <ChevronLeft size={16} strokeWidth={2.5} />
          Back to Calculator
        </button>

        {/* Hero */}
        <div className="grs__hero">
          <div className="grs__hero-icon">
            <Trophy size={28} strokeWidth={1.8} />
          </div>
          <div className="grs__hero-text">
            <h1 className="grs__title">Your results are in!</h1>
            <p className="grs__subtitle">
              Based on your subjects and marks, here's what you qualify for.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grs__stats">
          <div className="grs__stat">
            <div className="grs__stat-icon grs__stat-icon--blue">
              <BookOpen size={16} strokeWidth={2} />
            </div>
            <div className="grs__stat-body">
              <strong>{courses.length}</strong>
              <span>Qualifications</span>
            </div>
          </div>
          <div className="grs__stat-divider" />
          <div className="grs__stat">
            <div className="grs__stat-icon grs__stat-icon--green">
              <Building2 size={16} strokeWidth={2} />
            </div>
            <div className="grs__stat-body">
              <strong>{qualifiedUniversities}</strong>
              <span>
                {qualifiedUniversities === 1 ? "University" : "Universities"}
              </span>
            </div>
          </div>
        </div>

        {/* Section */}
        <div className="grs__section">
          <div className="grs__section-header">
            <GraduationCap size={18} strokeWidth={2} />
            <h2 className="grs__section-title">Universities & your APS</h2>
          </div>

          <div className="grs__grid">
            {universityAPS.map((uni, index) => (
              <div
                key={index}
                className="grs__card"
                style={{ "--index": index }}
              >
                {/* Card head */}
                <div className="grs__card-head">
                  <div className="grs__uni-avatar">{uni.abbreviation}</div>
                  <div className="grs__aps-badge">
                    <span className="grs__aps-label">APS</span>
                    <strong className="grs__aps-value">{uni.aps}</strong>
                  </div>
                </div>

                {/* Info */}
                <div className="grs__card-body">
                  <h3 className="grs__uni-name">{uni.name}</h3>
                  <div className="grs__course-count">
                    <BookOpen size={13} strokeWidth={2} />
                    <span>
                      {uni.courseCount} qualification
                      {uni.courseCount !== 1 ? "s" : ""} available
                    </span>
                  </div>
                </div>

                {/* Per-uni btn */}
                {user ? (
                  <button
                    className="grs__uni-btn"
                    onClick={() => {
                      sessionStorage.setItem(
                        "visited-uni",
                        JSON.stringify({
                          name: uni.name,
                          id: uni.abbreviation.toLowerCase(),
                        }),
                      );
                      navigate(
                        `/view-courses/${uni.abbreviation.toLowerCase()}`,
                      );
                    }}
                  >
                    View courses
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </button>
                ) : (
                  <button
                    className="grs__uni-btn grs__uni-btn--ghost"
                    onClick={scrollToCta}
                  >
                    View courses
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="grs__cta" ref={ctaRef}>
          <div className="grs__cta-text">
            <h3 className="grs__cta-title">
              {user
                ? "Explore all your matches"
                : "Ready to explore your matches?"}
            </h3>
            <p className="grs__cta-desc">
              {user
                ? "Browse the full list of universities and dive into every course you qualify for — all in one place."
                : "Register now to view detailed course information, AI-powered recommendations, and personalized insights based on your profile."}
            </p>
          </div>
          <button
            className="grs__cta-btn"
            onClick={() => navigate(user ? "/view-courses" : "/register")}
          >
            {user ? "Browse universities" : "Create free account"}
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </>
  );
}
