import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, BookOpen } from "lucide-react";
import "../../styles/UniversityList.css";
import { universitiesData } from "../../Utils/universities";
/* ─── Data ──────────────────────────────────────────────────── */

/* ─── Marquee strip for faculties ───────────────────────────── */
function FacultyMarquee({ faculties }) {
  // Duplicate the list so the loop is seamless
  const doubled = [...faculties, ...faculties];

  return (
    <div className="uni__marquee">
      <div className="uni__marquee-track">
        {doubled.map((f, i) => (
          <span key={i} className="uni__marquee-item">
            <BookOpen size={11} strokeWidth={2} className="uni__marquee-icon" />
            {f}
            <span className="uni__marquee-dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Single university card ────────────────────────────────── */
function UniCard({ uni, index }) {
  const navigate = useNavigate();

  return (
    <div className="uni__card" style={{ animationDelay: `${index * 0.07}s` }}>
      {/* Logo */}
      <div className="uni__logo-wrap">
        {uni.logo ? (
          <img
            src={uni.logo}
            alt={`${uni.name} logo`}
            className="uni__logo-img"
          />
        ) : (
          <div className="uni__logo-placeholder">
            <span className="uni__logo-initials">{uni.id.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="uni__body">
        <h3 className="uni__name">{uni.name}</h3>
        <p className="uni__desc">{uni.description}</p>

        {/* Faculty marquee */}
        <FacultyMarquee faculties={uni.faculties} />
      </div>

      {/* CTA */}
      <button
        type="button"
        className="uni__cta"
        onClick={() => navigate(`/view-courses/${uni.id}`)}
        aria-label={`View courses at ${uni.name}`}
      >
        <span className="uni__cta-text">View Courses</span>
        <ArrowRight size={15} strokeWidth={2.2} className="uni__cta-arrow" />
      </button>
    </div>
  );
}

/* ─── Export ────────────────────────────────────────────────── */
export default function UniversityList() {
  const [universities, setUniversities] = useState(universitiesData);
  return (
    <div className="uni__list">
      {universities.map((uni, i) => (
        <UniCard key={uni.id} uni={uni} index={i} />
      ))}
    </div>
  );
}
