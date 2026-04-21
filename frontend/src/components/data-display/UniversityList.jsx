import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Search, X } from "lucide-react";
import { universitiesData } from "../../Utils/universities";
import EmptyState from "../ui/EmptyState";

function FacultyMarquee({ faculties }) {
  const doubled = [...faculties, ...faculties];
  return (
    <div className="uni__marquee">
      <div className="uni__marquee-track">
        {doubled.map((f, i) => (
          <span key={i} className="uni__marquee-item">
            <BookOpen size={11} strokeWidth={2} />
            {f}
            <span className="uni__marquee-dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

function UniCard({ uni, index }) {
  const navigate = useNavigate();

  const handleViewCourses = () => {
    sessionStorage.setItem("visited-uni", JSON.stringify({ name: uni.name, id: uni.id }));
    navigate(`/view-courses/${uni.id}`);
  };

  return (
    <div className="uni__card" style={{ "--i": index }}>

      {/* Avatar — centered, top of card */}
      <div className="uni__avatar-wrap">
        <div className="uni__avatar">
          <span className="uni__avatar-text">{uni.id.toUpperCase()}</span>
        </div>
      </div>

      {/* Info */}
      <div className="uni__body">
        <h3 className="uni__name">{uni.name}</h3>
        <p className="uni__desc">{uni.description}</p>
      </div>

      {/* Marquee */}
      <FacultyMarquee faculties={uni.faculties} />

      {/* CTA */}
      <button
        type="button"
        className="uni__cta"
        onClick={handleViewCourses}
        aria-label={`View courses at ${uni.name}`}
      >
        View Courses
        <ArrowRight size={15} strokeWidth={2.5} />
      </button>

    </div>
  );
}

export default function UniversityList() {
  const [search, setSearch] = useState("");

  const filtered = universitiesData.filter((u) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q) ||
      u.description?.toLowerCase().includes(q) ||
      u.faculties?.some((f) => f.toLowerCase().includes(q))
    );
  });

  return (
    <div className="uni">

      {/* Search */}
      <div className="uni__search-wrap">
        <Search size={15} className="uni__search-icon" />
        <input
          className="uni__search"
          type="text"
          placeholder="Search universities, faculties…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="uni__search-clear" onClick={() => setSearch("")}>
            <X size={13} />
          </button>
        )}
      </div>

      {search && (
        <p className="uni__meta">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
        </p>
      )}

      {filtered.length === 0
        ? <EmptyState message={`No universities match "${search}".`} />
        : (
          <div className="uni__grid">
            {filtered.map((uni, i) => (
              <UniCard key={uni.id} uni={uni} index={i} />
            ))}
          </div>
        )
      }

    </div>
  );
}