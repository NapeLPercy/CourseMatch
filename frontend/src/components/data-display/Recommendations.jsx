import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Library, User } from "lucide-react";
import "../../styles/Recommendations.css";
import { useSubjects } from "../../context/SubjectContext";
import axios from "axios";

function Recommendations({ qualifiedCourses }) {
  // State
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingprofile] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  //context
  const { getSubjects } = useSubjects();

  const navigate = useNavigate();


useEffect(() => {
  // don’t call AI until we actually have data
  const subs = getSubjects();
  if (!subs?.length || !qualifiedCourses?.length) {
    setLoading(false);
    return;
  }

  fetchAiFitForUniversity(subs, qualifiedCourses);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [qualifiedCourses]); // runs when qualifiedCourses becomes available

const fetchAiFitForUniversity = async (subjects, qualifiedCourses) => {
  setLoading(true);
  try {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const token = JSON.parse(sessionStorage.getItem("token"));

    const res = await axios.post(
      `${API_BASE}/api/recommendation/ai-recommendations`,
      { subjects, qualifiedCourses },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("AI RESULTS:", res.data);
    setRecommendedCourses(res.data.results || []);
  } catch (err) {
    console.error("AI fit fetch failed:", err.response?.data || err.message);
    setRecommendedCourses([]);
  } finally {
    setLoading(false);
  }
};

  /* ------------------------------------------------ */
  // Derived: sorted list
  /* ------------------------------------------------ */
  const sortedCourses = [...recommendedCourses].sort((a, b) =>
    sortOrder === "asc" ? a.fit_score - b.fit_score : b.fit_score - a.fit_score,
  );

  /* ------------------------------------------------ */
  // Reusable renderers
  /* ------------------------------------------------ */

  /** Animated loading indicator – mirrors parent pattern */
  const renderLoading = () => (
    <p className="rec-loading">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      Displaying AI recommended courses …
    </p>
  );

  /** Empty state with contextual CTA */
  const renderEmptyState = () => {
    const noQualified = qualifiedCourses.length === 0;

    return (
      <div className="rec-empty">
        <div className="rec-empty__icon">
          {noQualified ? (
            <Library color="#1e3a8a" size={54} />
          ) : (
            <User color="#1e3a8a" size={54} />
          )}
        </div>
        <p className="rec-empty__text">
          {noQualified
            ? "You need to complete your qualified courses first so we can generate recommendations for you."
            : "Enter your personalized profile data to get courses suitable for you."}
        </p>
        <button
          className="rec-empty__btn"
          onClick={() => {
            navigate(
              noQualified ? "/qualified-courses" : "/student/manage-my-profile",
            );
          }}
        >
          {noQualified ? "Go to Qualified Courses →" : "Go to Profile →"}
        </button>
      </div>
    );
  };

  /** Sort controls bar */
  const renderControls = () => (
    <div className="rec-controls">
      <span className="rec-controls__label">Sort by Fit Score</span>
      <select
        className="rec-controls__select"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="desc">Highest First</option>
        <option value="asc">Lowest First</option>
      </select>
    </div>
  );

  /** Single recommendation card */
  const renderCard = (course) => (
    <li className="rec-card" key={course.qualification_code}>
      {/* fit score badge – sits to the left */}
      <div className="rec-card__score-badge">
        <span className="rec-card__score-badge__value">{course.fit_score}</span>
        <span className="rec-card__score-badge__label">fit</span>
      </div>

      {/* name + code */}
      <div className="rec-card__header">
        <h3 className="rec-card__title">{course.qualification_name}</h3>
        <span className="rec-card__code">{course.qualification_code}</span>
      </div>

      {/* AI reasoning */}
      <p className="rec-card__reason">
        <strong>Why this course?</strong> {course.reason}
      </p>
    </li>
  );

  /** Full sorted list */
  const renderRecommendations = () => (
    <>
      {renderControls()}
      <ul className="rec-list">
        {sortedCourses.map((course) => renderCard(course))}
      </ul>
    </>
  );

  /* ------------------------------------------------ */
  // Main render logic
  /* ------------------------------------------------ */
  if (loading) return renderLoading();
  if (recommendedCourses.length === 0) return renderEmptyState();

  return <div>{renderRecommendations()}</div>;
}

export default Recommendations;
