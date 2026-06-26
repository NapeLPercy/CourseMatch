import React, { useState } from "react";
import { Edit3, School, BookOpen, TrendingUp } from "lucide-react";
import EditmarkModal from "../forms/EditmarkModal";
import EmptyState from "../ui/EmptyState";
import "../../styles/ViewSubjects.css";
import PageHeader from "../ui/PageHeader";

function getMarkBand(mark) {
  if (mark >= 80)
    return { cls: "vs__card-mark--distinction", label: "Distinction" };
  if (mark >= 70) return { cls: "vs__card-mark--strong", label: "Strong" };
  if (mark >= 60) return { cls: "vs__card-mark--solid", label: "Solid" };
  if (mark >= 50)
    return { cls: "vs__card-mark--developing", label: "Developing" };
  if (mark >= 40) return { cls: "vs__card-mark--emerging", label: "Emerging" };
  return { cls: "vs__card-mark--needs-support", label: "Needs support" };
}

function SubjectsSkeleton() {
  return (
    <div className="vs__grid">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="vs__card vs__card--skel" style={{ "--i": i }}>
          <div className="vs__skel vs__skel--name" />
          <div className="vs__skel vs__skel--bar" />
          <div className="vs__skel vs__skel--badge" />
        </div>
      ))}
    </div>
  );
}

export default function ViewSubjects({
  subjects = [],
  onSave,
  loading,
  onUpdateError,
}) {
  const [editingSubject, setEditingSubject] = useState(null);

  const avg = subjects.length
    ? Math.round(
        subjects.reduce((s, sub) => s + Number(sub.mark), 0) / subjects.length,
      )
    : null;

  return (
    <div className="vs">
      <PageHeader
        icon={BookOpen}
        title="My subjects"
        subtitle="Your submitted matric subjects and marks used for course matching."
        pillOne={
          subjects.length > 0
            ? `${subjects.length} subject${subjects.length !== 1 ? "s" : ""}`
            : null
        }
        pillTwo={avg !== null ? `Avg ${avg}%` : null}
      />

      {loading && <SubjectsSkeleton />}

      {!loading && subjects.length === 0 && (
        <EmptyState message="You haven't submitted any subjects yet. Add your subjects to get matched with courses." />
      )}

      {!loading && subjects.length > 0 && (
        <div className="vs__grid">
          {subjects.map((subject, i) => {
            const { cls, label } = getMarkBand(Number(subject.mark));
            const mark = Number(subject.mark);
            return (
              <div
                key={subject.subject_id}
                className="vs__card"
                style={{ "--i": i }}
              >
                {/* Header */}
                <div className="vs__card-header">
                  <div className="vs__card-icon">
                    <TrendingUp size={15} strokeWidth={2} />
                  </div>
                  <button
                    className="vs__card-edit"
                    onClick={() => setEditingSubject(subject)}
                    aria-label={`Edit ${subject.name}`}
                  >
                    <Edit3 size={13} strokeWidth={2.2} />
                    Edit
                  </button>
                </div>

                {/* Name */}
                <h3 className="vs__card-name">{subject.name}</h3>

                {/* Progress bar */}
                <div className="vs__bar-wrap">
                  <div className="vs__bar-track">
                    <div
                      className={`vs__bar-fill ${cls}`}
                      style={{ width: `${mark}%` }}
                    />
                  </div>
                </div>

                {/* Mark badge */}
                <div className={`vs__card-mark ${cls}`}>
                  <span className="vs__card-mark-value">{mark}%</span>
                  <span className="vs__card-mark-label">{label}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editingSubject && (
        <EditmarkModal
          subject={editingSubject}
          onSave={async (payload) => {
            const success = await onSave(payload);

            if (success) {
              setEditingSubject(null);
            }
          }}
          onClose={() => setEditingSubject(null)}
          onUpdateError={onUpdateError}
        />
      )}
    </div>
  );
}
