import { useState } from "react";
import {
  Mail,
  ShieldCheck,
  UserPlus,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";
import SubmitSuccess from "../ui/SubmitSuccess";
import SubmitError from "../ui/SubmitError";
import "../../styles/AddUser.css";
import { addUserAccount } from "../../services/accountService";

const roles = [
  { value: "ADMIN", label: "Admin" },
  { value: "WRITER", label: "Writer" },
  { value: "STUDENT", label: "Student" },
  { value: "PARENT", label: "Parent" },
  { value: "TUTOR", label: "Tutor" },
  { value: "COUNSELLOR", label: "Counsellor" },
];

const EMPTY = { email: "", role: "" };

function validate(fields) {
  const errors = {};
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.role) errors.role = "Please select a role.";
  return errors;
}

export default function AddUser({ onAdd }) {
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  function change(key) {
    return (e) => {
      setFields((p) => ({ ...p, [key]: e.target.value }));
      if (errors[key])
        setErrors((p) => {
          const n = { ...p };
          delete n[key];
          return n;
        });
      setSuccess(null);
      setError(null);
    };
  }

  function handleReset() {
    setFields(EMPTY);
    setErrors({});
    setSuccess(null);
    setError(null);
  }

  async function handleSubmit() {
    if (loading) return;
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      // replace with your actual API call
      const { data } = await addUserAccount({
        email: fields.email,
        role: fields.role,
      });

      setSuccess(`${fields.email} has been added as ${fields.role}.`);
      setFields(EMPTY);
    } catch (err) {
      setError(err?.message || "Failed to add user. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  }

  return (
    <div className="au">
      {/* Email */}
      <div className={`au__field ${errors.email ? "au__field--error" : ""}`}>
        <label className="au__label" htmlFor="au-email">
          <Mail size={13} strokeWidth={2} />
          Email address <span className="au__required">*</span>
        </label>
        <input
          id="au-email"
          type="text"
          className="au__input"
          placeholder="user@email.com"
          value={fields.email}
          onChange={change("email")}
          autoComplete="off"
          disabled={loading}
        />
        {errors.email && <span className="au__error">{errors.email}</span>}
      </div>

      {/* Role */}
      <div className={`au__field ${errors.role ? "au__field--error" : ""}`}>
        <label className="au__label" htmlFor="au-role">
          <ShieldCheck size={13} strokeWidth={2} />
          Role <span className="au__required">*</span>
        </label>
        <select
          id="au-role"
          className="au__input au__select"
          value={fields.role}
          onChange={change("role")}
          disabled={loading}
        >
          <option value="">Select a role…</option>
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        {errors.role && <span className="au__error">{errors.role}</span>}
      </div>

      {/* Feedback */}
      {success && <SubmitSuccess success={success} />}
      {error && <SubmitError error={error} />}

      {/* Actions */}
      <div className="au__actions">
        <button
          className="au__btn au__btn--primary"
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle size={15} strokeWidth={2.2} className="au__spinner" />
          ) : (
            <UserPlus size={15} strokeWidth={2.2} />
          )}
          {loading ? "Adding…" : "Add User"}
        </button>

        <button
          className="au__btn au__btn--ghost"
          type="button"
          onClick={handleReset}
          disabled={loading}
        >
          <RotateCcw size={14} strokeWidth={2.2} />
          Reset
        </button>
      </div>
    </div>
  );
}
