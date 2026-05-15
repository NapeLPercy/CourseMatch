import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, UserCircle, ArrowRight, Sparkles } from "lucide-react";
import renderCourseList from "../ui/CourseList";
import EmptyState from "../ui/EmptyState";
import "../../styles/CoursePreview.css";

export default function CoursePreview({
  courseList,
  universityId,
  universityName,
}) {
  const navigate = useNavigate();

  const sorted = [...courseList]
    .sort((a, b) => b.minimum_aps - a.minimum_aps)
    .slice(0, 10);

  return (
    <div className="cp">
      {/* Header */}
      <div className="cp__hero">
        <div className="cp__hero-icon">
          <BookOpen size={24} strokeWidth={1.8} />
        </div>
        <div className="cp__hero-text">
          <h2 className="cp__title">Your top matches</h2>
          <p className="cp__subtitle">
            Showing your top {sorted.length} qualified courses sorted by APS.
            Add your personality profile to unlock AI-powered explanations and
            personalized recommendations.
          </p>
        </div>
      </div>

      {/* AI nudge banner */}
      <div className="cp__nudge">
        <div className="cp__nudge-text">
          <UserCircle size={18} strokeWidth={2} className="cp__nudge-icon" />
          <p>
            <strong>Want personalized insights?</strong> Add your profile so our
            AI can explain why each course suits you specifically.
          </p>
        </div>
        <div className="cp__nudge-actions">
          <button
            className="cp__nudge-btn cp__nudge-btn--outline"
            onClick={() => {
              sessionStorage.setItem(
                "visited-uni",
                JSON.stringify({
                  name: universityName,
                  id: universityId,
                }),
              );
              navigate(`/view-courses/${universityId}`);
            }}
          >
            More courses
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
          <button
            className="cp__nudge-btn cp__nudge-btn--filled"
            onClick={() => navigate("/student/manage-my-profile")}
          >
            Add profile
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Course list */}
      {sorted.length === 0 ? (
        <EmptyState message="You don't qualify for any courses at this university based on your current subjects." />
      ) : (
        renderCourseList(sorted, "No courses available.")
      )}
    </div>
  );
}
