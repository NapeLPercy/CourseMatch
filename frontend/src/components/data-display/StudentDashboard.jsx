import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubjects } from "../../context/SubjectContext";
import { getStudentDashboard } from "../../services/studentService";
import { GraduationCap } from "lucide-react";

import "../../styles/StudentDashboard.css";
import AIUsageSection from "../ui/StudentDashboardAIUsageSection";
import SetupSection from "../ui/StudentDashboardSetupSection";
import SubjectsChart from "../ui/StudentDashboardSubjectsChart";
import AIContentCards from "../ui/StudentDashboardAIContentCards";
import {
  isCacheValid,
  getCachedDashboard,
  setCachedDashboard,
} from "../../Utils/studentDashboardCache";
import { getGreeting } from "../../Utils/greeting";

/* ── Main ────────────────────────────────── */
export default function StudentDashboard() {
  const navigate = useNavigate();
  const { addSubjects } = useSubjects();

  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cached = getCachedDashboard();

    if (cached && isCacheValid(cached.timestamp)) {
      setDashData(cached.data);

      if (cached.data.subjects?.length) {
        addSubjects(cached.data.subjects);
      }

      setLoading(false);
      return;
    }

    fetchStudentDashboard();
  }, []);

  const fetchStudentDashboard = async () => {
    setLoading(true);
    setError(false);

    try {
      const { data } = await getStudentDashboard();

      const dashboard = data.dashboard;
      if (dashboard.subjects?.length) {
        addSubjects(dashboard.subjects);
        sessionStorage.setItem("endorsement", JSON.stringify(dashboard.profile.endorsement));
      }

      setDashData(dashboard);

      setCachedDashboard(dashboard); //cache it
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="db db--loading">
        <div className="db__spinner" />
        <p>Loading your dashboard…</p>
      </div>
    );

  if (error)
    return (
      <div className="db db--loading">
        <p className="db__error-msg">Failed to load dashboard.</p>
        <button className="db__retry-btn" onClick={fetchStudentDashboard}>
          Try again
        </button>
      </div>
    );

  if (!dashData) return null;

  const { subjects, profile, activity, flags } = dashData;

  const firstName = profile?.fullName?.split(" ")[0] || null;
  const grade = profile?.grade || null;
  const endorsement = profile?.endorsement || null;

  return (
    <div className="db">
      {/* Welcome */}
      <div className="db__welcome">
        <div className="db__welcome-icon">
          <GraduationCap size={28} strokeWidth={1.8} />
        </div>
        <div className="db__welcome-text">
          <h1 className="db__welcome-title">
            {getGreeting()}
            {firstName ? `, ${firstName}` : ""}!
          </h1>
          <p className="db__welcome-sub">
            {grade && (
              <span className="db__welcome-pill db__welcome-pill--blue">
                {grade}
              </span>
            )}
            {endorsement && (
              <span className="db__welcome-pill db__welcome-pill--green">
                {endorsement}
              </span>
            )}
            {!grade && !endorsement && "Welcome to your CourseMatch dashboard."}
          </p>
        </div>
      </div>

      {/* 1. Setup */}
      <SetupSection flags={flags} navigate={navigate} />

      {/* 2. AI Usage */}
      <AIUsageSection flags={flags} />

      {/* 3. Subjects chart */}
      {subjects?.length > 0 && <SubjectsChart subjects={subjects} />}

      {/* 4. AI Content */}
      {(activity?.recommendation ||
        activity?.deepDive ||
        activity?.comparison) && (
        <AIContentCards activity={activity} navigate={navigate} />
      )}
    </div>
  );
}
