import {
  BookOpen,
  User,
  CheckCircle2,
  Sparkles,
  GitCompare,
  Microscope,
} from "lucide-react";

export default function SetupSection({ flags, navigate }) {
  const { hasSubjects, hasProfile } = flags;
  const both = hasSubjects && hasProfile;
  const none = !hasSubjects && !hasProfile;
  const pct = both ? 100 : none ? 0 : 50;

  let message =
    "Add your subjects and complete your profile to unlock personalised AI career guidance.";

  if (both) {
    message =
      "You're all set — personalised AI career tools are now fully unlocked!";
  } else if (hasSubjects && !hasProfile) {
    message =
      "Subjects added successfully! Complete your profile to unlock personalised AI insights and recommendations.";
  } else if (!hasSubjects && hasProfile) {
    message =
      "Profile completed! Add your subjects to start discovering courses and AI-powered recommendations.";
  }
  return (
    <div className="db__card db__setup">
      <div className="db__section-head">
        <div className="db__section-icon db__section-icon--blue">
          <CheckCircle2 size={18} strokeWidth={2} />
        </div>
        <h2 className="db__section-title">Profile setup</h2>
      </div>

      {/* Progress bar */}
      <div className="db__progress-wrap">
        <div className="db__progress-track">
          <div
            className={`db__progress-fill ${both ? "db__progress-fill--complete" : ""}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="db__progress-pct">{pct}%</span>
      </div>

      <p className="db__setup-msg">{message}</p>

      {!both && (
        <div className="db__setup-btns">
          {!hasSubjects && (
            <button
              className="db__setup-btn db__setup-btn--blue"
              onClick={() => navigate("/student/add/subjects")}
            >
              <BookOpen size={15} strokeWidth={2} />
              Add subjects
            </button>
          )}
          {!hasProfile && (
            <button
              className="db__setup-btn db__setup-btn--purple"
              onClick={() => navigate("/student/add/personality")}
            >
              <User size={15} strokeWidth={2} />
              Add Personality profile
            </button>
          )}
        </div>
      )}
      {both && (
        <div className="db__setup-btns">
          <button
            className="db__ai-unlock-btn db__ai-unlock-btn--blue"
            onClick={() => navigate("/view-courses")}
          >
            <Sparkles size={15} strokeWidth={2} />
            AI Recommendations
          </button>
          <button
            className="db__ai-unlock-btn db__ai-unlock-btn--purple"
            onClick={() => navigate("/student/ai-recommended-courses")}
          >
            <Microscope size={15} strokeWidth={2} />
            Career Deep Dive
          </button>
          <button
            className="db__ai-unlock-btn db__ai-unlock-btn--teal"
            onClick={() => navigate("/student/course-comparisons")}
          >
            <GitCompare size={15} strokeWidth={2} />
            Compare Courses
          </button>
        </div>
      )}
    </div>
  );
}
