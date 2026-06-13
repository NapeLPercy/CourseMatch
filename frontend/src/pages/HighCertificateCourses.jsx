import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { guestFilterQualifications } from "../services/guestService";
import PageHeader from "../components/ui/PageHeader";
import FilteredCourses from "../components/ui/FilteredCourses";
import ErrorState from "../components/ui/ErrorState";
import UniversityCoursesSkeleton from "../components/ui/UniversityCoursesSkeleton";
import SEO from "../components/ui/SEO";
import { higherCertificateFaqs } from "../Utils/textData/SeoFaqs";
import Warning from "../components/ui/Warning";
export default function HigherCertificateCourses() {
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
        "higher-certificate-courses",
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
        title="Higher Certificate Courses in South Africa | CourseMatch"
        description="Browse higher certificate courses and discover study opportunities, entry requirements, and pathways to further qualifications."
        url="https://www.coursematchapp.co.za/higher-certificate-courses"
        faq={higherCertificateFaqs}
      />
      <Warning
        show={showWarning}
        message="To see the courses you <b>qualify for</b>, <b>log in</b> and complete your profile."
        onClose={handleCloseWarning}
      />
      <div className="fcp">
        <PageHeader
          icon={GraduationCap}
          title="Higher certificate courses"
          subtitle="Discover higher certificate programmes available at South African universities."
          pillOne={!loading && !error ? `${courses.length} courses` : null}
        />
        {loading && <UniversityCoursesSkeleton />}
        {error && (
          <ErrorState
            message="Failed to load higher certificate courses. Please try again."
            onRetry={fetchCourses}
          />
        )}
        {!loading && !error && <FilteredCourses courses={courses} />}
      </div>
    </>
  );
}
