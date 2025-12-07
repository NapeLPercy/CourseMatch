// ViewSubjects.jsx
import React from "react";
import "../../styles/ViewSubjects.css";

export default function ViewSubjects({ subjects = [] }) {
  return (
    <div className="container">
      <h2>Subjects</h2>

      {subjects.length === 0 ? (
        <p>No subjects available.</p>
      ) : (
        <ul>
          {subjects.map((s) => (
            <li key={s.Subject_Id}>
              {s.Name} — {s.Mark}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
