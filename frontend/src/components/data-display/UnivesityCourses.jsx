import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CourseFilter from "../../Utils/courseFilters/CourseFilter";
import { Info } from "lucide-react";
import { CourseContext } from "../../context/CourseContext";
import { useSubjects } from "../../context/SubjectContext";
import Recommendations from "./Recommendations";
import renderCourseList from "../ui/CourseList";
import "../../styles/UniversityCourses.css";

export default function UniversityCourses() {
  // Route param
  let { courseSlug: universitySlug } = useParams();

  universitySlug = universitySlug.toUpperCase();

  const { qualifications, updateQualifications } = useContext(CourseContext);
  const { getSubjects } = useSubjects();

  const [courses, setCourses] = useState(qualifications);
  const [qualifiedCourses, setQualifiedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [aps, setAps] = useState(null);
  const [unlockedCount, setUnlockedCount] = useState(null);

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

  // Fetch courses on mount / slug change
  useEffect(() => {
    const fetchCourses = async () => {
      const API_BASE = process.env.REACT_APP_API_BASE;
      const token = JSON.parse(sessionStorage.getItem("token"));
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE}/api/university/${universitySlug}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
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
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchCourses();
  }, [universitySlug]);


 

  // Compute qualified courses
  const computeQualifiedCourses = () => {
    setComputingQualified(true);

    const studentEndorsement = JSON.parse(
      sessionStorage.getItem("student"),
    )?.endorsement;

    const courseFilter = new CourseFilter(
      getSubjects(),
      qualifications,
      studentEndorsement,
      universitySlug,
    );

    const qualifiedQualifications = courseFilter.getQualifiedCourses();

    setTimeout(() => {
      setQualifiedCourses(qualifiedQualifications);
      //set unlockedCount and aps
      setAps(sessionStorage.getItem("aps"));
      setUnlockedCount(qualifiedQualifications.length);
      setComputingQualified(false);
      sessionStorage.setItem(
        "qualified-courses",
        JSON.stringify(qualifiedQualifications),
      );
    }, 1000);
  };

  // Auto-compute when switching to "qualified" tab
  useEffect(() => {
    if (
      activeTab === "qualified" &&
      qualifiedCourses.length === 0 &&
      courses.length > 0
    ) {
      computeQualifiedCourses();
    }
  }, [activeTab, courses]);

  //Animated loading indicator
  const renderLoading = (message) => (
    <p className="uni-status">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      {message}
    </p>
  );

  // Tab definitions – keeps the tab bar DRY
  const tabs = [
    { id: "full", label: "Full Courses" },
    { id: "qualified", label: "Qualified Courses" },
    { id: "recommendations", label: "AI Recommendations" },
  ];

  return (
    <div className="uni-courses-wrapper">
      {/* Header */}
      <header className="uni-courses-header">
        <h1>
          {JSON.parse(sessionStorage.getItem("visited-uni"))?.name} Courses
        </h1>

        {aps && (
          <p className="uni-courses-aps">
            Your APS for {universitySlug}: <strong>{aps}</strong>
          </p>
        )}

        {unlockedCount && (
          <p className="uni-courses-unlocked">
            You unlocked <strong>{unlockedCount}</strong> qualification
            {unlockedCount !== 1 ? "s" : ""}
          </p>
        )}
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

      <div className="uni-content-area" role="tabpanel">
        {loading && renderLoading("Loading courses …")}
        {error && <p className="uni-status error">{error}</p>}
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
                  <Recommendations
                    //aps={aps}
                    setAps={setAps}
                   // unlockedCount={unlockedCount}
                    setUnlockedCount={setUnlockedCount}
                    uniSlug={universitySlug}
                  />{" "}
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
