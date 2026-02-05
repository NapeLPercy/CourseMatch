import "../../styles/AddCourse.css";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  GraduationCap,
  Building2,
  FileText,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  AlertCircle,
  BookOpen,
} from "lucide-react";

/* ─── Hardcoded data ────────────────────────────────────────── */
/*const HARD_CODED_UNIS = [
  {
    abbreviation: "UCT",
    name: "University of Cape Town",
    url: "https://www.uct.ac.za",
    faculties: [
      { faculty_id: 1, name: "Faculty of Science" },
      { faculty_id: 2, name: "Faculty of Business" },
      { faculty_id: 3, name: "Faculty of Humanities" },
    ],
  },
  {
    abbreviation: "WITS",
    name: "University of the Witwatersrand",
    url: "https://www.wits.ac.za",
    faculties: [
      { faculty_id: 10, name: "Faculty of Science" },
      {
        faculty_id: 11,
        name: "Faculty of Engineering and the Built Environment",
      },
      { faculty_id: 12, name: "Faculty of Humanities" },
    ],
  },
  {
    abbreviation: "UP",
    name: "University of Pretoria",
    url: "https://www.up.ac.za",
    faculties: [
      {
        faculty_id: 20,
        name: "Faculty of Engineering, Built Environment and IT",
      },
      { faculty_id: 21, name: "Faculty of Economic and Management Sciences" },
      { faculty_id: 22, name: "Faculty of Education" },
      { faculty_id: 23, name: "Faculty of Health Sciences" },
    ],
  },
];*/

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "English HL",
  "English FAL",
  "Afrikaans HL",
  "Afrikaans FAL",
  "Accounting",
  "Business Studies",
  "Economics",
  "Geography",
  "History",
  "Life Orientation",
];

/* ─── Helpers ───────────────────────────────────────────────── */
function clampMark(n) {
  if (Number.isNaN(n)) return "";
  if (n < 0) return 0;
  if (n > 100) return 100;
  return n;
}

/* ─── Main component ────────────────────────────────────────── */
export default function AdminAddQualification() {
  // University & faculty
  const [universities, setUniversities] = useState([]);

  const [selectedUniAbbrev, setSelectedUniAbbrev] = useState(
    universities[0]?.abbreviation ?? "",
  );
  const [selectedFacultyId, setSelectedFacultyId] = useState(
    universities[0]?.faculties[0]?.faculty_id ?? "",
  );

  // Qualification fields
  const [code, setCode] = useState("");
  const [qName, setQName] = useState("");
  const [minAps, setMinAps] = useState("");
  const [minEndorsement, setMinEndorsement] = useState("");
  const [minDuration, setMinDuration] = useState("");

  // Prerequisites
  const [prereqs, setPrereqs] = useState([
    { id: uuidv4(), name: "Mathematics", min_mark: 60 },
  ]);

  const selectedUni = useMemo(
    () => universities.find((u) => u.abbreviation === selectedUniAbbrev),
    [selectedUniAbbrev],
  );

  const faculties = selectedUni?.faculties ?? [];

  const selectedFaculty = useMemo(
    () =>
      faculties.find((f) => String(f.faculty_id) === String(selectedFacultyId)),
    [faculties, selectedFacultyId],
  );

  // When university changes: reset faculty
  const handleUniChange = (e) => {
    const nextUni = e.target.value;
    setSelectedUniAbbrev(nextUni);

    const uniObj = universities.find((u) => u.abbreviation === nextUni);
    const firstFaculty = uniObj?.faculties?.[0]?.faculty_id ?? "";
    setSelectedFacultyId(firstFaculty);
  };

  //change faculty
  const handleFacultyChange = (e) => setSelectedFacultyId(e.target.value);

  // Prereq helpers
  const addPrereqRow = () => {
    setPrereqs((prev) => [...prev, { id: uuidv4(), name: "", min_mark: "" }]);
  };

  const removePrereqRow = (id) => {
    setPrereqs((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePrereq = (id, patch) => {
    setPrereqs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );
  };

  const usedSubjects = useMemo(() => {
    const set = new Set();
    prereqs.forEach((p) => {
      const key = (p.name || "").trim().toLowerCase();
      if (key) set.add(key);
    });
    return set;
  }, [prereqs]);

  const prereqErrors = useMemo(() => {
    const errors = [];
    const seen = new Set();

    prereqs.forEach((p, idx) => {
      const name = (p.name || "").trim();
      const key = name.toLowerCase();
      const mark = p.min_mark;

      if (!name) errors.push(`Prerequisite #${idx + 1}: subject is required.`);
      if (name && seen.has(key))
        errors.push(`Prerequisite #${idx + 1}: duplicate subject "${name}".`);
      if (name) seen.add(key);
      if (mark === "" || mark === null || mark === undefined) {
        errors.push(`Prerequisite #${idx + 1}: min mark is required.`);
      } else {
        const n = Number(mark);
        if (Number.isNaN(n))
          errors.push(`Prerequisite #${idx + 1}: min mark must be a number.`);
        if (!Number.isNaN(n) && (n < 0 || n > 100))
          errors.push(`Prerequisite #${idx + 1}: min mark must be 0–100.`);
      }
    });

    return errors;
  }, [prereqs]);

  const formErrors = useMemo(() => {
    const errs = [];

    if (!selectedUniAbbrev) errs.push("University is required.");
    if (!selectedFacultyId) errs.push("Faculty is required.");
    if (!code.trim()) errs.push("Qualification code is required.");
    if (!qName.trim()) errs.push("Qualification name is required.");

    if (minAps !== "" && Number.isNaN(Number(minAps)))
      errs.push("Min APS must be a number.");
    if (minDuration !== "" && Number.isNaN(Number(minDuration)))
      errs.push("Min duration must be a number.");

    if (prereqs.length === 0) errs.push("Add at least 1 prerequisite.");
    errs.push(...prereqErrors);

    return errs;
  }, [
    selectedUniAbbrev,
    selectedFacultyId,
    code,
    qName,
    minAps,
    minDuration,
    prereqs.length,
    prereqErrors,
  ]);

  const canSubmit = formErrors.length === 0;

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const res = await axios.get(`${API_BASE}/api/university/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const universitiesData = res.data.universities;
      setUniversities(universitiesData);
        setSelectedUniAbbrev(universitiesData[0].abbreviation);
      setSelectedFacultyId(universitiesData[0].faculties[0].faculty_id);
    } catch (error) {
      console.log(error.message || "Failed to fetch universities");
    }
  };
  //Handle course submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fac_id: Number(selectedFacultyId),
      code: code.trim(),
      name: qName.trim(),
      minaps: minAps === "" ? null : Number(minAps),
      min_endorsement: minEndorsement.trim() || null,
      min_duration: minDuration === "" ? null : Number(minDuration),
      prerequisites: prereqs.map((p) => ({
        name: (p.name || "").trim(),
        min_mark: Number(p.min_mark),
      })),
    };

    try {
      const API_BASE = process.env.REACT_APP_API_BASE;
      const token = JSON.parse(sessionStorage.getItem("token"));

      const res = await axios.post(
        `${API_BASE}/api/qualification/add-course`,
        { qualification: payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if(res.data.success){
        alert(res.data.message)
        handleReset();
      }
    } catch (error) {
        alert(error.message || "Failed to submit courses");
    }
  };

  const handleReset = () => {
    setCode("");
    setQName("");
    setMinAps("");
    setMinEndorsement("");
    setMinDuration("");
    setPrereqs([{ id: uuidv4(), name: "", min_mark: "" }]);
  };

  /* ── Render ── */
  return (
    <div className="aaq">
      {/* Header */}
      <header className="aaq__header">
        <div className="aaq__header-icon">
          <GraduationCap size={24} strokeWidth={1.6} />
        </div>
        <div className="aaq__header-text">
          <h1 className="aaq__title">Add Qualification</h1>
          <p className="aaq__subtitle">
            Create a new qualification with prerequisites and requirements.
          </p>
        </div>
      </header>

      {/* Two-column grid */}
      <div className="aaq__grid">
        {/* LEFT: University + Faculty */}
        <section className="aaq__card">
          <div className="aaq__card-header">
            <Building2 size={18} strokeWidth={2} className="aaq__card-icon" />
            <h2 className="aaq__card-title">University & Faculty</h2>
          </div>

          <div className="aaq__field">
            <label htmlFor="aaq-uni" className="aaq__label">
              University
            </label>
            <select
              id="aaq-uni"
              value={selectedUniAbbrev}
              onChange={handleUniChange}
              className="aaq__select"
            >
              {universities.map((u) => (
                <option key={u.abbreviation} value={u.abbreviation}>
                  {u.abbreviation} — {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Uni info */}
          {selectedUni && (
            <div className="aaq__info">
              <span className="aaq__info-label">URL:</span>
              <a
                href={selectedUni.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aaq__info-link"
              >
                {selectedUni.url}
              </a>
            </div>
          )}

          <div className="aaq__field">
            <label htmlFor="aaq-faculty" className="aaq__label">
              Faculty
            </label>
            <select
              id="aaq-faculty"
              value={selectedFacultyId}
              onChange={handleFacultyChange}
              className="aaq__select"
            >
              {faculties.map((f) => (
                <option key={f.faculty_id} value={f.faculty_id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {selectedFaculty && (
            <div className="aaq__info">
              <span className="aaq__info-label">Selected:</span>
              <span className="aaq__info-value">{selectedFaculty.name}</span>
            </div>
          )}
        </section>

        {/* RIGHT: Qualification form */}
        <form onSubmit={handleSubmit} className="aaq__card">
          <div className="aaq__card-header">
            <FileText size={18} strokeWidth={2} className="aaq__card-icon" />
            <h2 className="aaq__card-title">Qualification Details</h2>
          </div>

          {/* Code + APS */}
          <div className="aaq__row">
            <div className="aaq__field">
              <label htmlFor="aaq-code" className="aaq__label">
                Code *
              </label>
              <input
                id="aaq-code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g., BCS001"
                className="aaq__input"
              />
            </div>

            <div className="aaq__field">
              <label htmlFor="aaq-aps" className="aaq__label">
                Min APS
              </label>
              <input
                id="aaq-aps"
                type="text"
                value={minAps}
                onChange={(e) => setMinAps(e.target.value)}
                placeholder="e.g., 34"
                className="aaq__input"
              />
            </div>
          </div>

          {/* Name */}
          <div className="aaq__field">
            <label htmlFor="aaq-name" className="aaq__label">
              Name *
            </label>
            <input
              id="aaq-name"
              type="text"
              value={qName}
              onChange={(e) => setQName(e.target.value)}
              placeholder="e.g., BSc Computer Science"
              className="aaq__input"
            />
          </div>

          {/* Endorsement + Duration */}
          <div className="aaq__row">
            <div className="aaq__field">
              <label htmlFor="aaq-endorse" className="aaq__label">
                Min Endorsement
              </label>
              <select
                id="aaq-endorse"
                value={minEndorsement}
                onChange={(e) => setMinEndorsement(e.target.value)}
                className="aaq__select"
              >
                <option value="">(optional)</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Diploma">Diploma</option>
                <option value="Higher Certificate">Higher Certificate</option>
              </select>
            </div>

            <div className="aaq__field">
              <label htmlFor="aaq-duration" className="aaq__label">
                Min Duration (years)
              </label>
              <input
                id="aaq-duration"
                type="text"
                value={minDuration}
                onChange={(e) => setMinDuration(e.target.value)}
                placeholder="e.g., 3"
                className="aaq__input"
              />
            </div>
          </div>

          {/* Prerequisites */}
          <div className="aaq__prereq-section">
            <div className="aaq__prereq-header">
              <div className="aaq__prereq-title">
                <BookOpen
                  size={16}
                  strokeWidth={2}
                  className="aaq__prereq-icon"
                />
                Prerequisites
              </div>
              <button
                type="button"
                className="aaq__add-btn"
                onClick={addPrereqRow}
              >
                <Plus size={15} strokeWidth={2.2} />
                Add
              </button>
            </div>

            <div className="aaq__prereq-list">
              {prereqs.map((p, idx) => {
                const currentKey = (p.name || "").trim().toLowerCase();
                const duplicate =
                  currentKey &&
                  (() => {
                    let count = 0;
                    prereqs.forEach((x) => {
                      if ((x.name || "").trim().toLowerCase() === currentKey)
                        count += 1;
                    });
                    return count > 1;
                  })();

                return (
                  <div key={p.id} className="aaq__prereq-row">
                    <div className="aaq__prereq-num">{idx + 1}</div>

                    <div className="aaq__prereq-field">
                      <label className="aaq__prereq-label">Subject *</label>
                      <select
                        value={p.name}
                        onChange={(e) =>
                          updatePrereq(p.id, { name: e.target.value })
                        }
                        className={`aaq__prereq-select ${duplicate ? "aaq__prereq-select--error" : ""}`}
                      >
                        <option value="">Select subject…</option>
                        {SUBJECT_OPTIONS.map((s) => {
                          const key = s.toLowerCase();
                          const alreadyUsed =
                            usedSubjects.has(key) && key !== currentKey;
                          return (
                            <option key={s} value={s} disabled={alreadyUsed}>
                              {s}
                              {alreadyUsed ? " (already added)" : ""}
                            </option>
                          );
                        })}
                      </select>
                      {duplicate && (
                        <span className="aaq__prereq-error">Duplicate</span>
                      )}
                    </div>

                    <div className="aaq__prereq-field aaq__prereq-field--mark">
                      <label className="aaq__prereq-label">Min Mark *</label>
                      <input
                        type="number"
                        value={p.min_mark}
                        onChange={(e) => {
                          const raw = e.target.value;
                          if (raw === "")
                            return updatePrereq(p.id, { min_mark: "" });
                          const n = clampMark(Number(raw));
                          updatePrereq(p.id, { min_mark: n });
                        }}
                        placeholder="0–100"
                        className="aaq__prereq-input"
                      />
                    </div>

                    <button
                      type="button"
                      className="aaq__prereq-delete"
                      onClick={() => removePrereqRow(p.id)}
                      disabled={prereqs.length === 1}
                      title={
                        prereqs.length === 1
                          ? "Keep at least one"
                          : "Remove prerequisite"
                      }
                    >
                      <Trash2 size={15} strokeWidth={2} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Error summary */}
          {formErrors.length > 0 && (
            <div className="aaq__errors">
              <div className="aaq__errors-header">
                <AlertCircle size={15} strokeWidth={2} />
                <span>Please fix the following</span>
              </div>
              <ul className="aaq__errors-list">
                {formErrors.slice(0, 6).map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
                {formErrors.length > 6 && (
                  <li>…and {formErrors.length - 6} more</li>
                )}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="aaq__actions">
            <button
              type="button"
              className="aaq__btn aaq__btn--ghost"
              onClick={handleReset}
            >
              <RotateCcw size={16} strokeWidth={2.2} />
              Reset
            </button>

            <button
              type="submit"
              className="aaq__btn aaq__btn--primary"
              disabled={!canSubmit}
            >
              <Save size={16} strokeWidth={2.2} />
              Save Qualification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
