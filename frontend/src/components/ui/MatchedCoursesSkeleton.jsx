import React from "react";
import "../../styles/MatchedCoursesSkeleton.css";

export default function MatchedCoursesSkeleton() {
  return (
    <div className="cls">

      {/* Header skeleton */}
      <div className="cls__header">
        <div className="cls__skel cls__header-icon" />
        <div className="cls__header-text">
          <div className="cls__skel cls__eyebrow" />
          <div className="cls__skel cls__title" />
          <div className="cls__skel cls__subtitle" />
        </div>
      </div>

      {/* Controls skeleton */}
      <div className="cls__controls">
        <div className="cls__skel cls__search" />
        <div className="cls__skel cls__select" />
        <div className="cls__skel cls__select" />
      </div>

      {/* Meta skeleton */}
      <div className="cls__skel cls__meta" />

      {/* Cards grid */}
      <div className="cls__grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="cls__card" style={{ "--i": i }}>

            {/* Card head */}
            <div className="cls__card-head">
              <div className="cls__skel cls__avatar" />
              <div className="cls__card-meta">
                <div className="cls__skel cls__uni" />
                <div className="cls__skel cls__faculty" />
              </div>
              <div className="cls__skel cls__fit" />
            </div>

            {/* Card body */}
            <div className="cls__card-body">
              <div className="cls__skel cls__course-name" />
              <div className="cls__skel cls__course-name cls__course-name--short" />

              <div className="cls__tags">
                <div className="cls__skel cls__tag" />
                <div className="cls__skel cls__tag" />
              </div>

              {/* Reason block */}
              <div className="cls__reason">
                <div className="cls__skel cls__reason-line" />
                <div className="cls__skel cls__reason-line" />
                <div className="cls__skel cls__reason-line cls__reason-line--short" />
              </div>
            </div>

            {/* Actions */}
            <div className="cls__card-actions">
              <div className="cls__skel cls__action" />
              <div className="cls__skel cls__action" />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}