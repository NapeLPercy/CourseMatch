import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import TutAPS from "../../Utils/TUT/TutAPS";
import CourseManager from "../../Utils/CourseManager";
import { Library } from "lucide-react";
// context
import { CourseContext } from "../../context/CourseContext";
import { useSubjects } from "../../context/SubjectContext";

// child components
import Recommendations from "./Recommendations";

// styles
import "../../styles/UniversityCourses.css";

export default function UniversityCourses() {
  /* ------------------------------------------------ */
  // Route param
  /* ------------------------------------------------ */
  let { courseSlug } = useParams();
  courseSlug = courseSlug.toUpperCase();
  sessionStorage.setItem("visited-uni", JSON.stringify(courseSlug));

  /* ------------------------------------------------ */
  // Context
  /* ------------------------------------------------ */
  const { qualifications, updateQualifications } = useContext(CourseContext);
  const { getSubjects } = useSubjects();

  /* ------------------------------------------------ */
  // State
  /* ------------------------------------------------ */
  const [courses, setCourses] = useState(qualifications);
  const [qualifiedCourses, setQualifiedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("ai-tab")) === true
        ? "recommendations"
        : "full";
    } catch {
      return "full";
    }
  });

  const [computingQualified, setComputingQualified] = useState(false);
  const [computingRecommendations, setComputingRecommendations] = useState(
    () => activeTab === "recommendations",
  );

  /* ------------------------------------------------ */
  // Fetch courses on mount / slug change
  /* ------------------------------------------------ */
  useEffect(() => {
    const fetchCourses = async () => {
      const API_BASE = process.env.REACT_APP_API_BASE;
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE}/api/university/${courseSlug}`,
        );

        if (response.data.success) {
          setCourses(response.data.courses);
          updateQualifications(response.data.courses);
        } else {
          setError(response.data.message || "Failed to fetch courses");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [courseSlug]);

  /* ------------------------------------------------ */
  // Compute qualified courses
  /* ------------------------------------------------ */
  const computeQualifiedCourses = () => {
    setComputingQualified(true);

    const apsCalc = new TutAPS(getSubjects());
    const studentAPS = apsCalc.computeAPS();

    const studentEndorsement = JSON.parse(
      sessionStorage.getItem("student"),
    )?.endorsement;

    const courseManager = new CourseManager();

    const qualifiedByAps = courseManager.filterCoursesByAps(
      courses,
      studentAPS,
    );

    console.log("BY APS",qualifiedByAps);

    const qualifiedByEndorsement = courseManager.filterCoursesByEndorsement(
      qualifiedByAps,
      studentEndorsement,
    );

    console.log("BY ENDORSEMENT",qualifiedByEndorsement);

    // prerequisite filter – uncomment when ready:
    const qualifiedCourseByPrerequisite =
      courseManager.filterCoursesByPrerequisites(
        getSubjects(),
        qualifiedByEndorsement,
      );

    const qualifiedCourse = qualifiedByEndorsement;

    console.log("BY PRE-REQUISITE",qualifiedCourseByPrerequisite);

    setTimeout(() => {
      setQualifiedCourses(qualifiedCourse);
      setComputingQualified(false);
      sessionStorage.setItem(
        "qualified-courses",
        JSON.stringify(qualifiedCourse),
      );
    }, 500);
  };

  /* ------------------------------------------------ */
  // Auto-compute when switching to "qualified" tab
  /* ------------------------------------------------ */
  useEffect(() => {
    if (
      activeTab === "qualified" &&
      qualifiedCourses.length === 0 &&
      courses.length > 0
    ) {
      computeQualifiedCourses();
    }
  }, [activeTab, courses]);

  /* ------------------------------------------------ */
  // Reusable renderers
  /* ------------------------------------------------ */

  /** Animated loading indicator */
  const renderLoading = (message) => (
    <p className="uni-status">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      {message}
    </p>
  );

  /** Single course card */
  const renderCourseCard = (course, index) => (
    <li className="uni-course-card" key={index}>
      <h3 className="uni-course-card__title">{course.qualification_name}</h3>

      <div className="uni-course-card__meta">
        <span className="uni-course-card__meta-item">
          <strong>Code:</strong> {course.qualification_code}
        </span>
        <span className="uni-course-card__meta-item">
          <strong>Duration:</strong> {course.minimum_duration} yrs
        </span>
        <span className="uni-course-card__meta-item">
          <strong>Min APS:</strong> {course.minimum_aps}
        </span>
      </div>

      {course.prereqs && course.prereqs.length > 0 && (
        <div className="uni-course-card__prereqs">
          <p className="uni-course-card__prereqs-label">Prerequisites</p>
          <ul className="uni-course-card__prereqs-list">
            {course.prereqs.map((prereq, idx) => (
              <li className="uni-course-card__prereq-tag" key={idx}>
                {prereq.subject_name}
                <span className="prereq-mark">{prereq.min_mark}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );

  /** Full course list or empty state */
  const renderCourseList = (courseList, emptyMessage) => {
    if (courseList.length === 0) {
      return (
        <div className="uni-empty-state">
          <div className="uni-empty-icon">
            <Library color="#1e3a8a" size={54} />
          </div>
          <p>{emptyMessage}</p>
        </div>
      );
    }

    return (
      <ul className="uni-course-list">
        {courseList.map((course, index) => renderCourseCard(course, index))}
      </ul>
    );
  };

  /* ------------------------------------------------ */
  // Tab definitions – keeps the tab bar DRY
  /* ------------------------------------------------ */
  const tabs = [
    { id: "full", label: "Full Courses" },
    { id: "qualified", label: "Qualified Courses" },
    { id: "recommendations", label: "AI Recommendations" },
  ];

  /* ------------------------------------------------ */
  // Render
  /* ------------------------------------------------ */
  return (
    <div className="uni-courses-wrapper">
      {/* Header */}
      <header className="uni-courses-header">
        <h1>University Courses</h1>
        <span className="uni-slug-badge">{courseSlug}</span>
      </header>

      {/* Tab Navigation */}
      <nav className="uni-tab-bar" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`uni-tab-btn${activeTab === tab.id ? " active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="uni-content-area" role="tabpanel">
        {/* ─── Loading ─── */}
        {loading && renderLoading("Loading courses …")}

        {/* ─── Error ─── */}
        {error && <p className="uni-status error">{error}</p>}

        {/* ─── Tabs ─── */}
        {!loading && !error && (
          <>
            {activeTab === "full" &&
              renderCourseList(
                courses,
                "No courses available for this university yet.",
              )}

            {activeTab === "qualified" &&
              (computingQualified
                ? renderLoading("Computing qualified courses …")
                : renderCourseList(
                    qualifiedCourses,
                    "No courses match your qualifications under this institution",
                  ))}

            {activeTab === "recommendations" &&
              (computingRecommendations ? (
                renderLoading("Preparing AI recommendations …")
              ) : (
                <div className="uni-recommendations-wrapper">
                  <Recommendations qualifiedCourses={qualifiedCourses} />
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
