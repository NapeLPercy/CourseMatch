import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { useGuestFilterQualifications } from "../hooks/useGuest";
import PageHeader from "../components/ui/PageHeader";
import FilteredCourses from "../components/ui/FilteredCourses";
import ErrorState from "../components/ui/ErrorState";
import UniversityCoursesSkeleton from "../components/ui/UniversityCoursesSkeleton";
import SEO from "../components/ui/SEO";
import { coursesWithoutMathsFaqs } from "../Utils/textData/SeoFaqs";
import Warning from "../components/ui/Warning";

export default function NoMathsCourses() {
  const [showWarning, setShowWarning] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("courses-alert")) return;
    setShowWarning(true);
  }, []);

  const {
    data,
    isPending: loading,
    error,
    refetch: fetchCourses,
  } = useGuestFilterQualifications("courses-without-maths");

  const courses = data?.data || [];

  const handleCloseWarning = () => {
    localStorage.setItem("courses-alert", "dismissed");
    setShowWarning(false);
  };

  return (
    <>
      <SEO
        title="Courses You Can Study Without Maths | CourseMatch"
        description="Discover university courses that do not require Mathematics. Explore qualifications available to students with Mathematical Literacy or no Mathematics."
        url="https://www.coursematchapp.co.za/courses-without-maths"
        faq={coursesWithoutMathsFaqs}
      />
      <Warning
        show={showWarning}
        message="To see the courses you <b>qualify for</b>, <b>log in</b> and complete your profile."
        onClose={handleCloseWarning}
      />

      <div className="fcp">
        <PageHeader
          icon={GraduationCap}
          title="Courses without maths"
          subtitle="Find qualifications that don't require Mathematics as a subject — open to more students."
          pillOne={!loading && !error ? `${courses.length} courses` : null}
        />
        {loading && <UniversityCoursesSkeleton />}
        {error && (
          <ErrorState
            message="Failed to load courses. Please try again."
            onRetry={fetchCourses}
          />
        )}
        {!loading && !error && <FilteredCourses courses={courses} />}
      </div>
    </>
  );
}
