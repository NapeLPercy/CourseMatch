// src/pages/ViewCourses.jsx
import "../../styles/ViewCourses.css";


import React, { useRef, useState, useEffect } from "react";
import UniversityList from "./UniversityList";

export default function ViewCourses() {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);

  return (
    <div className="vc">
      {/* Page header */}
      <header ref={setRef} className={`vc__header ${visible ? "vc__header--visible" : ""}`}>
        <span className="vc__eyebrow">Explore</span>
        <h1 className="vc__title">
          Pick your<br />
          <span className="vc__title-accent">university.</span>
        </h1>
        <p className="vc__subtitle">
          Choose a South African university below to see which courses you qualify
          for — based on your subjects and marks.
        </p>
      </header>

      {/* List */}
      <UniversityList />
    </div>
  );
}


