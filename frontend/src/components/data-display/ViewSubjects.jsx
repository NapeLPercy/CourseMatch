// ViewSubjects.jsx
import React from "react";
import "../../styles/ViewSubjects.css";
import EditmarkModal from "../forms/EditmarkModal";
import { useState } from "react";
/* -------------------------------------------------- */
// Helper: map a numeric mark to a colour-band class
/* -------------------------------------------------- */
function getMarkBand(mark) {
  if (mark >= 70) return { cls: "vs-card__mark--high", label: "Great" };
  if (mark >= 50) return { cls: "vs-card__mark--mid", label: "Good" };
  if (mark >= 30) return { cls: "vs-card__mark--low", label: "Fair" };
  return { cls: "vs-card__mark--fail", label: "Fail" };
}

/* -------------------------------------------------- */
// Pencil SVG – kept inline as a tiny component so the
// icon scales with the button and inherits its colour
/* -------------------------------------------------- */
function PencilIcon() {
  return (
    <svg
      className="vs-card__edit-btn__icon"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11.5 1.5l3 3L5 13H2v-3L11.5 1.5z" />
    </svg>
  );
}

// ViewSubjects – presentational
export default function ViewSubjects({ subjects = [], onSave }) {
  const [editingSubject, setEditingSubject] = useState(null);

  /* ---- empty state ---- */
  if (subjects.length === 0) {
    return (
      <div className="vs-wrapper">
        <header className="vs-header">
          <h1 className="vs-header__title">Subjects</h1>
        </header>
        <div className="vs-empty">
          <div className="vs-empty__icon">📖</div>
          <p>You have not submitted your subjects yet.</p>
        </div>
      </div>
    );
  }

  /* ---- subject list ---- */
  return (
    <div className="vs-wrapper">
      <header className="vs-header">
        <h1 className="vs-header__title">Subjects</h1>
        <span className="vs-header__count">
          {subjects.length} {subjects.length === 1 ? "subject" : "subjects"}
        </span>
      </header>

      <ul className="vs-list">
        {subjects.map((s) => {
          const { cls, label } = getMarkBand(s.Mark);

          return (
            <li className="vs-card" key={s.Subject_Id}>
              {/* colour-coded mark badge */}
              <div className={`vs-card__mark ${cls}`}>
                <span className="vs-card__mark__value">{s.Mark}</span>
                <span className="vs-card__mark__label">{label}</span>
              </div>

              {/* subject name */}
              <span className="vs-card__name">{s.Name}</span>

              {/* edit button */}
              <button
                className="vs-card__edit-btn"
                onClick={() => setEditingSubject(s)}
                aria-label={`Edit ${s.Name}`}
              >
                <PencilIcon />
                <span>Edit</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* modal — only mounts when a subject is selected */}
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
