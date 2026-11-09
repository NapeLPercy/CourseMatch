import React, { useEffect, useState, useContext, useMemo } from "react";
import "../../styles/Recommendations.css";
import { useSubjects } from "../../context/SubjectContext";
import { CourseContext } from "../../context/CourseContext";
import { generateRecommendationsPdf } from "../../Utils/recommendationsPDF";
import RenderRecommendationCard from "../ui/RecommendationCard";
import ErrorState from "../ui/ErrorState";
import CourseFilter from "../../Utils/courseFilters/CourseFilter";
import UniversityCoursesSkeleton from "../ui/UniversityCoursesSkeleton";
import EmptyState from "../ui/EmptyState";
import { useGetOrCreateAIRecommendations } from "../../hooks/useAI";
import { getCachedDashboard } from "../../Utils/studentDashboardCache";

function Recommendations({ uniSlug, setAps, setUnlockedCount }) {
  const [sortOrder, setSortOrder] = useState("desc");

  const { qualifications } = useContext(CourseContext);
  const { getSubjects } = useSubjects();
  const subjects = getSubjects();

  // Calculate qualified courses
  const qualifiedCourses = useMemo(() => {
    if (qualifications.length === 0 || subjects.length === 0) return [];

    const endorsement = JSON.parse(sessionStorage.getItem("endorsement"));

    const courseFilter = new CourseFilter(
      subjects,
      qualifications,
      endorsement,
      uniSlug,
    );

    return courseFilter.getQualifiedCourses();
  }, [qualifications, subjects, uniSlug]);

  // Update parent with APS and qualification count
  useEffect(() => {
    const rawAps = sessionStorage.getItem("aps");
    const parsedAps = rawAps && rawAps !== "null" ? Number(rawAps) : null;

    setAps(parsedAps);
    setUnlockedCount(qualifiedCourses.length);
  }, [qualifiedCourses, setAps, setUnlockedCount]);

  // Persist qualified courses
  useEffect(() => {
    sessionStorage.setItem(
      "qualified-courses",
      JSON.stringify(qualifiedCourses),
    );
  }, [qualifiedCourses]);

  // React Query: fetch AI recommendations
  const {
    data,
    isLoading: loading,
    isFetching,
    isError,
    error,
    refetch: refetchRecommendations,
  } = useGetOrCreateAIRecommendations(subjects, qualifiedCourses, uniSlug);

  // Extract recommendations
  const recommendedCourses = data?.results ?? [];

  // Detect missing profile
  const noProfile =
    error?.response?.status === 400 &&
    error?.response?.data?.message ===
      "Please complete your student profile first.";

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to get AI recommendations";

  // Invalidate dashboard cache when recommendations are generated
  useEffect(() => {
    if (data?.success) {
      const dashboardData = getCachedDashboard();

      if (dashboardData && !dashboardData.data.flags.hasRecommendation) {
        sessionStorage.removeItem("student_dashboard");
      }
    }
  }, [data]);

  const sortedCourses = useMemo(() => {
    return [...recommendedCourses].sort((a, b) =>
      sortOrder === "asc" ? a.fitScore - b.fitScore : b.fitScore - a.fitScore,
    );
  }, [recommendedCourses, sortOrder]);

  const handleDownloadPdf = () => {
    generateRecommendationsPdf(recommendedCourses, {
      subtitle: "Filtered qualified courses + AI fit scoring",
      filename: "AI-course-recommendations.pdf",
    });
  };

  const renderControls = () => (
    <div className="rec-controls">
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

  // const renderRecommendations = () => (
  //   <>
  //     {renderControls()}
  //     <ul className="rec-list">
  //       {sortedCourses.map((course) => RenderRecommendationCard(course))}
  //     </ul>
  //   </>
  // );

  const renderRecommendations = () => (
    <>
      {renderControls()}
      <ul className="rec-list">
        {sortedCourses.map((course) => (
          <RenderRecommendationCard
            key={course.qualificationCode}
            course={course}
          />
        ))}
      </ul>
    </>
  );

  const renderEmpty = () => {
    if (isError && !noProfile) {
      return (
        <ErrorState message={errorMessage} onRetry={refetchRecommendations} />
      );
    }

    if (subjects.length === 0) {
      return (
        <EmptyState message="You haven’t added your subjects yet, so we can’t generate AI recommendations. Add your subjects to get personalized course suggestions." />
      );
    }

    if (noProfile) {
      return (
        <EmptyState message="You haven’t added your personality profile yet, so we can’t generate personalized AI recommendations. Add profile to get personalized course suggestions." />
      );
    }

    if (!qualifiedCourses.length) {
      return (
        <EmptyState message="You need to qualify for at least one course before we can generate AI recommendations. Try updating your results or exploring other institutions." />
      );
    }

    return (
      <EmptyState message="We couldn’t generate recommendations right now. Please try again." />
    );
  };

  if (loading) return <UniversityCoursesSkeleton />;

  if (!recommendedCourses.length) {
    return renderEmpty();
  }

  return <div>{renderRecommendations()}</div>;
}

export default Recommendations;
