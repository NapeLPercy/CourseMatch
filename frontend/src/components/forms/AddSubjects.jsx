import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Trash2,
  Send,
  X,
  AlertCircle,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import "../../styles/AddSubjects.css";
import { useSubjects } from "../../context/SubjectContext";
import { addStudentSubjects } from "../../services/subjectService";
import SubmitSuccess from "../ui/SubmitSuccess";
import ProgressBar from "../ui/ProgressBar";
import { validate } from "../../Utils/subjectsValidater";
import SubjectSelect from "../ui/SubjectSelect";

/*  Main  */
export default function AddSubjects() {
  const { addSubjects, getSubjects } = useSubjects();

  const [subjects, setSubjects] = useState([{ name: "", mark: "" }]);
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const subjectsData = getSubjects();
    if (subjectsData && subjectsData.length > 0) setSubjects(subjectsData);
  }, []);

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

    try {
      const { data } = await addStudentSubjects(payload);

      if (!data.success) {
        setErrors(["Subjects submission failed"]);
        return;
      }

      setSubmitted(true);
      addSubjects(data.subjects);
      setTimeout(() => {
        reset();
      }, 3000);
    } catch (err) {
      setErrors([err.response?.data?.error || "Submission failed. Try again."]);
    } finally {
      setLoading(false);
      setSubmitted(false);
    }
  };

  /* Reset after success */
  const reset = () => {
    setSubjects([{ name: "", mark: "" }]);
    setErrors([]);
    setSubmitted(false);
  };

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
              label: "Maths, Technical Math, or Maths Literacy",
              met: subjects.some(
                (s) =>
                  s.name === "Mathematics" ||
                  s.name === "Technical Mathematics" ||
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

      {/* Subject rows */}
      <div className="as__rows">
        {subjects.map((s, i) => {
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

      {/* SUBMIT ERROR*/}
      {submitted && <SubmitSuccess success="Aps successfuly computed" />}

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
