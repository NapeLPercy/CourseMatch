import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  Building2,
  Globe,
  Hash,
  BookOpen,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import "../../styles/AdminAddUniversity.css";

/* ─── Main component ────────────────────────────────────────── */
export default function AdminAddUniversity() {
  // University fields
  const [abbreviation, setAbbreviation] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  // Faculties (dynamic list)
  const [faculties, setFaculties] = useState([{ id: uuidv4(), name: "" }]);

  // Add faculty row
  const addFacultyRow = () => {
    setFaculties((prev) => [...prev, { id: uuidv4(), name: "" }]);
  };

  // Remove faculty row
  const removeFacultyRow = (id) => {
    setFaculties((prev) => prev.filter((f) => f.id !== id));
  };

  // Update faculty name
  const updateFaculty = (id, newName) => {
    setFaculties((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: newName } : f)),
    );
  };

  // Validation
  const formErrors = useMemo(() => {
    const errs = [];

    if (!abbreviation.trim()) errs.push("University abbreviation is required.");
    if (!name.trim()) errs.push("University name is required.");

    // URL optional but validate format if provided
    if (url.trim()) {
      try {
        new URL(url);
      } catch {
        errs.push(
          "University URL must be a valid URL (e.g., https://example.com).",
        );
      }
    }

    // Faculties
    if (faculties.length === 0) {
      errs.push("Add at least 1 faculty.");
    } else {
      // Check for empty names
      faculties.forEach((f, i) => {
        if (!f.name.trim()) {
          errs.push(`Faculty #${i + 1}: name is required.`);
        }
      });

      // Check for duplicates
      const seen = new Set();
      faculties.forEach((f, i) => {
        const key = f.name.trim().toLowerCase();
        if (key && seen.has(key)) {
          errs.push(`Faculty #${i + 1}: duplicate name "${f.name}".`);
        }
        if (key) seen.add(key);
      });
    }

    return errs;
  }, [abbreviation, name, url, faculties]);

  const canSubmit = formErrors.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      abbreviation: abbreviation.trim(),
      name: name.trim(),
      url: url.trim() || null,
      faculties: faculties.map((f) => ({ name: f.name.trim() })),
    };

    const API_BASE = process.env.REACT_APP_API_BASE;
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log(payload);
    try {
      const res = await axios.post(
        `${API_BASE}/api/university/`,
        { university: payload }, // Data object as the second argument
        {
          // Config object as the third argument
          headers: {
            Authorization: `Bearer ${token}`, // Correct "Authorization" header name
          },
        },
      );
      console.log(res.data);

      if (res.data.success) {
        alert(res.data.message);
        handleReset();
      }
    } catch (err) {
      alert(err.message || "Failed to submit University data ");
    } finally {
    }
  };

  const handleReset = () => {
    setAbbreviation("");
    setName("");
    setUrl("");
    setFaculties([{ id: uuidv4(), name: "" }]);
  };

  /* ── Render ── */
  return (
    <div className="au">
      <form onSubmit={handleSubmit} className="au__card">
        <div className="au__card-header">
          <Building2 size={18} strokeWidth={2} className="au__card-icon" />
          <h2 className="au__card-title">University Details</h2>
        </div>

        {/* Abbreviation + Name */}
        <div className="au__row">
          <div className="au__field">
            <label htmlFor="au-abbrev" className="au__label">
              <Hash size={13} strokeWidth={2} className="au__label-icon" />
              Abbreviation *
            </label>
            <input
              id="au-abbrev"
              type="text"
              value={abbreviation}
              onChange={(e) => setAbbreviation(e.target.value)}
              placeholder="e.g., WITS"
              className="au__input"
            />
          </div>

          <div className="au__field">
            <label htmlFor="au-name" className="au__label">
              <Building2 size={13} strokeWidth={2} className="au__label-icon" />
              Name *
            </label>
            <input
              id="au-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., University of the Witwatersrand"
              className="au__input"
            />
          </div>
        </div>

        {/* URL */}
        <div className="au__field">
          <label htmlFor="au-url" className="au__label">
            <Globe size={13} strokeWidth={2} className="au__label-icon" />
            Website URL
          </label>
          <input
            id="au-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://www.wits.ac.za"
            className="au__input"
          />
        </div>

        {/* Faculties */}
        <div className="au__faculties">
          <div className="au__faculties-header">
            <div className="au__faculties-title">
              <BookOpen
                size={16}
                strokeWidth={2}
                className="au__faculties-icon"
              />
              Faculties
            </div>
            <button
              type="button"
              className="au__add-btn"
              onClick={addFacultyRow}
            >
              <Plus size={15} strokeWidth={2.2} />
              Add Faculty
            </button>
          </div>

          <div className="au__faculty-list">
            {faculties.map((f, idx) => (
              <div key={f.id} className="au__faculty-row">
                <div className="au__faculty-num">{idx + 1}</div>

                <div className="au__faculty-field">
                  <label className="au__faculty-label">Faculty Name *</label>
                  <input
                    type="text"
                    value={f.name}
                    onChange={(e) => updateFaculty(f.id, e.target.value)}
                    placeholder="e.g., Faculty of Science"
                    className="au__faculty-input"
                  />
                </div>

                <button
                  type="button"
                  className="au__faculty-delete"
                  onClick={() => removeFacultyRow(f.id)}
                  disabled={faculties.length === 1}
                  title={
                    faculties.length === 1
                      ? "Keep at least one"
                      : "Remove faculty"
                  }
                >
                  <Trash2 size={15} strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Error summary */}
        {formErrors.length > 0 && (
          <div className="au__errors">
            <div className="au__errors-header">
              <AlertCircle size={15} strokeWidth={2} />
              <span>Please fix the following</span>
            </div>
            <ul className="au__errors-list">
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
        <div className="au__actions">
          <button
            type="button"
            className="au__btn au__btn--ghost"
            onClick={handleReset}
          >
            <RotateCcw size={16} strokeWidth={2.2} />
            Reset
          </button>

          <button
            type="submit"
            className="au__btn au__btn--primary"
            disabled={!canSubmit}
          >
            <Save size={16} strokeWidth={2.2} />
            Save University
          </button>
        </div>
      </form>
    </div>
  );
}
