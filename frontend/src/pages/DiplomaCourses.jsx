import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { useGuestFilterQualifications } from "../hooks/useGuest";
import PageHeader from "../components/ui/PageHeader";
import FilteredCourses from "../components/ui/FilteredCourses";
import ErrorState from "../components/ui/ErrorState";
import UniversityCoursesSkeleton from "../components/ui/UniversityCoursesSkeleton";
import SEO from "../components/ui/SEO";
import { diplomaFaqs } from "../Utils/textData/SeoFaqs";
import Warning from "../components/ui/Warning";

export default function DiplomaCourses() {

  const [showWarning, setShowWarning] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("courses-alert")) return;
    setShowWarning(true);
  }, []);

  const {
    data,
    isPending: loading,
    error,
    refetch:fetchCourses
  } = useGuestFilterQualifications("diploma-courses");

  const courses = data?.data || [];

  const handleCloseWarning = () => {
    localStorage.setItem("courses-alert", "dismissed");
    setShowWarning(false);
  };

  return (
    <>
      <SEO
        title="Diploma Courses in South Africa | CourseMatch"
        description="Explore diploma courses offered by South African universities and colleges. Find admission requirements, APS scores, and career pathways."
        url="https://www.coursematchapp.co.za/diploma-courses"
        faq={diplomaFaqs}
      />
      <Warning
        show={showWarning}
        message="To see the courses you <b>qualify for</b>, <b>log in</b> and complete your profile."
        onClose={handleCloseWarning}
      />
      <div className="fcp">
        <PageHeader
          icon={GraduationCap}
          title="Diploma courses"
          subtitle="Browse all diploma qualifications available across South African universities."
          pillOne={!loading && !error ? `${courses.length} courses` : null}
        />
        {loading && <UniversityCoursesSkeleton />}
        {error && (
          <ErrorState
            message="Failed to load diploma courses. Please try again."
            onRetry={fetchCourses}
          />
        )}
        {!loading && !error && <FilteredCourses courses={courses} />}
      </div>
    </>
  );
}
