import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewSubjects from "./ViewSubjects";
import Skeleton from "../ui/Skeleton";
import ErrorState from "../ui/ErrorState";
import { getSubjects } from "../../services/subjectService";
import "../../styles/ViewSubjects.css";

export default function ViewSubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getSubjects();
      setSubjects(data.subjects || []);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setError("Failed to load your subjects" || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async ({ Subject_Id, Mark }) => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const token = JSON.parse(sessionStorage.getItem("token"));

    try {
      const response = await axios.put(
        `${API_BASE}/api/subjects/${Subject_Id}`,
        { Mark },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = response.data;
      if (data.success) {
        // Update local state
        setSubjects((prev) =>
          prev.map((s) =>
            s.subject_id === Subject_Id ? { ...s, mark: Mark } : s
          )
        );
        alert(data.message);
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Network error: " + err.message);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="vs">
        <header className="vs__header">
          <div className="vs__header-text">
            <h1 className="vs__title">My Subjects</h1>
            <p className="vs__subtitle">
              View and manage the subjects you've submitted for course matching
            </p>
          </div>
        </header>
        <Skeleton />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="vs">
        <header className="vs__header">
          <div className="vs__header-text">
            <h1 className="vs__title">My Subjects</h1>
            <p className="vs__subtitle">
              View and manage the subjects you've submitted for course matching
            </p>
          </div>
        </header>
        <ErrorState message={error} onRetry={fetchSubjects} />
      </div>
    );
  }

  return <ViewSubjects subjects={subjects} onSave={handleSave} />;
}
