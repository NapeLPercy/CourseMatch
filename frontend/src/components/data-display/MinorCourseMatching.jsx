import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubjects } from "../../context/SubjectContext";
import { universitiesData } from "../../Utils/universities";
import { getUniversityCourses } from "../../services/universityService";
import CourseFilter from "../../Utils/courseFilters/CourseFilter";
import CoursePreview from "./CoursePreview";
import ErrorState from "../ui/ErrorState";
import "../../styles/MinorCourseMatching.css";
import { GraduationCap } from "lucide-react";

function UniversityCardSkeleton() {
  return (
    <div className="mcm__card mcm__card--skel">
      <div className="mcm__skel mcm__skel--name" />
      <div className="mcm__skel mcm__skel--faculties" />
      <div className="mcm__skel mcm__skel--btn" />
    </div>
  );
}

export default function MinorCourseMatching() {
  const { getSubjects } = useSubjects();
  const navigate = useNavigate();

  const [previewCourses, setPreviewCourses] = useState(null);
  const [selectedUni, setSelectedUni] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(false);
  const [skelLoading] = useState(false);

  const subjects = getSubjects();

  const fetchSelectedUniversityCourses = async (uni) => {
    setLoadingId(uni.id);
    setError(false);
    try {
      const { data } = await getUniversityCourses(uni.id);
      const endorsement =
        JSON.parse(sessionStorage.getItem("endorsement")) ?? null;

      if (subjects?.length === 0 || !endorsement) {
        setPreviewCourses([]);
        setSelectedUni(uni);
        return;
      }

      const courseFilter = new CourseFilter(
        subjects,
        data.courses,
        endorsement,
        uni.id.toUpperCase(),
      );

      const results = courseFilter.getQualifiedCourses();
      setPreviewCourses(results);
      setSelectedUni(uni);
    } catch (err) {
      console.log("error occurred", err);
      setError(true);
    } finally {
      setLoadingId(null);
    }
  };

  if (error)
    return (
      <ErrorState
        message="Failed to load courses. Please try again."
        onRetry={() => {
          setError(false);
          setPreviewCourses(null);
          setSelectedUni(null);
        }}
      />
    );

  if (previewCourses)
    return (
      <CoursePreview
        courseList={previewCourses}
        universityId={selectedUni?.id}
        universityName={selectedUni?.name}
      />
    );

  return (
    <div className="mcm">
      <div className="mcm__hero">
        <div className="mcm__hero-icon">
          <GraduationCap size={26} strokeWidth={1.8} />
        </div>
        <div className="mcm__hero-text">
          <h2 className="mcm__title">See your matches instantly</h2>
          <p className="mcm__subtitle">
            Pick a university to see which courses you qualify for based on your
            subjects and marks.
          </p>
        </div>
      </div>

      <div className="mcm__grid">
        {skelLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <UniversityCardSkeleton key={i} />
            ))
          : universitiesData.map((uni, i) => (
              <div key={uni.id} className="mcm__card" style={{ "--i": i }}>
                <div className="mcm__card-body">
                  <p className="mcm__uni-name">{uni.name}</p>
                  <span className="mcm__uni-faculties">
                    {uni.faculties.length}{" "}
                    {uni.faculties.length === 1 ? "faculty" : "faculties"}
                  </span>
                </div>
                <button
                  className="mcm__btn"
                  disabled={loadingId === uni.id}
                  onClick={() => fetchSelectedUniversityCourses(uni)}
                >
                  {loadingId === uni.id ? (
                    <span className="mcm__spinner" />
                  ) : null}
                  {loadingId === uni.id ? "Loading…" : "View my matches"}
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}
