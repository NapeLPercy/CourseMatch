import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { guestFilterQualifications } from "../services/guestService";
import PageHeader from "../components/ui/PageHeader";
import FilteredCourses from "../components/ui/FilteredCourses";
import ErrorState from "../components/ui/ErrorState";
import UniversityCoursesSkeleton from "../components/ui/UniversityCoursesSkeleton";
import SEO from "../components/ui/SEO";
import { extendedProgrammeFaqs } from "../Utils/textData/SeoFaqs";

export default function ExtendedProgrammes() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <>
      <SEO
        title="Extended Programmes in South Africa | CourseMatch"
        description="Explore extended curriculum programmes designed to help students gain access to university qualifications and academic support."
        url="https://www.coursematchapp.co.za/extended-programmes"
        faq={extendedProgrammeFaqs}
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
