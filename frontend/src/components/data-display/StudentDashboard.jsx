import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditmarkModal from "../forms/EditmarkModal";
import Skeleton from "../ui/Skeleton";
import {
  BookOpen,
  BarChart2,
  Award,
  TrendingUp,
  PlusCircle,
  Pencil,
  FileText,
  ChevronRight,
} from "lucide-react";
import { useSubjects } from "../../context/SubjectContext";
import "../../styles/Dashboard.css";
import { getSubjects } from "../../services/subjectService";
import { getBasicStudentInfo } from "../../services/studentService";
import ErrorState from "../ui/ErrorState";

function parseStudent() {
  try {
    const raw = sessionStorage.getItem("student");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Colour tier for mark badges
function markTier(mark) {
  if (mark >= 80) return "excellent";
  if (mark >= 70) return "good";
  if (mark >= 60) return "average";
  return "low";
}

function getPerformanceLabel(mark) {
  if (mark >= 80) return "Distinction";
  if (mark >= 70) return "Strong";
  if (mark >= 60) return "Solid";
  if (mark >= 50) return "Developing";
  if (mark >= 40) return "Emerging";
  return "Needs Support";
}

/* Empty state */
function EmptyState({ navigate }) {
  return (
    <div className="dash__empty">
      <div className="dash__empty-icon">
        <FileText size={36} strokeWidth={1.3} />
      </div>
      <h3 className="dash__empty-title">No subjects yet</h3>
      <p className="dash__empty-text">
        Add your matric subjects to get started with course matching.
      </p>
      <button
        className="dash__empty-btn"
        type="button"
        onClick={() => navigate("/student/add/subjects")}
      >
        <PlusCircle size={16} strokeWidth={2} />
        Add Subjects
      </button>
    </div>
  );
}

/* Main component */
export default function StudentDashboard({ user }) {
  const [studentProfile, setStudentProfile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingSubject, setEditingSubject] = useState(null);
  const navigate = useNavigate();
  const { addSubjects } = useSubjects();

  // Parse student from session
  const student = parseStudent();
  const endorsement = student?.endorsement ?? null;

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  //fetch student basic data
  const fetchStudentProfile = async () => {
    try {
      setError(null);
      setLoading(true);

      const { data } = await getBasicStudentInfo();

      console.log("basic info", data);
      if (!data.success) {
        setError("Failed to fetch dashboard data");
        return;
      }
      setStudentProfile(data.profile);

      ///save student endorsement in the session
      sessionStorage.setItem(
        "endorsement",
        JSON.stringify(data.profile.endorsement),
      );
      const { data: subjectsData } = await getSubjects();

      console.log("subjects info", subjectsData);
      if (!subjectsData.success) {
        setError("Failed to fetch dashboard data");
        return;
      }

      setStudentProfile(data.profile);
      setSubjects(subjectsData.subjects);
      addSubjects(subjectsData.subjects);
    } catch (error) {
      setError("Error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Derived stats
  const totalSubjects = subjects.length;
  const endorsementCount = subjects.filter(
    (s) => s.endorsement_subject === 1,
  ).length;
  const avgMark = totalSubjects
    ? Math.round(
        subjects.reduce((sum, s) => sum + Number(s.mark), 0) / totalSubjects,
      )
    : 0;

  //Handle subject mark save after editing
  const handleSave = async ({ Subject_Id, Mark }) => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const response = await axios.put(
        `${API_BASE}/api/subjects/${Subject_Id}`,
        { Mark },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      let data = response.data;
      if (data.success) {
        setSubjects((prev) =>
          prev.map((s) => (s.Subject_Id === Subject_Id ? { ...s, Mark } : s)),
        );
        alert(data.message);
      }
      setEditingSubject(null);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Network error:", err.message);
      }
      setEditingSubject(null);
    }
  };

  /* ── Render ── */

  if (error) {
    console.log("There is error");
    return <ErrorState message={error} onRetry={fetchStudentProfile} />;
  }

  if (loading) return <Skeleton />;

  return (
    <div className="dash">
      {/* ════ HEADER ════ */}
      <header className="dash__header">
        <div className="dash__header-left">
          <h1 className="dash__greeting">
            Welcome back,{" "}
            <span className="dash__name">
              {studentProfile.fullName || "Student"}
            </span>
          </h1>
          {studentProfile.endorsement && (
            <div className="dash__endorsement">
              <Award
                size={15}
                strokeWidth={2}
                className="dash__endorsement-icon"
              />
              <span>
                Endorsement: <strong>{studentProfile.endorsement}</strong>
              </span>
            </div>
          )}
        </div>
        <button
          className="dash__add-btn"
          type="button"
          onClick={() => navigate("/student/add/subjects")}
        >
          <PlusCircle size={16} strokeWidth={2} />
          <span>Add Subjects</span>
        </button>
      </header>

      {/* ════ STAT CARDS ════ */}
      <section className="dash__stats" aria-label="Subject statistics">
        <div className="dash__card">
          <div className="dash__card-icon dash__card-icon--blue">
            <BookOpen size={22} strokeWidth={1.6} />
          </div>
          <span className="dash__card-value">{totalSubjects}</span>
          <span className="dash__card-label">Total Subjects</span>
        </div>

        <div className="dash__card">
          <div className="dash__card-icon dash__card-icon--green">
            <Award size={22} strokeWidth={1.6} />
          </div>
          <span className="dash__card-value">{endorsementCount}</span>
          <span className="dash__card-label">Endorsements</span>
        </div>

        <div className="dash__card">
          <div className="dash__card-icon dash__card-icon--purple">
            <TrendingUp size={22} strokeWidth={1.6} />
          </div>
          <span className="dash__card-value">{avgMark}%</span>
          <span className="dash__card-label">Average Mark</span>
        </div>
      </section>

      {/* ════ SUBJECT LIST ════ */}
      {totalSubjects === 0 ? (
        <EmptyState navigate={navigate} />
      ) : (
        <section className="dash__table-wrap" aria-label="Your subjects">
          {/* Desktop table header */}
          <div className="dash__table-header">
            <span className="dash__th dash__th--name">Subject</span>
            <span className="dash__th dash__th--mark">Mark & Comment</span>
            <span className="dash__th dash__th--action" />
          </div>

          {/* Rows */}
          {subjects.map((s, i) => {
            const tier = markTier(Number(s.mark));
            const isEndo = s.endorsement_subject === 1;

            return (
              <div
                key={s.subject_id}
                className="dash__row"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {/* Subject name */}
                <div className="dash__cell dash__cell--name">
                  <div className="dash__row-icon">
                    <BookOpen size={16} strokeWidth={2} />
                  </div>
                  <span className="dash__subject-name">{s.name}</span>
                </div>

                {/*SUBJECTS BADGES*/}
                <div className="dash__cell dash__cell--mark">
                  {(() => {
                    const label = getPerformanceLabel(s.mark);

                    return (
                      <span className="dash__badge dash__badge--combo">
                        <span className={`dash__badge--${tier}`}>
                          {s.mark}%
                        </span>
                        <span className="dash__badge-separator">:</span>

                        {label === "Distinction" && (
                          <Award size={12} strokeWidth={2.2} />
                        )}

                        <span
                          className={`dash__badge--${label.toLowerCase().replace(/\s/g, "-")}`}
                        >
                          {label}
                        </span>
                      </span>
                    );
                  })()}
                </div>

                {/* Edit */}
                <div className="dash__cell dash__cell--action">
                  <button
                    type="button"
                    className="dash__edit"
                    onClick={() => setEditingSubject(s)}
                    aria-label={`Edit ${s.name}`}
                  >
                    <Pencil size={15} strokeWidth={2} />
                    <span>Edit</span>
                    <ChevronRight
                      size={13}
                      strokeWidth={2.2}
                      className="dash__edit-arrow"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {editingSubject && (
        <EditmarkModal
          subject={editingSubject}
          onSave={handleSave}
          onClose={() => setEditingSubject(null)}
        />
      )}
    </div>
  );
}
