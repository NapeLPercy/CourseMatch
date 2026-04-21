import "../../styles/StudentViewUniversities.css";
import React, { useState, useEffect } from "react";
import UniversityList from "./UniversityList";
import { GraduationCap } from "lucide-react";

export default function StudentViewUniversities() {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);

  return (
    <div className="vc">
      <header
        ref={setRef}
        className={`vc__header ${visible ? "vc__header--visible" : ""}`}
      >
        <div className="vc__header-icon">
          <GraduationCap size={28} strokeWidth={1.8} />
        </div>
        <div className="vc__header-text">
          <h1 className="vc__title">
            Find your university
          </h1>
          <p className="vc__subtitle">
            Choose a university below to see which courses are suitable for you —
            based on your subjects and goals.
          </p>
        </div>
      </header>

      <UniversityList />
    </div>
  );
}
