import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  User,
  BookOpen,
  MessageSquare,
  Send,
  LoaderCircle,
  CheckCircle2,
  ChevronDown,
  X,
  Search,
} from "lucide-react";
import "./Contact.css";
import { sendEmail } from "../Utils/emailManager";
import { universitiesList } from "../Utils/universities";
import { getCurrentDateTime } from "../Utils/datetime";

/* ─── SA Universities list ──────────────────────────────────── */

/* ─── Validation ────────────────────────────────────────────── */
function validate(fields) {
  const errors = {};
  // University is the ONLY required field
  if (!fields.university.trim()) {
    errors.university = "Please select a university — this is required.";
  }
  // Email: only validate format IF the user typed something
  if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "That doesn't look like a valid email address.";
  }
  return errors;
}

/* ─── Reusable input wrapper ────────────────────────────────── */
function FieldWrapper({ error, children }) {
  return (
    <div className={`cf__field ${error ? "cf__field--error" : ""}`}>
      {children}
      {error && (
        <span className="cf__error" role="alert">
          <X size={13} strokeWidth={2.5} className="cf__error-icon" />
          {error}
        </span>
      )}
    </div>
  );
}

/* ─── Searchable university dropdown ────────────────────────── */
function UniversitySelect({ value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Auto-focus search when opened
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const filtered = universitiesList.filter((u) =>
    u.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={wrapRef} className="cf__select-wrap">
      {/* Trigger button */}
      <button
        type="button"
        className={`cf__select-trigger ${error ? "cf__select-trigger--error" : ""} ${open ? "cf__select-trigger--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <BookOpen size={18} strokeWidth={1.8} className="cf__select-icon" />
        <span className={`cf__select-value ${!value ? "cf__select-value--placeholder" : ""}`}>
          {value || "Search for a university…"}
        </span>
        <ChevronDown size={16} strokeWidth={2} className={`cf__select-chevron ${open ? "cf__select-chevron--open" : ""}`} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="cf__select-panel" role="listbox">
          {/* Search input */}
          <div className="cf__select-search">
            <Search size={15} strokeWidth={2} className="cf__select-search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="cf__select-search-input"
              placeholder="Type to filter…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Options */}
          <ul className="cf__select-list">
            {filtered.length > 0 ? (
              filtered.map((uni) => (
                <li
                  key={uni}
                  className={`cf__select-option ${uni === value ? "cf__select-option--active" : ""}`}
                  role="option"
                  aria-selected={uni === value}
                  onClick={() => {
                    onChange(uni);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  {uni}
                </li>
              ))
            ) : (
              <li className="cf__select-empty">No results match "{query}"</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export default function Contact() {
  const [fields, setFields] = useState({
    name: "",
    surname: "",
    email: "",
    university: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [shakeField, setShakeField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setMounted(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const change = (key) => (e) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    // Clear error for this field as user types
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const triggerShake = (fieldName) => {
    setShakeField(fieldName);
    setTimeout(() => setShakeField(null), 500);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const errs = validate(fields);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      // Shake the first errored field
      const firstErr = Object.keys(errs)[0];
      triggerShake(firstErr);
      return;
    }

    setIsSubmitting(true);
    try {
      await sendEmail({
        from_name: fields.name,
        from_surname: fields.surname,
        from_email: fields.email,
        university: fields.university,
        message: fields.message,
        time: getCurrentDateTime(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to send contact email:", error);
      setErrors({
        message: "Failed to send your message. Please try again.",
      });
      triggerShake("message");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <section ref={sectionRef} className={`contact ${mounted ? "contact--mounted" : ""}`}>
        <div className="contact__glow" aria-hidden="true" />
        <div className="contact__success">
          <div className="contact__success-icon">
            <CheckCircle2 size={48} strokeWidth={1.4} />
          </div>
          <h2 className="contact__success-title">Message sent!</h2>
          <p className="contact__success-text">
            Thanks for reaching out. We'll get back to you shortly.
          </p>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFields({ name: "", surname: "", email: "", university: "", message: "" });
              window.scrollBy(0,20);
            }}
          >
            Send another
          </button>
        </div>
      </section>
    );
  }

  /* ── Form screen ── */
  return (
    <section ref={sectionRef} className={`contact ${mounted ? "contact--mounted" : ""}`}>
      <div className="contact__glow" aria-hidden="true" />
      <div className="contact__geo contact__geo--1" aria-hidden="true" />
      <div className="contact__geo contact__geo--2" aria-hidden="true" />

      <div className="contact__inner">
        {/* Header */}
        <div className="contact__header">
          <div className="contact__icon-wrap">
            <Mail size={24} strokeWidth={1.6} />
          </div>
          <span className="contact__eyebrow">Get in touch</span>
          <h2 className="contact__title">
            We'd love to<br />
            <span className="contact__title-accent">hear from you.</span>
          </h2>
          <p className="contact__subtitle">
            Have a question, suggestion, or just want to say hi? Fill in the form below.
            Only the university field is required.
          </p>
        </div>

        {/* Form */}
        <div className="contact__form">
          {/* Row: Name + Surname */}
          <div className="cf__row">
            <FieldWrapper error={errors.name}>
              <label className="cf__label" htmlFor="cf-name">
                <User size={13} strokeWidth={2} className="cf__label-icon" />
                Name
              </label>
              <input
                id="cf-name"
                type="text"
                className={`cf__input ${shakeField === "name" ? "cf__input--shake" : ""}`}
                placeholder="First name"
                value={fields.name}
                onChange={change("name")}
                autoComplete="given-name"
              />
            </FieldWrapper>

            <FieldWrapper error={errors.surname}>
              <label className="cf__label" htmlFor="cf-surname">
                <User size={13} strokeWidth={2} className="cf__label-icon" />
                Surname
              </label>
              <input
                id="cf-surname"
                type="text"
                className={`cf__input ${shakeField === "surname" ? "cf__input--shake" : ""}`}
                placeholder="Last name"
                value={fields.surname}
                onChange={change("surname")}
                autoComplete="family-name"
              />
            </FieldWrapper>
          </div>

          {/* Email */}
          <FieldWrapper error={errors.email}>
            <label className="cf__label" htmlFor="cf-email">
              <Mail size={13} strokeWidth={2} className="cf__label-icon" />
              Email
            </label>
            <input
              id="cf-email"
              type="text"
              className={`cf__input ${shakeField === "email" ? "cf__input--shake" : ""}`}
              placeholder="you@email.com"
              value={fields.email}
              onChange={change("email")}
              autoComplete="email"
            />
          </FieldWrapper>

          {/* University (required) */}
          <FieldWrapper error={errors.university}>
            <label className="cf__label">
              <BookOpen size={13} strokeWidth={2} className="cf__label-icon" />
              Desired University <span className="cf__required">*</span>
            </label>
            <div className={shakeField === "university" ? "cf__shake-wrap cf__shake-wrap--shake" : "cf__shake-wrap"}>
              <UniversitySelect
                value={fields.university}
                onChange={(val) => {
                  setFields((prev) => ({ ...prev, university: val }));
                  if (errors.university) setErrors((prev) => { const n = { ...prev }; delete n.university; return n; });
                }}
                error={!!errors.university}
              />
            </div>
          </FieldWrapper>

          {/* Message */}
          <FieldWrapper error={errors.message}>
            <label className="cf__label" htmlFor="cf-message">
              <MessageSquare size={13} strokeWidth={2} className="cf__label-icon" />
              Message
            </label>
            <textarea
              id="cf-message"
              className={`cf__input cf__input--textarea ${shakeField === "message" ? "cf__input--shake" : ""}`}
              placeholder="Tell us what's on your mind…"
              rows={4}
              value={fields.message}
              onChange={change("message")}
              resize="none"
            />
          </FieldWrapper>

          {/* Submit */}
          <button
            className="btn btn--primary"
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            {isSubmitting ? (
              <LoaderCircle size={16} strokeWidth={2.2} className="cf__spinner" />
            ) : (
              <Send size={16} strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
