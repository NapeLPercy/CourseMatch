import React, { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Library, User } from "lucide-react";
import "../../styles/Recommendations.css";
//context
import { useSubjects } from "../../context/SubjectContext";
import { CourseContext } from "../../context/CourseContext";

import axios from "axios";
import { generateRecommendationsPdf } from "../../Utils/recommendationsPDF";
import renderRecommendationCard from "../ui/RecommendationCard";
import ErrorState from "../ui/ErrorState";
import CourseFilter from "../../Utils/courseFilters/CourseFilter";

function Recommendations({ uniSlug, setAps, setUnlockedCount }) {
  // State
  const [loading, setLoading] = useState(true);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null);
  //context
  const { qualifications } = useContext(CourseContext);
  const { getSubjects } = useSubjects();

  const navigate = useNavigate();
  const subjects = getSubjects();

  //used to change the parent values
  const handleUpdate = (aps, unlockedCount) => {
    setAps(aps);
    setUnlockedCount(unlockedCount);
  };

  //filter courses
  const qualifiedCourses = useMemo(() => {
    const studentEndorsement = JSON.parse(
      sessionStorage.getItem("student"),
    )?.endorsement;

    const courseFilter = new CourseFilter(
      subjects,
      qualifications,
      studentEndorsement,
      uniSlug,
    );

    const qualifiedCourses = courseFilter.getQualifiedCourses();
    handleUpdate(sessionStorage.getItem("aps"), qualifiedCourses.length);

    return qualifiedCourses;
  }, [qualifications, subjects]);

  useEffect(() => {
    sessionStorage.setItem(
      "qualified-courses",
      JSON.stringify(qualifiedCourses),
    );
  }, [qualifiedCourses]);

  useEffect(() => {
    const recommendations = JSON.parse(
      localStorage.getItem("ai-recommendations"),
    );
    if (recommendations) {
      setRecommendedCourses(recommendations);
      setLoading(false);
      return;
    }

    if (!subjects?.length || !qualifiedCourses?.length) {
      setLoading(false);
      return;
    }

    fetchAiFitForUniversity(subjects, qualifiedCourses);
  }, [subjects, qualifiedCourses]);

  //get ai recommendations
  const fetchAiFitForUniversity = async (subjects, qualifiedCourses) => {
    setLoading(true);
    setError(null);//
    try {
      const API_BASE = process.env.REACT_APP_API_BASE;
      const token = JSON.parse(sessionStorage.getItem("token"));

      const res = await axios.post(
        `${API_BASE}/api/recommendation/ai-recommendations`,
        { subjects, qualifiedCourses },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setRecommendedCourses(res.data.results || []);
      localStorage.setItem(
        "ai-recommendations",
        JSON.stringify(res.data.results),
      );
    } catch (err) {
      console.error("AI fit fetch failed:", err.response?.data || err.message);
      setError(
        "Failed to get AI recommedations",
        err.response?.data || err.message,
      );
      //setRecommendedCourses([]);
    } finally {
      setLoading(false);
    }
  };

  /*Handle PDF download */
  const handleDownloadPdf = () => {
    generateRecommendationsPdf(recommendedCourses, {
      subtitle: "Filtered qualified courses + AI fit scoring",
      filename: "AI-course-recommendations.pdf",
    });
  };

  // Derived: sorted list
  const sortedCourses = useMemo(
    () =>
      [...recommendedCourses].sort((a, b) =>
        sortOrder === "asc"
          ? a.fit_score - b.fit_score
          : b.fit_score - a.fit_score,
      ),
    [recommendedCourses, sortOrder],
  );

  /** Animated loading indicator - mirrors parent pattern */
  const renderLoading = () => (
    <p className="rec-loading">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      Displaying AI recommended courses ...
    </p>
  );

  
    /** Empty state with contextual CTA */
  const renderEmptyState = () => {
    
    if (error) {
      return (
        <div className="rec-empty">
          <ErrorState
            message={error}
            onRetry={() => fetchAiFitForUniversity(subjects, qualifiedCourses)}
          />
        </div>
      );
    }

    const noQualified = qualifiedCourses.length === 0 || error === null;

    return (
      <div className="rec-empty">
        <div className="rec-empty__icon">
          <Library color="#1e3a8a" size={54} />
        </div>
        <p className="rec-empty__text">
          {noQualified
            ? "You need to complete your qualified courses first so we can generate recommendations for you."
            : ""}
        </p>
        <button
          className="rec-empty__btn"
          onClick={() => {
            navigate("/qualified-courses");
          }}
        >
          {noQualified ? "Go to Qualified Courses ->" : ""}
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
      <button className="download-pdf-btn" onClick={handleDownloadPdf}>
        Download PDF
      </button>
    </div>
  );

  /** Full sorted list */
  const renderRecommendations = () => (
    <>
      {renderControls()}
      <ul className="rec-list">
        {sortedCourses.map((course) => renderRecommendationCard(course))}
      </ul>
    </>
  );

  // Main render logic
  if (loading) return renderLoading();
  if (recommendedCourses.length === 0) return renderEmptyState();

  return <div>{renderRecommendations()}</div>;
}

export default Recommendations;
