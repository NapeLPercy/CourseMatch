import React, { useState } from "react";
import { Edit3 } from "lucide-react";
import EditmarkModal from "../forms/EditmarkModal";
import EmptyState from "../ui/EmptyState";
import "../../styles/ViewSubjects.css";

function getMarkBand(mark) {
  if (mark >= 80) return { cls: "vs__card-mark--distinction", label: "Distinction" };
  if (mark >= 70) return { cls: "vs__card-mark--strong", label: "Strong" };
  if (mark >= 60) return { cls: "vs__card-mark--solid", label: "Solid" };
  if (mark >= 50) return { cls: "vs__card-mark--developing", label: "Developing" };
  if (mark >= 40) return { cls: "vs__card-mark--emerging", label: "Emerging" };
  return { cls: "vs__card-mark--needs-support", label: "Need Support" };
}

export default function ViewSubjects({ subjects = [], onSave }) {
  const [editingSubject, setEditingSubject] = useState(null);

  return (
    <div className="vs">
      {/* Header */}
      <header className="vs__header">
        <div className="vs__header-text">
          <h1 className="vs__title">My Subjects</h1>
          <p className="vs__subtitle">
            View and manage the subjects you've submitted for course matching
          </p>
        </div>
        <div className="vs__count-badge">
          <strong>{subjects.length}</strong>
          <span>{subjects.length === 1 ? "subject" : "subjects"}</span>
        </div>
      </header>

      {/* Empty State */}
      {subjects.length === 0 && (
        <EmptyState message="You haven't submitted any subjects yet. Add your subjects to get matched with courses." />
      )}

      {/* Subjects Grid */}
      {subjects.length > 0 && (
        <div className="vs__grid">
          {subjects.map((subject) => {
            const { cls, label } = getMarkBand(subject.mark);
            return (
              <div className="vs__card" key={subject.subject_id}>
                {/* Subject Name */}
                <div className="vs__card-header">
                  <h3 className="vs__card-name">{subject.name}</h3>
                  <button
                    className="vs__card-edit"
                    onClick={() => setEditingSubject(subject)}
                    aria-label={`Edit ${subject.name}`}
                  >
                    <Edit3 size={14} strokeWidth={2.2} />
                    Edit
                  </button>
                </div>

                {/* Mark Badge */}
                <div className={`vs__card-mark ${cls}`}>
                  <span className="vs__card-mark-value">{subject.mark}%</span>
                  <span className="vs__card-mark-label">{label}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingSubject && (
        <EditmarkModal
          subject={editingSubject}
          onSave={async (payload) => {
            await onSave(payload);
            setEditingSubject(null);
          }}
          onClose={() => setEditingSubject(null)}
        />
      )}
    </div>
  );
}