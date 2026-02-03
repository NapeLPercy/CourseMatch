import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewSubjects from "./ViewSubjects";
import "../../styles/ViewSubjects.css"; /* shared loading class */

export default function ViewSubjectsPage() {
  /* ------------------------------------------------ */
  // State
  /* ------------------------------------------------ */
  const [studentId, setStudentId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ------------------------------------------------ */
  // Pull studentId from session on mount
  /* ------------------------------------------------ */
  useEffect(() => {
    const stored = sessionStorage.getItem("student");
    if (!stored) return;

    try {
      const student = JSON.parse(stored);
      if (student?.studentId) {
        setStudentId(student.studentId);
      }
    } catch (e) {
      console.error("Failed to parse student from sessionStorage:", e);
    }
  }, []);

  /* ------------------------------------------------ */
  // Fetch subjects once studentId is available
  /* ------------------------------------------------ */
  useEffect(() => {
    if (!studentId) {
      setLoading(false);
      return;
    }
    fetchSubjects();
  }, [studentId]);

  const fetchSubjects = async () => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/subjects/${studentId}`);
      console.log(res, "we here");
      setSubjects(res.data.subjects);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //handle save

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
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Network error:", err.message);
      }
    }
  };

  /* ------------------------------------------------ */
  // Loading state
  /* ------------------------------------------------ */
  if (loading) {
    return (
      <div className="vs-wrapper">
        <p className="vs-loading">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          Loading student subjects …
        </p>
      </div>
    );
  }

  /* ------------------------------------------------ */
  // Error state
  /* ------------------------------------------------ */
  if (error) {
    return (
      <div className="vs-wrapper">
        <p className="vs-loading" style={{ color: "#dc2626" }}>
          {error}
        </p>
      </div>
    );
  }

  /* ------------------------------------------------ */
  // Render child
  /* ------------------------------------------------ */
  return <ViewSubjects subjects={subjects} onSave={handleSave} />;
}
