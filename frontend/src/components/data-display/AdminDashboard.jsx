import "../../styles/AdminDashboard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  BookOpen,
  FileText,
  AlertTriangle,
  TrendingUp,
  Clock,
  Plus,
  List,
  BarChart3,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import { formatTimestamp } from "../../Utils/datetime";

/* ─── Skeleton Loader ───────────────────────────────────────── */
function SkeletonLoader() {
  return (
    <div className="ad">
      <div className="ad__header">
        <div className="ad__skeleton ad__skeleton--title" />
        <div className="ad__skeleton ad__skeleton--subtitle" />
      </div>

      <div className="ad__quick-actions">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="ad__skeleton ad__skeleton--btn" />
        ))}
      </div>

      <div className="ad__stats-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="ad__skeleton ad__skeleton--card" />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const API_BASE = process.env.REACT_APP_API_BASE;
      const token = JSON.parse(sessionStorage.getItem("token"));

      try {
        const res = await axios.get(`${API_BASE}/api/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data.dashboard);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(
          err.response?.data?.error || "Failed to load dashboard data."
        );
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="ad">
        <div className="ad__error">
          <div className="ad__error-icon">
            <XCircle size={48} strokeWidth={1.5} />
          </div>
          <h2 className="ad__error-title">Failed to Load Dashboard</h2>
          <p className="ad__error-message">{error}</p>
          <button
            className="ad__error-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { counts, health, recent } = data;

  return (
    <div className="ad">
      {/* Header */}
      <header className="ad__header">
        <div className="ad__header-icon">
          <LayoutDashboard size={28} strokeWidth={1.6} />
        </div>
        <div className="ad__header-text">
          <h1 className="ad__title">Admin Dashboard</h1>
          <p className="ad__subtitle">
            System overview and quick actions for managing CourseMatch.
          </p>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="ad__quick-actions">
        <button
          className="ad__quick-btn ad__quick-btn--primary"
          onClick={() => navigate("/admin/manage-universities")}
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>Add University</span>
        </button>

        <button
          className="ad__quick-btn ad__quick-btn--primary"
          onClick={() => navigate("/admin/manage-qualifications")}
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>Add Course</span>
        </button>

        <button
          className="ad__quick-btn ad__quick-btn--ghost"
          onClick={() => navigate("/admin/manage-universities")}
        >
          <List size={16} strokeWidth={2.2} />
          <span>View Universities</span>
        </button>

        <button
          className="ad__quick-btn ad__quick-btn--ghost"
          onClick={() => navigate("/admin/manage-qualifications")}
        >
          <List size={16} strokeWidth={2.2} />
          <span>View Courses</span>
        </button>

        <button
          className="ad__quick-btn ad__quick-btn--ghost"
          onClick={() => navigate("/admin/reports")}
        >
          <BarChart3 size={16} strokeWidth={2.2} />
          <span>View Reports</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="ad__stats-grid">
        <div className="ad__stat-card ad__stat-card--blue">
          <div className="ad__stat-icon">
            <Users size={24} strokeWidth={1.8} />
          </div>
          <div className="ad__stat-body">
            <div className="ad__stat-value">{counts.students}</div>
            <div className="ad__stat-label">Students</div>
          </div>
        </div>

        <div className="ad__stat-card ad__stat-card--purple">
          <div className="ad__stat-icon">
            <Building2 size={24} strokeWidth={1.8} />
          </div>
          <div className="ad__stat-body">
            <div className="ad__stat-value">{counts.universities}</div>
            <div className="ad__stat-label">Universities</div>
          </div>
        </div>

        <div className="ad__stat-card ad__stat-card--green">
          <div className="ad__stat-icon">
            <BookOpen size={24} strokeWidth={1.8} />
          </div>
          <div className="ad__stat-body">
            <div className="ad__stat-value">{counts.faculties}</div>
            <div className="ad__stat-label">Faculties</div>
          </div>
        </div>

        <div className="ad__stat-card ad__stat-card--orange">
          <div className="ad__stat-icon">
            <GraduationCap size={24} strokeWidth={1.8} />
          </div>
          <div className="ad__stat-body">
            <div className="ad__stat-value">{counts.qualifications}</div>
            <div className="ad__stat-label">Qualifications</div>
          </div>
        </div>

        <div className="ad__stat-card ad__stat-card--pink">
          <div className="ad__stat-icon">
            <FileText size={24} strokeWidth={1.8} />
          </div>
          <div className="ad__stat-body">
            <div className="ad__stat-value">{counts.prereq_rows}</div>
            <div className="ad__stat-label">Prerequisites</div>
          </div>
        </div>

        <div className="ad__stat-card ad__stat-card--cyan">
          <div className="ad__stat-icon">
            <Sparkles size={24} strokeWidth={1.8} />
          </div>
          <div className="ad__stat-body">
            <div className="ad__stat-value">
              {counts.ai_explanations_generated}
            </div>
            <div className="ad__stat-label">AI Explanations</div>
          </div>
        </div>
      </div>

      {/* Health Section */}
      <div className="ad__section">
        <h2 className="ad__section-title">
          <AlertTriangle size={18} strokeWidth={2} />
          System Health
        </h2>

        <div className="ad__health-grid">
          <div
            className={`ad__health-item ${
              health.students_without_profiles > 0
                ? "ad__health-item--warning"
                : "ad__health-item--ok"
            }`}
          >
            {health.students_without_profiles > 0 ? (
              <AlertTriangle size={16} strokeWidth={2} />
            ) : (
              <CheckCircle2 size={16} strokeWidth={2} />
            )}
            <span>
              {health.students_without_profiles} student
              {health.students_without_profiles !== 1 ? "s" : ""} without
              profiles
            </span>
          </div>

          <div
            className={`ad__health-item ${
              health.students_without_subjects > 0
                ? "ad__health-item--warning"
                : "ad__health-item--ok"
            }`}
          >
            {health.students_without_subjects > 0 ? (
              <AlertTriangle size={16} strokeWidth={2} />
            ) : (
              <CheckCircle2 size={16} strokeWidth={2} />
            )}
            <span>
              {health.students_without_subjects} student
              {health.students_without_subjects !== 1 ? "s" : ""} without
              subjects
            </span>
          </div>

          <div
            className={`ad__health-item ${
              health.faculties_missing_qualifications > 0
                ? "ad__health-item--warning"
                : "ad__health-item--ok"
            }`}
          >
            {health.faculties_missing_qualifications > 0 ? (
              <AlertTriangle size={16} strokeWidth={2} />
            ) : (
              <CheckCircle2 size={16} strokeWidth={2} />
            )}
            <span>
              {health.faculties_missing_qualifications} facult
              {health.faculties_missing_qualifications !== 1 ? "ies" : "y"}{" "}
              without courses
            </span>
          </div>

          <div
            className={`ad__health-item ${
              health.qualifications_missing_prereqs > 0
                ? "ad__health-item--warning"
                : "ad__health-item--ok"
            }`}
          >
            {health.qualifications_missing_prereqs > 0 ? (
              <AlertTriangle size={16} strokeWidth={2} />
            ) : (
              <CheckCircle2 size={16} strokeWidth={2} />
            )}
            <span>
              {health.qualifications_missing_prereqs} course
              {health.qualifications_missing_prereqs !== 1 ? "s" : ""} without
              prerequisites
            </span>
          </div>

          <div
            className={`ad__health-item ${
              health.universities_missing_faculties > 0
                ? "ad__health-item--warning"
                : "ad__health-item--ok"
            }`}
          >
            {health.universities_missing_faculties > 0 ? (
              <AlertTriangle size={16} strokeWidth={2} />
            ) : (
              <CheckCircle2 size={16} strokeWidth={2} />
            )}
            <span>
              {health.universities_missing_faculties} universit
              {health.universities_missing_faculties !== 1 ? "ies" : "y"}{" "}
              without faculties
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="ad__section">
        <h2 className="ad__section-title">
          <TrendingUp size={18} strokeWidth={2} />
          Recent Activity
        </h2>

        {/* Recent Qualifications */}
        {recent.qualifications && recent.qualifications.length > 0 && (
          <div className="ad__activity-block">
            <h3 className="ad__activity-title">Latest Qualifications</h3>
            <div className="ad__activity-list">
              {recent.qualifications.slice(0, 5).map((qual, i) => (
                <div key={i} className="ad__activity-item">
                  <div className="ad__activity-icon">
                    <GraduationCap size={14} strokeWidth={2} />
                  </div>
                  <div className="ad__activity-body">
                    <div className="ad__activity-name">
                      {qual.code} — {qual.name}
                    </div>
                    <div className="ad__activity-time">
                      <Clock size={11} strokeWidth={2} />
                      {formatTimestamp(qual.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent AI Usage */}
        {recent.ai_usage && recent.ai_usage.length > 0 && (
          <div className="ad__activity-block">
            <h3 className="ad__activity-title">Latest AI Usage</h3>
            <div className="ad__activity-list">
              {recent.ai_usage.slice(0, 3).map((usage, i) => (
                <div key={i} className="ad__activity-item">
                  <div className="ad__activity-icon ad__activity-icon--ai">
                    <Sparkles size={14} strokeWidth={2} />
                  </div>
                  <div className="ad__activity-body">
                    <div className="ad__activity-name">
                      {usage.university_abbrev} — {usage.courses_scored} courses
                      scored, {usage.explanations_generated} explanations
                    </div>
                    <div className="ad__activity-time">
                      <Clock size={11} strokeWidth={2} />
                      {formatTimestamp(usage.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}