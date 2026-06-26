import { useEffect, useState } from "react";
import ViewSubjects from "./ViewSubjects";
import ErrorState from "../ui/ErrorState";
import { getSubjects, updateMark } from "../../services/subjectService";
import "../../styles/ViewSubjects.css";

export default function ViewSubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

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
      setError("Failed to load your subjects" || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async ({ subjectId, mark }) => {
    setUpdateError(null);
    try {
      const { data } = await updateMark(subjectId, mark);
      if (data.success) {
        // Update local state
        setSubjects((prev) =>
          prev.map((s) => (s.id === subjectId ? { ...s, mark: mark } : s)),
        );
        return true;
      }
    } catch (err) {
      setUpdateError("Failed to update subject mark, try again!");
      return false;
    }
  };
  // Loading state
  // Error state
  if (error) return <ErrorState message={error} onRetry={fetchSubjects} />;
  return (
    <ViewSubjects
      subjects={subjects}
      onSave={handleSave}
      loading={loading}
      onUpdateError={updateError}
    />
  );
}
