import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Sparkles,
  ArrowRight,
  Trophy,
  ChevronLeft,
  Award,
} from "lucide-react";
import "../../styles/GuestResultsSummary.css";
import AddSubjects from "../forms/GuestCalculateAPS";

export default function GuestResultsSummary({ data }) {
  const navigate = useNavigate();
  const [back, setBack] = useState(false);


  if (!data) return null;

  const { courses = [], universityAPS = [], qualifiedUniversities = 0 } = data;

  const backHandler = () => {
    setBack(true);
  };

  if (back) return <AddSubjects />;

  return (
    <div className="grs">
      {/* Back button */}
      <button className="grs__back" onClick={backHandler}>
        <ChevronLeft size={18} strokeWidth={2.5} />
        Back to Calculator
      </button>

      {/* Main content - grows from center */}
      <div className="grs__container">
        {/* Trophy celebration */}
        <div className="grs__celebration">
          <h1 className="grs__title">Your APS Results Are In!</h1>
          <p className="grs__subtitle">
            Based on your subjects and marks, here's what you qualify for
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grs__stats">
          <div className="grs__stat-card">
            <div className="grs__stat-icon grs__stat-icon--blue">
              <BookOpen size={20} strokeWidth={2} />
            </div>
            <div className="grs__stat-content">
              <strong>{courses.length}</strong>
              <span>Qualifications</span>
            </div>
          </div>

          <div className="grs__stat-card">
            <div className="grs__stat-icon grs__stat-icon--green">
              <Building2 size={20} strokeWidth={2} />
            </div>
            <div className="grs__stat-content">
              <strong>{qualifiedUniversities}</strong>
              <span>
                {qualifiedUniversities === 1 ? "University" : "Universities"}
              </span>
            </div>
          </div>
        </div>

        {/* University Cards Grid */}
        <div className="grs__section">
          <h2 className="grs__section-title">
            <GraduationCap size={22} strokeWidth={2} />
            Universities & Your APS
          </h2>

          <div className="grs__grid">
            {universityAPS.map((uni, index) => (
              <div
                key={index}
                className="grs__card"
                style={{ "--index": index }}
              >
                <div className="grs__card-header">
                  <div className="grs__uni-badge">{uni.abbreviation}</div>
                  <div className="grs__aps-badge">
                    <span className="grs__aps-label">APS</span>
                    <strong className="grs__aps-value">{uni.aps}</strong>
                  </div>
                </div>

                <h3 className="grs__uni-name">{uni.name}</h3>

                <div className="grs__course-count">
                  <BookOpen size={14} strokeWidth={2} />
                  <span>
                    {uni.courseCount} qualification
                    {uni.courseCount !== 1 ? "s" : ""} available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="grs__cta">
          <div className="grs__cta-content">
            <div className="grs__cta-text">
              <h3 className="grs__cta-title">Ready to Explore Your Matches?</h3>
              <p className="grs__cta-desc">
                Register now to view detailed course information, AI-powered
                recommendations, and personalized insights based on your
                profile.
              </p>
            </div>
          </div>

          <button
            className="grs__cta-btn"
            onClick={() => navigate("/register")}
          >
            <span>Create Free Account</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
