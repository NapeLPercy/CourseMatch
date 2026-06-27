import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { guestFilterQualifications } from "../services/guestService";
import PageHeader from "../components/ui/PageHeader";
import FilteredCourses from "../components/ui/FilteredCourses";
import ErrorState from "../components/ui/ErrorState";
import UniversityCoursesSkeleton from "../components/ui/UniversityCoursesSkeleton";
import SEO from "../components/ui/SEO";
import { extendedProgrammeFaqs } from "../Utils/textData/SeoFaqs";
import Warning from "../components/ui/Warning";

export default function ExtendedProgrammes() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showWarning, setShowWarning] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("courses-alert")) return;
    setShowWarning(true);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await guestFilterQualifications("extended-programmes");
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
        title="Extended Programmes in South Africa | CourseMatch"
        description="Explore extended curriculum programmes designed to help students gain access to university qualifications and academic support."
        url="https://www.coursematchapp.co.za/extended-programmes"
        faq={extendedProgrammeFaqs}
      />
      <Warning
        show={showWarning}
        message="To see the courses you <b>qualify for</b>, <b>log in</b> and complete your profile."
        onClose={handleCloseWarning}
      />
      <div className="fcp">
        <PageHeader
          icon={GraduationCap}
          title="Extended programmes"
          subtitle="Extended curriculum programmes designed to support students transitioning into higher education."
          pillOne={!loading && !error ? `${courses.length} courses` : null}
        />
        {loading && <UniversityCoursesSkeleton />}
        {error && (
          <ErrorState
            message="Failed to load extended programmes. Please try again."
            onRetry={fetchCourses}
          />
        )}
        {!loading && !error && <FilteredCourses courses={courses} />}
      </div>
    </>
  );
}
