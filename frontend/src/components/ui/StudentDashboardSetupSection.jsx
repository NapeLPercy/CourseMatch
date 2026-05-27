
import {
  BookOpen,
  User,
  CheckCircle2,
} from "lucide-react";
export default function SetupSection({ flags, navigate }) {
  const { hasSubjects, hasProfile } = flags;
  const both = hasSubjects && hasProfile;
  const none = !hasSubjects && !hasProfile;
  const pct = both ? 100 : none ? 0 : 50;

  let message = "Add your subjects and profile to unlock AI features.";
  if (both) message = "You're all set — AI features are fully unlocked!";
  else if (hasSubjects && !hasProfile)
    message =
      "Great, subjects added! Complete your profile for full AI features.";
  else if (!hasSubjects && hasProfile)
    message = "Profile complete! Add your subjects for full AI features.";

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
              onClick={() => navigate("/student/manage-my-profile")}
            >
              <User size={15} strokeWidth={2} />
              Add Personality profile
            </button>
          )}
        </div>
      )}
    </div>
  );
}
