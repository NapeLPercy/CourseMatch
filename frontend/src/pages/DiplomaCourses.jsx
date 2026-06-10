import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { guestFilterQualifications } from "../services/guestService";
import PageHeader from "../components/ui/PageHeader";
import FilteredCourses from "../components/ui/FilteredCourses";
import ErrorState from "../components/ui/ErrorState";
import UniversityCoursesSkeleton from "../components/ui/UniversityCoursesSkeleton";

export default function DiplomaCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => { fetchCourses(); }, []);

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
    <div className="fcp">
      <PageHeader
        icon={GraduationCap}
        title="Diploma courses"
        subtitle="Browse all diploma qualifications available across South African universities."
        pillOne={!loading && !error ? `${courses.length} courses` : null}
      />
      {loading && <UniversityCoursesSkeleton/>}
      {error && (
        <ErrorState
          message="Failed to load diploma courses. Please try again."
          onRetry={fetchCourses}
        />
      )}
      {!loading && !error && <FilteredCourses courses={courses} />}
    </div>
  );
}
