import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Send,
  X,
  AlertCircle,
  CheckCircle2,
  Search,
  ChevronDown,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useSubjects } from "../../context/SubjectContext";
import "../../styles/AddSubjects.css";

/* ─── Subject master list ───────────────────────────────────── */
const SUBJECTS_LIST = [
  "Accounting",
  "Afrikaans FAL",
  "Afrikaans HL",
  "Agricultural Management Practices",
  "Agricultural Sciences",
  "Agricultural Technology",
  "Business Studies",
  "Civil Technology",
  "Computer Applications Technology",
  "Consumer Studies",
  "Dance Studies",
  "Design",
  "Dramatic Arts",
  "Economics",
  "Electrical Technology",
  "Engineering Graphics & Design",
  "English FAL",
  "English HL",
  "Geography",
  "History",
  "Hospitality Studies",
  "Information Technology",
  "Life Orientation",
  "Life Sciences",
  "Mathematical Literacy",
  "Mathematics",
  "Mechanical Technology",
  "Music",
  "Ndebele HL",
  "Northern Sotho HL",
  "Physical Science",
  "Religion Studies",
  "Southern Sotho HL",
  "Swazi HL",
  "Technical Mathematics",
  "Tourism",
  "Tsonga HL",
  "Tswana HL",
  "Venda HL",
  "Visual Arts",
  "Xhosa HL",
  "iSiZulu HL",
];

/* ─── Validation ────────────────────────────────────────────── */
function validate(subjects) {
  const errors = [];
  const names = subjects.map((s) => s.name).filter(Boolean);

  // 1. Minimum 7
  if (subjects.length < 7) {
    errors.push("You must add at least 7 subjects.");
  }

  // 2. Every chosen subject must have a mark 0-100
  subjects.forEach((s, i) => {
    if (s.name && (s.mark === "" || s.mark === undefined)) {
      errors.push(`"${s.name}" is missing a mark.`);
    } else if (s.name && (Number(s.mark) < 0 || Number(s.mark) > 100)) {
      errors.push(`"${s.name}" mark must be between 0 and 100.`);
    }
  });

  // 3. Every row must have a subject chosen
  subjects.forEach((s, i) => {
    if (!s.name) {
      errors.push(`Row ${i + 1} has no subject selected.`);
    }
  });

  // 4. No duplicate subjects
  const seen = new Set();
  subjects.forEach((s) => {
    if (s.name) {
      if (seen.has(s.name)) {
        errors.push(`"${s.name}" is selected more than once.`);
      }
      seen.add(s.name);
    }
  });

  // 5. Mathematics OR Mathematical Literacy required
  const hasMath =
    names.includes("Mathematics") || names.includes("Mathematical Literacy");
  if (!hasMath) {
    errors.push("You must include Mathematics or Mathematical Literacy.");
  }

  // 6. Life Orientation required
  if (!names.includes("Life Orientation")) {
    errors.push("You must include Life Orientation.");
  }

  // 7. At least one FAL subject
  const hasFAL = names.some((n) => n.endsWith("FAL"));
  if (!hasFAL) {
    errors.push(
      "You must include at least one FAL subject (e.g. English FAL).",
    );
  }

  // 8. At least one HL subject
  const hasHL = names.some((n) => n.endsWith("HL"));
  if (!hasHL) {
    errors.push("You must include at least one HL subject (e.g. English HL).");
  }

  return errors;
}

/* ─── Mark tier helper ──────────────────────────────────────── */
function markTier(val) {
  const n = Number(val);
  if (isNaN(n) || val === "") return null;
  if (n >= 80) return "excellent";
  if (n >= 70) return "good";
  if (n >= 60) return "average";
  return "low";
}

/* ─── Searchable select (one instance per row) ─────────────── */
function SubjectSelect({ value, onChange, takenNames }) {
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
  const filtered = SUBJECTS_LIST.filter(
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

/* ─── Progress ring (visual 0–15 counter) ───────────────────── */
function ProgressBar({ current, max }) {
  const pct = Math.min((current / max) * 100, 100);
  const minReached = current >= 7;

  return (
    <div className="as__progress">
      <div className="as__progress-track">
        <div
          className={`as__progress-fill ${minReached ? "as__progress-fill--ok" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="as__progress-label">
        {current} <span className="as__progress-sep">/</span> {max}
        {minReached && (
          <CheckCircle2
            size={13}
            strokeWidth={2.2}
            className="as__progress-check"
          />
        )}
      </span>
    </div>
  );
}

/* ─── Success screen ────────────────────────────────────────── */
function SuccessScreen({ onReset }) {
  return (
    <div className="as__success">
      <div className="as__success-icon">
        <CheckCircle2 size={48} strokeWidth={1.4} />
      </div>
      <h3 className="as__success-title">Subjects saved!</h3>
      <p className="as__success-text">
        Your subjects have been submitted successfully. You can now view your
        matched courses.
      </p>
      <button className="as__success-btn" type="button" onClick={onReset}>
        <Plus size={15} strokeWidth={2.2} /> Add more subjects
      </button>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function AddSubjects() {
  const { addSubjects } = useSubjects();

  const [subjects, setSubjects] = useState([{ name: "", mark: "" }]);
  const [errors, setErrors] = useState([]); // array of strings
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // API in-flight

  const MAX = 15;
  const MIN = 7;

  /* Build a set of already-chosen names for duplicate prevention */
  const takenNames = new Set(subjects.map((s) => s.name).filter(Boolean));

  /* Add row */
  const addRow = () => {
    if (subjects.length >= MAX) return;
    setSubjects((prev) => [...prev, { name: "", mark: "" }]);
  };

  /* Delete row */
  const deleteRow = (i) => {
    setSubjects((prev) => prev.filter((_, idx) => idx !== i));
  };

  /* Field change */
  const change = (i, field, val) => {
    setSubjects((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [field]: val };
      return copy;
    });
    // Clear errors as user edits
    if (errors.length) setErrors([]);
  };

  /* Submit subjects */
  const handleSubmit = async () => {
    const errs = validate(subjects);
    if (errs.length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors([]);

    const payload = subjects.map((s) => ({
      ...s,
      endorsementSubject: 0,
    }));

    //const userId = JSON.parse(sessionStorage.getItem("user"))?.id;
    const API_BASE = process.env.REACT_APP_API_BASE;
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const res = await axios.post(
        `${API_BASE}/api/subjects/addSubjects`,
        { subjects: payload }, // Data object as the second argument
        {
          // Config object as the third argument
          headers: {
            Authorization: `Bearer ${token}`, // Correct "Authorization" header name
          },
        },
      );

      if (res.data) {
        addSubjects(payload);
        setSubmitted(true);
      }
    } catch (err) {
      setErrors([
        
          err.response?.data?.error ||
          "Submission failed. Try again.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* Reset after success */
  const reset = () => {
    setSubjects([{ name: "", mark: "" }]);
    setErrors([]);
    setSubmitted(false);
  };

  /* ── Success state ── */
  if (submitted) return <SuccessScreen onReset={reset} />;

  /* ── Form ── */
  return (
    <div className="as">
      {/* Header */}
      <div className="as__header">
        <div className="as__header-left">
          <div className="as__icon-wrap">
            <BookOpen size={22} strokeWidth={1.6} />
          </div>
          <span className="as__eyebrow">Step 1</span>
          <h1 className="as__title">Add Your Subjects</h1>
          <p className="as__subtitle">
            Enter your matric subjects and marks. You need between 7 and 15
            subjects.
          </p>
        </div>

        {/* Requirements checklist */}
        <div className="as__requirements">
          <span className="as__req-title">Requirements</span>
          {[
            {
              label: "7–15 subjects",
              met: subjects.length >= MIN && subjects.length <= MAX,
            },
            {
              label: "Maths or Maths Literacy",
              met: subjects.some(
                (s) =>
                  s.name === "Mathematics" ||
                  s.name === "Mathematical Literacy",
              ),
            },
            {
              label: "Life Orientation",
              met: subjects.some((s) => s.name === "Life Orientation"),
            },
            {
              label: "At least one FAL",
              met: subjects.some((s) => s.name.endsWith("FAL")),
            },
            {
              label: "At least one HL",
              met: subjects.some((s) => s.name.endsWith("HL")),
            },
          ].map((r) => (
            <div
              key={r.label}
              className={`as__req ${r.met ? "as__req--met" : ""}`}
            >
              <CheckCircle2
                size={13}
                strokeWidth={2.2}
                className="as__req-icon"
              />
              {r.label}
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <ProgressBar current={subjects.length} max={MAX} />

      {/* Error pills */}
      {errors.length > 0 && (
        <div className="as__errors">
          <div className="as__errors-header">
            <AlertCircle
              size={15}
              strokeWidth={2}
              className="as__errors-icon"
            />
            <span>Please fix the following</span>
            <button
              type="button"
              className="as__errors-dismiss"
              onClick={() => setErrors([])}
            >
              <X size={13} strokeWidth={2.2} />
            </button>
          </div>
          <ul className="as__errors-list">
            {errors.map((e, i) => (
              <li key={i} className="as__error-item">
                <X size={11} strokeWidth={2.5} className="as__error-bullet" />{" "}
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Subject rows */}
      <div className="as__rows">
        {subjects.map((s, i) => {
          const tier = markTier(s.mark);
          return (
            <div
              key={i}
              className="as__row"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {/* Row number */}
              <span className="as__row-num">{i + 1}</span>

              {/* Select */}
              <SubjectSelect
                value={s.name}
                onChange={(val) => change(i, "name", val)}
                takenNames={takenNames}
              />

              {/* Mark input + badge */}
              <div className="as__mark-wrap">
                <input
                  type="number"
                  className="as__mark-input"
                  placeholder="Mark"
                  min="0"
                  max="100"
                  value={s.mark}
                  onChange={(e) => change(i, "mark", e.target.value)}
                />
                {tier && (
                  <span className={`as__mark-badge as__mark-badge--${tier}`}>
                    {tier}
                  </span>
                )}
              </div>

              {/* Delete (only if more than 1 row) */}
              {subjects.length > 1 && (
                <button
                  type="button"
                  className="as__delete"
                  onClick={() => deleteRow(i)}
                  aria-label={`Remove row ${i + 1}`}
                >
                  <Trash2 size={15} strokeWidth={2} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Row actions */}
      <div className="as__actions">
        {subjects.length < MAX && (
          <button type="button" className="as__add-btn" onClick={addRow}>
            <Plus size={15} strokeWidth={2.2} /> Add Another
          </button>
        )}

        <button
          type="button"
          className="as__submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="as__submit-spinner" />
          ) : (
            <Send size={16} strokeWidth={2.2} />
          )}
          {loading ? "Saving…" : "Submit Subjects"}
        </button>
      </div>
    </div>
  );
}
