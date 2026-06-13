import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { guestFilterQualifications } from "../services/guestService";
import PageHeader from "../components/ui/PageHeader";
import FilteredCourses from "../components/ui/FilteredCourses";
import UniversityCoursesSkeleton from "../components/ui/UniversityCoursesSkeleton";
import ErrorState from "../components/ui/ErrorState";
import SEO from "../components/ui/SEO";
import { bachelorDegreeFaqs } from "../Utils/textData/SeoFaqs";
import Warning from "../components/ui/Warning";

export default function BachelorCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showWarning, setShowWarning] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("courses-alert");
    localStorage.removeItem("courses-alert");
    if (data) return;
    setShowWarning(true);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await guestFilterQualifications(
        "bachelor-degree-courses",
      );
      setCourses(data || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseWarning = () => {
    localStorage.setItem("courses-alert", "dismissed");
    setShowWarning(false);
  };

  
  return (
    <>
      <SEO
        title="Bachelor Degree Courses in South Africa | CourseMatch"
        description="Browse bachelor degree courses offered by South African universities. Explore admission requirements, APS scores, and study options."
        url="https://www.coursematchapp.co.za/bachelor-degree-courses"
        faq={bachelorDegreeFaqs}
      />
      <Warning
        show={showWarning}
        message="To see the courses you <b>qualify for</b>, <b>log in</b> and complete your profile."  onClose={handleCloseWarning}
      />

      <div className="fcp">
        <PageHeader
          icon={GraduationCap}
          title="Bachelor's degrees"
          subtitle="Explore all bachelor degree qualifications offered across South African universities."
          pillOne={!loading && !error ? `${courses.length} courses` : null}
        />
        {loading && <UniversityCoursesSkeleton />}
        {error && (
          <ErrorState
            message="Failed to load bachelor courses. Please try again."
            onRetry={fetchCourses}
          />
        )}
        {!loading && !error && <FilteredCourses courses={courses} />}
      </div>
    </>
  );
}
