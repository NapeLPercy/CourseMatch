import React, { useState, useMemo } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import renderCourseList from "./CourseList";
import "../../styles/FilteredCourses.css";

export default function FilteredCourses({ courses }) {
  const [search, setSearch] = useState("");
  const [university, setUniversity] = useState("all");

  const universities = useMemo(() => (
    [...new Set(courses.map((c) => c.university_name))].sort()
  ), [courses]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return courses.filter((c) => {
      const matchSearch = !q ||
        c.qualification_name?.toLowerCase().includes(q) ||
        c.university_name?.toLowerCase().includes(q) ||
        c.faculty_name?.toLowerCase().includes(q);
      const matchUni = university === "all" || c.university_name === university;
      return matchSearch && matchUni;
    });
  }, [courses, search, university]);

  return (
    <div className="cfl">

      {/* Controls */}
      <div className="cfl__controls">
        <div className="cfl__search-wrap">
          <Search size={14} className="cfl__search-icon" />
          <input
            className="cfl__search"
            type="text"
            placeholder="Search courses, universities, faculty…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="cfl__clear" onClick={() => setSearch("")}>
              <X size={13} />
            </button>
          )}
        </div>

        <div className="cfl__select-wrap">
          <select
            className="cfl__select"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          >
            <option value="all">All universities</option>
            {universities.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <ChevronDown size={13} className="cfl__chevron" />
        </div>
      </div>

      {/* Meta */}
      <p className="cfl__meta">
        {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* List */}
      {renderCourseList(
        filtered,
        search || university !== "all"
          ? "No courses match your search or filter."
          : "No courses available."
      )}

    </div>
  );
}