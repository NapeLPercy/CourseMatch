import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { guestFilterQualifications } from "../services/guestService";
import PageHeader from "../components/ui/PageHeader";
import FilteredCourses from "../components/ui/FilteredCourses";
import ErrorState from "../components/ui/ErrorState";
import UniversityCoursesSkeleton from "../components/ui/UniversityCoursesSkeleton";
import SEO from "../components/ui/SEO";
import { coursesWithoutMathsFaqs } from "../Utils/textData/SeoFaqs";
export default function NoMathsCourses() {
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
      const { data } = await guestFilterQualifications("courses-without-maths");
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
        title="Courses You Can Study Without Maths | CourseMatch"
        description="Discover university courses that do not require Mathematics. Explore qualifications available to students with Mathematical Literacy or no Mathematics."
        url="https://www.coursematchapp.co.za/courses-without-maths"
        faq={coursesWithoutMathsFaqs}
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
