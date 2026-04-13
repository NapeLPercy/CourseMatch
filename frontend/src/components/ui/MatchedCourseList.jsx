import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Building2,
  BookOpen,
  Bookmark,
  Microscope,
  ArrowUpDown,
  ChevronDown,
  X,
  BookMarked,
} from "lucide-react";

import "../../styles/StudentMatchedCourses.css";

export default function CourseList({ courses = [] }) {
  const [search, setSearch] = useState("");
  const [university, setUniversity] = useState("all");
  const [sort, setSort] = useState("fit_desc");
  const [bookmarked, setBookmarked] = useState(new Set());
  const [expanded, setExpanded] = useState(null);

  const universities = useMemo(() => {
    const names = [...new Set(courses.map((c) => c.university_name))].sort();
    return names;
  }, [courses]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    let result = courses.filter((c) => {
      if (q) {
        const haystack = Object.values(c).join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (university !== "all" && c.university_name !== university)
        return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sort === "aps_asc") return a.minimum_aps - b.minimum_aps;
      if (sort === "aps_desc") return b.minimum_aps - a.minimum_aps;
      if (sort === "fit_desc") return b.fit_score - a.fit_score;
      return 0;
    });

    return result;
  }, [courses, search, university, sort]);

  const toggleBookmark = (id) => {
    console.log("bookmark:", id);
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDeepDive = (course) => {
    console.log("deep dive:", course);
  };

  const fitColor = (score) => {
    if (score >= 80) return "cl__fit--high";
    if (score >= 60) return "cl__fit--mid";
    return "cl__fit--low";
  };

  return (
    <div className="cl">
      {/* Toolbar */}
      <div className="cl__toolbar">
        <div className="cl__search-wrap">
          <Search size={15} className="cl__search-icon" />
          <input
            className="cl__search"
            type="text"
            placeholder="Search qualifications, universities, faculty…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="cl__search-clear" onClick={() => setSearch("")}>
              <X size={13} />
            </button>
          )}
        </div>

        <div className="cl__filters">
          <div className="cl__select-wrap">
            <Building2 size={14} className="cl__select-icon" />
            <select
              className="cl__select"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            >
              <option value="all">All universities</option>
              {universities.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <ChevronDown size={13} className="cl__select-chevron" />
          </div>

          <div className="cl__select-wrap">
            <ArrowUpDown size={14} className="cl__select-icon" />
            <select
              className="cl__select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="fit_desc">Best fit first</option>
              <option value="aps_desc">APS: high → low</option>
              <option value="aps_asc">APS: low → high</option>
            </select>
            <ChevronDown size={13} className="cl__select-chevron" />
          </div>
        </div>
      </div>

      {/* Results meta */}
      <div className="cl__meta">
        <span className="cl__meta-count">
          {filtered.length} qualification{filtered.length !== 1 ? "s" : ""}
        </span>
        {(search || university !== "all") && (
          <button
            className="cl__clear-all"
            onClick={() => {
              setSearch("");
              setUniversity("all");
            }}
          >
            <X size={12} /> Clear filters
          </button>
        )}
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="cl__empty">
          <BookOpen size={32} strokeWidth={1.5} />
          <p>No qualifications match your search.</p>
        </div>
      ) : (
        <div className="cl__grid">
          {filtered.map((course, i) => (
            <div
              key={course.id}
              className={`cl__card ${expanded === course.id ? "cl__card--open" : ""}`}
              style={{ "--i": i }}
            >
              {/* Card header */}
              <div className="cl__card-top">
                <div className="cl__card-avatar">
                  {course.abbreviation?.slice(0, 2).toUpperCase()}
                </div>
                <div className="cl__card-meta">
                  <span className="cl__uni">{course.university_name}</span>
                  <span className="cl__faculty">{course.faculty_name}</span>
                </div>
                <div className={`cl__fit ${fitColor(course.fit_score)}`}>
                  {course.fit_score}%
                </div>
              </div>

              {/* Course name + code */}
              <div className="cl__card-body">
                <h3 className="cl__name">{course.qualification_name}</h3>
                <div className="cl__tags">
                  <span className="cl__tag cl__tag--aps">
                    NQF {course.nqf}
                  </span>

                  <span className="cl__tag cl__tag--code">
                    {course.course_code}
                  </span>
                  <span className="cl__tag cl__tag--aps">
                    APS {course.minimum_aps}
                  </span>
                </div>
              </div>

              {/* Expandable reason */}
              {expanded === course.id && (
                <div className="cl__reason">
                  <p>{course.reason}</p>
                </div>
              )}

              {/* Actions */}
              <div className="cl__card-actions">
                <button
                  className="cl__action-btn cl__action-btn--ghost"
                  onClick={() =>
                    setExpanded(expanded === course.id ? null : course.id)
                  }
                >
                  <SlidersHorizontal size={14} />
                  {expanded === course.id ? "Less" : "Deep dive"}
                </button>
                <button
                  className={`cl__action-btn cl__action-btn--ghost ${bookmarked.has(course.id) ? "cl__action-btn--saved" : ""}`}
                  onClick={() => toggleBookmark(course.id)}
                >
                  {bookmarked.has(course.id) ? (
                    <>
                      <BookMarked size={14} /> Saved
                    </>
                  ) : (
                    <>
                      <Bookmark size={14} /> Save
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
