import { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronDown,
  BookOpen,
} from "lucide-react";

import { studentSubjectsData } from "../../Utils/subjects";

export default function SubjectSelect({ value, onChange, takenNames }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrap = useRef(null);
  const searchInput = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && searchInput.current) searchInput.current.focus();
  }, [open]);

  // Filter: match query AND exclude already-taken names (allow current value through)
  const filtered = studentSubjectsData.filter(
    (s) =>
      s.toLowerCase().includes(query.toLowerCase()) &&
      (!takenNames.has(s) || s === value),
  );

  return (
    <div ref={wrap} className="as__select">
      {/* Trigger */}
      <button
        type="button"
        className={`as__select-trigger ${open ? "as__select-trigger--open" : ""} ${!value ? "as__select-trigger--empty" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <BookOpen size={15} strokeWidth={2} className="as__select-icon" />
        <span
          className={`as__select-val ${!value ? "as__select-val--ph" : ""}`}
        >
          {value || "Select a subject…"}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2.2}
          className={`as__select-chevron ${open ? "as__select-chevron--open" : ""}`}
        />
      </button>

      {/* Panel */}
      {open && (
        <div className="as__select-panel">
          <div className="as__select-search">
            <Search
              size={14}
              strokeWidth={2}
              className="as__select-search-icon"
            />
            <input
              ref={searchInput}
              type="text"
              className="as__select-search-input"
              placeholder="Type to filter…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <ul className="as__select-list">
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <li
                  key={s}
                  className={`as__select-option ${s === value ? "as__select-option--active" : ""}`}
                  onClick={() => {
                    onChange(s);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  {s}
                </li>
              ))
            ) : (
              <li className="as__select-empty">No match for "{query}"</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}