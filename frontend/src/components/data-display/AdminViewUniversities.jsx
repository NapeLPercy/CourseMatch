import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import "../../styles/AdminViewUniversities.css";

import { getAllUniversities } from "../../services/universityService";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import AdminUniversityCard from "../ui/AdminUniversityCard";
import ErrorState from "../ui/ErrorState";

export default function AdminViewUniversities() {
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await getAllUniversities();

      if (!data.success) {
        setError("Failed to fetch universities");
        return;
      }

      setUniversities(data.universities || []);
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch universities");
    } finally {
      setLoading(false);
    }
  };

  //search filter
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return universities;

    const q = searchQuery.toLowerCase();

    return universities.filter(
      (uni) =>
        uni.abbreviation.toLowerCase().includes(q) ||
        uni.name.toLowerCase().includes(q) ||
        uni.faculties?.some((f) => f.name.toLowerCase().includes(q)),
    );
  }, [searchQuery, universities]);

  const handleAfterDelete = (abbreviation) => {
    setUniversities((prev) =>
      prev.filter((uni) => uni.abbreviation !== abbreviation),
    );
  };

  if (loading) return <Skeleton />;

  if (error) {
    return <ErrorState message={error} onRetry={fetchUniversities} />;
  }

  if (!universities.length) {
    return <EmptyState message="No universities available yet." />;
  }

  return (
    <div className="vu">
      {/* SEARCH */}
      <div className="vu__search-wrap">
        <Search size={18} strokeWidth={2} className="vu__search-icon" />
        <input
          type="text"
          className="vu__search-input"
          placeholder="Search by abbreviation, name, or faculty…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* META */}
      <div className="vu__meta">
        Showing <strong>{filtered.length}</strong> universit
        {filtered.length !== 1 ? "ies" : "y"}
      </div>

      {/* RESULTS */}
      {filtered.length > 0 ? (
        <div className="vu__grid">
          {filtered.map((uni, i) => (
            <AdminUniversityCard
              key={uni.abbreviation}
              uni={uni}
              index={i}
              afterDelete={handleAfterDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="No universities match your search." />
      )}
    </div>
  );
}
