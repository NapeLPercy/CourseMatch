import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CourseFilter from "../../Utils/courseFilters/CourseFilter";
import { CourseContext } from "../../context/CourseContext";
import { useSubjects } from "../../context/SubjectContext";
import Recommendations from "./Recommendations";
import renderCourseList from "../ui/CourseList";
import "../../styles/UniversityCourses.css";
import { useGetUniversityCourses } from "../../hooks/useUniversityCourses";
import ErrorState from "../ui/ErrorState";
import PageHeader from "../ui/PageHeader";
import UniversityCoursesSkeleton from "../ui/UniversityCoursesSkeleton";
import { BookOpen, GraduationCap, Sparkles, Award } from "lucide-react";

export default function UniversityCourses() {
  let { courseSlug } = useParams();
  const universitySlug = courseSlug?.toUpperCase();
  const { qualifications, updateQualifications } = useContext(CourseContext);
  const { getSubjects } = useSubjects();

  const [qualifiedCourses, setQualifiedCourses] = useState([]);
  const [aps, setAps] = useState(null);
  const [unlockedCount, setUnlockedCount] = useState(null);


  const [activeTab, setActiveTab] = useState(getInitialTab);

  const [computingQualified, setComputingQualified] = useState(false);
  const [computingRecommendations, setComputingRecommendations] = useState(
    () => activeTab === "recommendations",
  );

  function getInitialTab() {
    try {
      if (!sessionStorage.getItem("last_tab"))
        sessionStorage.setItem("last_tab", "full");
      return sessionStorage.getItem("last_tab");
    } catch {
      return "full";
    }
  }

  const getSessionData = () => ({
    endorsement: JSON.parse(sessionStorage.getItem("endorsement")),
    aps: sessionStorage.getItem("aps"),
    visitedUni: JSON.parse(sessionStorage.getItem("visited-uni")),
  });

  const {
    data,
    isPending: loading,
    isError,
    error,
    refetch: refetchCourses,
  } = useGetUniversityCourses(universitySlug);

  // Extract courses
  const courses = data?.courses ?? [];
  // Update Context
  useEffect(() => {
    if (data?.success) {
      updateQualifications(data.courses);
    }
  }, [data, updateQualifications]);

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

  useEffect(() => {
    if (
      activeTab === "qualified" &&
      qualifiedCourses.length === 0 &&
      courses.length > 0
    ) {
      computeQualifiedCourses();
    }
  }, [activeTab, courses]);

  const renderContent = () => {
    if (activeTab === "full") {
      return renderCourseList(
        courses,
        "No courses available for this university yet.",
      );
    }
    if (activeTab === "qualified") {
      if (computingQualified) return <UniversityCoursesSkeleton />;
      const outputText =
        getSubjects().length === 0
          ? "You haven't added your subjects yet, so we can't match you to any courses. Add your subjects to see your eligible options."
          : "Based on your current results, you don't meet the minimum requirements for any courses at this institution.";
      return renderCourseList(qualifiedCourses, outputText);
    }
    if (activeTab === "recommendations") {
      return computingRecommendations ? (
        <UniversityCoursesSkeleton />
      ) : (
        <div className="uc__recommendations-wrap">
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
    { id: "full", label: "All courses", icon: BookOpen },
    { id: "qualified", label: "I qualify", icon: GraduationCap },
    { id: "recommendations", label: "AI picks", icon: Sparkles },
  ];

  const { visitedUni } = getSessionData();

  return (
    <div className="uc">
      {/* HEADER */}
      <PageHeader
        icon={Award}
        title={`${visitedUni?.name} Qualifications`}
        subtitle={`Qualifications offered by ${universitySlug} that you qualify for.`}
        pillOne={aps && getSubjects().length > 0 ? `Your APS: ${aps}` : null}
        pillTwo={
          unlockedCount > 0 && getSubjects().length > 0
            ? `You qualify for ${unlockedCount} qualification${
                unlockedCount !== 1 ? "s" : ""
              }`
            : null
        }
      />

      {/* TABS */}
      <nav className="uc__tabs" role="tablist">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            className={`uc__tab ${activeTab === id ? "uc__tab--active" : ""}`}
            onClick={() => {
              setActiveTab(id);
              sessionStorage.setItem("last_tab", id);
            }}
          >
            <Icon size={15} strokeWidth={2} />
            {label}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <div className="uc__content" role="tabpanel">
        {loading && <UniversityCoursesSkeleton />}
        {isError && (
          <ErrorState message={error.message} onRetry={refetchCourses} />
        )}
        {!loading && !isError && renderContent()}
      </div>
    </div>
  );
}
