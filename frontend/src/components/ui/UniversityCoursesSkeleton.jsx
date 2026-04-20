import React from "react";
import "../../styles/UniversityCoursesSkeleton.css";

export default function UniversityCoursesSkeleton() {
  return (
    <div className="ucs">

      {/* Controls row */}
      <div className="ucs__controls">
        <div className="ucs__skel ucs__select" />
        <div className="ucs__skel ucs__btn" />
      </div>

      {/* Grid */}
      <div className="ucs__grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="ucs__card" style={{ "--i": i }}>

            {/* Left — score badge */}
            <div className="ucs__badge-col">
              <div className="ucs__skel ucs__badge-value" />
              <div className="ucs__skel ucs__badge-label" />
            </div>

            {/* Right — info */}
            <div className="ucs__info-col">
              <div className="ucs__skel ucs__title" />
              <div className="ucs__skel ucs__title ucs__title--short" />

              <div className="ucs__meta-row">
                <div className="ucs__skel ucs__meta-pill" />
                <div className="ucs__skel ucs__meta-pill" />
                <div className="ucs__skel ucs__meta-pill ucs__meta-pill--wide" />
              </div>

              <div className="ucs__reason-block">
                <div className="ucs__skel ucs__reason-line" />
                <div className="ucs__skel ucs__reason-line" />
                <div className="ucs__skel ucs__reason-line ucs__reason-line--short" />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}