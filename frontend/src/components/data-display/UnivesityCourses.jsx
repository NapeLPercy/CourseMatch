import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CourseFilter from "../../Utils/courseFilters/CourseFilter";
import { CourseContext } from "../../context/CourseContext";
import { useSubjects } from "../../context/SubjectContext";
import Recommendations from "./Recommendations";
import renderCourseList from "../ui/CourseList";
import "../../styles/UniversityCourses.css";
import { getUniversityCourses } from "../../services/universityService";
import ErrorState from "../ui/ErrorState";
import Skeleton from "../ui/Skeleton";

export default function UniversityCourses() {
  let { courseSlug } = useParams();
  const universitySlug = courseSlug?.toUpperCase();

  const { qualifications, updateQualifications } = useContext(CourseContext);
  const { getSubjects } = useSubjects();

  const [courses, setCourses] = useState(qualifications);
  const [qualifiedCourses, setQualifiedCourses] = useState([]);
  const [aps, setAps] = useState(null);
  const [unlockedCount, setUnlockedCount] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState(getInitialTab);

  const [computingQualified, setComputingQualified] = useState(false);
  const [computingRecommendations, setComputingRecommendations] = useState(
    () => activeTab === "recommendations",
  );

  function getInitialTab() {
    try {
      return JSON.parse(sessionStorage.getItem("ai-tab"))
        ? "recommendations"
        : "full";
    } catch {
      return "full";
    }
  }

  const getSessionData = () => ({
    endorsement: JSON.parse(sessionStorage.getItem("endorsement")),
    aps: sessionStorage.getItem("aps"),
    visitedUni: JSON.parse(sessionStorage.getItem("visited-uni")),
  });

  useEffect(() => {
    fetchCourses();
  }, [universitySlug]);

  //feych qualifications
  const fetchCourses = async () => {
    setError(null);
    setLoading(true);

    try {
      const { data } = await getUniversityCourses(universitySlug);

      if (!data.success) {
        setError(data.message || "Failed to fetch courses");
        return;
      }

      setCourses(data.courses);
      updateQualifications(data.courses);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  //compute qualified courses
  const computeQualifiedCourses = () => {
    setComputingQualified(true);

    const { endorsement } = getSessionData();
    const courseFilter = new CourseFilter(
      getSubjects(),
      qualifications,
      endorsement,
      universitySlug,
    );

    const results = courseFilter.getQualifiedCourses();

    const { aps } = getSessionData();
    setTimeout(() => {
      setQualifiedCourses(results);
      setAps(aps);
      setUnlockedCount(results.length);
      setComputingQualified(false);

      sessionStorage.setItem("qualified-courses", JSON.stringify(results));
    }, 1000);
  };

  // Auto trigger when switching tab
  useEffect(() => {
    if (
      activeTab === "qualified" &&
      qualifiedCourses.length === 0 &&
      courses.length > 0
    ) {
      computeQualifiedCourses();
    }
  }, [activeTab, courses]);

  //ui helpers
  const renderContent = () => {
    if (activeTab === "full") {
      return renderCourseList(
        courses,
        "No courses available for this university yet.",
      );
    }

    if (activeTab === "qualified") {
      if (computingQualified) return <Skeleton />;

      let outputText;

      if (getSubjects().length === 0) {
        outputText =
          "You haven’t added your subjects yet, so we can’t match you to any courses. Add your subjects to see your eligible options.";
      } else {
        outputText =
          "Based on your current results, you don’t meet the minimum requirements for any courses at this institution. Try exploring other institutions or updating your results.";
      }

      return renderCourseList(qualifiedCourses, outputText);
    }

    if (activeTab === "recommendations") {
      return computingRecommendations ? (
        <Skeleton />
      ) : (
        <div className="uni-recommendations-wrapper">
          <Recommendations
            setAps={setAps}
            setUnlockedCount={setUnlockedCount}
            uniSlug={universitySlug}
          />
        </div>
      );
    }
  };

  const tabs = [
    { id: "full", label: "Full Courses" },
    { id: "qualified", label: "Qualified Courses" },
    { id: "recommendations", label: "AI Recommendations" },
  ];

  const { visitedUni } = getSessionData();

  return (
    <div className="uni-courses-wrapper">
      {/* HEADER */}
      <header className="uni-courses-header">
        <h1>{visitedUni?.name} Courses</h1>

        {aps && getSubjects().length > 0 && (
          <p className="uni-courses-aps">
            Your APS for {universitySlug}: <strong>{aps}</strong>
          </p>
        )}

        {unlockedCount > 0 && getSubjects().length > 0 && (
          <p className="uni-courses-unlocked">
            You qualify for <strong>{unlockedCount}</strong> qualification
            {unlockedCount !== 1 ? "s" : ""}
          </p>
        )}
      </header>

      {/* TABS */}
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

      {/* CONTENT */}
      <div className="uni-content-area" role="tabpanel">
        {loading && <Skeleton />}
        {error && <ErrorState message={error} onRetry={fetchCourses} />}
        {!loading && !error && renderContent()}
      </div>
    </div>
  );
}
