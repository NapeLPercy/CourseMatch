import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import "../../styles/AdminViewQualification.css";

import Skeleton from "../ui/Skeleton";
import { getAllCourses } from "../../services/courseService";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";
import AdminQualificationCard from "../ui/AdminQualificationCard";

export default function AdminViewQualifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQualifications();
  }, []);

  //get qualifications
  const fetchQualifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await getAllCourses();

      if (!data.success) {
        setError("Failed to fetch qualifications");
        return;
      }

      setQualifications(data.qualifications || []);
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch qualifications");
    } finally {
      setLoading(false);
    }
  };

  //search filter
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return qualifications;

    const q = searchQuery.toLowerCase();

    return qualifications.filter(
      (qual) =>
        qual.name.toLowerCase().includes(q) ||
        qual.code.toLowerCase().includes(q) ||
        qual.university?.name.toLowerCase().includes(q) ||
        qual.faculty?.name.toLowerCase().includes(q),
    );
  }, [searchQuery, qualifications]);

  const handleAfterDelete = (qualificationCode) => {
    setQualifications((prev) =>
      prev.filter((q) => q.code !== qualificationCode),
    );
  };

  if (loading) return <Skeleton />;

  if (error) {
    return <ErrorState message={error} onRetry={fetchQualifications} />;
  }

  if (!qualifications.length) {
    return <EmptyState message="No qualifications available yet." />;
  }

  return (
    <div className="avq">
      {/* SEARCH */}
      <div className="avq__search-wrap">
        <Search size={18} strokeWidth={2} className="avq__search-icon" />
        <input
          type="text"
          className="avq__search-input"
          placeholder="Search by name, code, university, or faculty…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* META */}
      <div className="avq__meta">
        Showing <strong>{filtered.length}</strong> qualification
        {filtered.length !== 1 ? "s" : ""}
      </div>

      {/* RESULTS */}
      {filtered.length > 0 ? (
        <div className="avq__grid">
          {filtered.map((qual, i) => (
            <AdminQualificationCard
              key={qual.code}
              qual={qual}
              index={i}
              afterDelete={handleAfterDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="No qualifications match your search." />
      )}
    </div>
  );
}
