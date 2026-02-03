import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditmarkModal from "../forms/EditmarkModal";

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

/* ─── Helpers ───────────────────────────────────────────────── */
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

/* ─── Skeleton loader ───────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="dash">
      {/* Header skeleton */}
      <div className="dash__header">
        <div className="dash__skel dash__skel--title" />
        <div className="dash__skel dash__skel--sub" />
      </div>
      {/* Cards skeleton */}
      <div className="dash__stats">
        {[1, 2, 3].map((i) => (
          <div key={i} className="dash__card dash__card--skel">
            <div className="dash__skel dash__skel--icon" />
            <div className="dash__skel dash__skel--val" />
            <div className="dash__skel dash__skel--label" />
          </div>
        ))}
      </div>
      {/* Table skeleton */}
      <div className="dash__table-wrap">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="dash__skel dash__skel--row"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Empty state ───────────────────────────────────────────── */
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
        onClick={() => navigate("/add-subjects")}
      >
        <PlusCircle size={16} strokeWidth={2} />
        Add Subjects
      </button>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export default function Dashboard({ user }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSubject, setEditingSubject] = useState(null);
  const navigate = useNavigate();
  const { addSubjects } = useSubjects();

  // Parse student from session
  const student = parseStudent();
  const studentId = student?.studentId ?? null;
  const endorsement = student?.endorsement ?? null;

  // Fetch subjects
  useEffect(() => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    const API_BASE = process.env.REACT_APP_API_BASE;

    axios
      .get(`${API_BASE}/api/subjects/${studentId}`)
      .then((res) => {
        if (res.data.success) {
          setSubjects(res.data.subjects);
          addSubjects(res.data.subjects);
        }
      })
      .catch((err) => console.error("Error loading subjects:", err))
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) return <Skeleton />;

  // Derived stats
  const totalSubjects = subjects.length;
  const endorsementCount = subjects.filter(
    (s) => s.Endorsement_Subject === 1,
  ).length;
  const avgMark = totalSubjects
    ? Math.round(
        subjects.reduce((sum, s) => sum + Number(s.Mark), 0) / totalSubjects,
      )
    : 0;

  const handleSave = async ({ Subject_Id, Mark }) => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    try {
      const response = await axios.put(
        `${API_BASE}/api/subjects/${Subject_Id}`,
        { Mark },
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
  return (
    <div className="dash">
      {/* ════ HEADER ════ */}
      <header className="dash__header">
        <div className="dash__header-left">
          <h1 className="dash__greeting">
            Welcome back,{" "}
            <span className="dash__name">{user?.name || "Student"}</span>
          </h1>
          {endorsement && (
            <div className="dash__endorsement">
              <Award
                size={15}
                strokeWidth={2}
                className="dash__endorsement-icon"
              />
              <span>
                Endorsement: <strong>{endorsement}</strong>
              </span>
            </div>
          )}
        </div>
        <button
          className="dash__add-btn"
          type="button"
          onClick={() => navigate("/add-subjects")}
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
            <span className="dash__th dash__th--mark">Mark</span>
            <span className="dash__th dash__th--endo">Endorsement</span>
            <span className="dash__th dash__th--action" />
          </div>

          {/* Rows */}
          {subjects.map((s, i) => {
            const tier = markTier(Number(s.Mark));
            const isEndo = s.Endorsement_Subject === 1;

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
                  <span className="dash__subject-name">{s.Name}</span>
                </div>

                {/* Mark badge */}
                <div className="dash__cell dash__cell--mark">
                  <span className={`dash__badge dash__badge--${tier}`}>
                    {s.Mark}%
                  </span>
                </div>

                {/* Endorsement pill */}
                <div className="dash__cell dash__cell--endo">
                  {isEndo ? (
                    <span className="dash__pill dash__pill--yes">
                      <Award size={12} strokeWidth={2.2} /> Yes
                    </span>
                  ) : (
                    <span className="dash__pill dash__pill--no">—</span>
                  )}
                </div>

                {/* Edit */}
                <div className="dash__cell dash__cell--action">
                  <button
                    type="button"
                    className="dash__edit"
                    onClick={() => setEditingSubject(s)}
                    aria-label={`Edit ${s.Name}`}
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
