import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { guestFilterQualifications } from "../services/guestService";
import PageHeader from "../components/ui/PageHeader";
import FilteredCourses from "../components/ui/FilteredCourses";
import ErrorState from "../components/ui/ErrorState";
import UniversityCoursesSkeleton from "../components/ui/UniversityCoursesSkeleton";
import SEO from "../components/ui/SEO";
import { diplomaFaqs } from "../Utils/textData/SeoFaqs";

export default function DiplomaCourses() {
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
      const { data } = await guestFilterQualifications("diploma-courses");

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
        title="Diploma Courses in South Africa | CourseMatch"
        description="Explore diploma courses offered by South African universities and colleges. Find admission requirements, APS scores, and career pathways."
        url="https://www.coursematchapp.co.za/diploma-courses"
        faq={diplomaFaqs}
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
