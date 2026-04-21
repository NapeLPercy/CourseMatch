import { useState, useRef, useEffect } from "react";
import {
  Mail,
  User,
  BookOpen,
  MessageSquare,
  Send,
  LoaderCircle,
  ChevronDown,
  X,
  Search,
} from "lucide-react";
import "./Contact.css";
import { sendEmail } from "../Utils/emailManager";
import { universitiesList } from "../Utils/universities";
import { getCurrentDateTime } from "../Utils/datetime";
import SubmitError from "../components/ui/SubmitError";
import SubmitSuccess from "../components/ui/SubmitSuccess";

/* ─── Validation ────────────────────────────────────────────── */
function validate(fields) {
  const errors = {};
  //if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "That doesn't look like a valid email address.";
  }
  if (!fields.enquiry.trim()) errors.enquiry = "Please select an enquiry type.";
  if (!fields.message.trim()) errors.message = "Please enter a message.";
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
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Auto-focus search when opened
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const filtered = universitiesList.filter((u) =>
    u.toLowerCase().includes(query.toLowerCase()),
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
        <span
          className={`cf__select-value ${!value ? "cf__select-value--placeholder" : ""}`}
        >
          {value || "Search for a university…"}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`cf__select-chevron ${open ? "cf__select-chevron--open" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="cf__select-panel" role="listbox">
          {/* Search input */}
          <div className="cf__select-search">
            <Search
              size={15}
              strokeWidth={2}
              className="cf__select-search-icon"
            />
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
    email: "",
    university: "",
    enquiry: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [shakeField, setShakeField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setMounted(true);
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const change = (key) => (e) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    // Clear error for this field as user types
    if (errors[key])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[key];
        return n;
      });
  };

  const triggerShake = (fieldName) => {
    setShakeField(fieldName);
    setTimeout(() => setShakeField(null), 500);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setSubmitError(null);
    setSubmitted(false);

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
      const response = await sendEmail({
        from_name: fields.name,
        from_email: fields.email,
        university: fields.university || "Not specified",
        enquiry: fields.enquiry,
        message: fields.message,
        time: getCurrentDateTime(),
      });
      console.log("reply from emailjs", response);
      setSubmitted(true);
      setFields({
        name: "",
        email: "",
        university: "",
        message: "",
        enquiry: "",
      });
    } catch (error) {
      setSubmitError("Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitted(false);
      }, 10000);
    }
  };

  /* ── Form screen ── */
  return (
    <section
      ref={sectionRef}
      className={`contact ${mounted ? "contact--mounted" : ""}`}
    >
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
            We'd love to
            <br />
            <span className="contact__title-accent">hear from you.</span>
          </h2>
          <p className="contact__subtitle">
            Have a question, suggestion, or just want to say hi? Fill in the
            form below. Only the university field is required.
          </p>
        </div>
        <div className="contact__form">
          {/* Name — single field */}
          <FieldWrapper error={errors.name}>
            <label className="cf__label" htmlFor="cf-name">
              <User size={13} strokeWidth={2} className="cf__label-icon" />
              Full Name <span className="cf__required"></span>
            </label>
            <input
              id="cf-name"
              type="text"
              className={`cf__input ${shakeField === "name" ? "cf__input--shake" : ""}`}
              placeholder="First and last name"
              value={fields.name}
              onChange={change("name")}
              autoComplete="name"
            />
          </FieldWrapper>

          {/* Email — now required */}
          <FieldWrapper error={errors.email}>
            <label className="cf__label" htmlFor="cf-email">
              <Mail size={13} strokeWidth={2} className="cf__label-icon" />
              Email <span className="cf__required">*</span>
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

          {/* Enquiry type — required, plain select */}
          <FieldWrapper error={errors.enquiry}>
            <label className="cf__label" htmlFor="cf-enquiry">
              <MessageSquare
                size={13}
                strokeWidth={2}
                className="cf__label-icon"
              />
              Enquiry Type <span className="cf__required">*</span>
            </label>
            <select
              id="cf-enquiry"
              className={`cf__input cf__input--select ${shakeField === "enquiry" ? "cf__input--shake" : ""}`}
              value={fields.enquiry}
              onChange={change("enquiry")}
            >
              <option value="">Select an enquiry type…</option>
              <option value="General Enquiry">General Enquiry</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Course Data Issue">Course Data Issue</option>
              <option value="Partnership">Partnership</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Other">Other</option>
            </select>
          </FieldWrapper>

          {/* University — now optional, no searchable dropdown */}
          <FieldWrapper error={errors.university}>
            <label className="cf__label" htmlFor="cf-university">
              <BookOpen size={13} strokeWidth={2} className="cf__label-icon" />
              University{" "}
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-gray)",
                  fontWeight: 400,
                }}
              >
                (optional)
              </span>
            </label>
            <div
              className={
                shakeField === "university"
                  ? "cf__shake-wrap cf__shake-wrap--shake"
                  : "cf__shake-wrap"
              }
            >
              <UniversitySelect
                value={fields.university}
                onChange={(val) => {
                  setFields((prev) => ({ ...prev, university: val }));
                  if (errors.university)
                    setErrors((prev) => {
                      const n = { ...prev };
                      delete n.university;
                      return n;
                    });
                }}
                error={!!errors.university}
              />
            </div>
          </FieldWrapper>

          {/* Message — now required */}
          <FieldWrapper error={errors.message}>
            <label className="cf__label" htmlFor="cf-message">
              <MessageSquare
                size={13}
                strokeWidth={2}
                className="cf__label-icon"
              />
              Message <span className="cf__required">*</span>
            </label>
            <textarea
              id="cf-message"
              className={`cf__input cf__input--textarea ${shakeField === "message" ? "cf__input--shake" : ""}`}
              placeholder="Tell us what's on your mind…"
              rows={4}
              value={fields.message}
              onChange={change("message")}
            />
          </FieldWrapper>

          {/* Submit Error or Success*/}
          {submitError && <SubmitError error={submitError} />}
          {submitted && (
            <SubmitSuccess
              success="Message sent! 
            Thanks for reaching out. We'll get back to you shortly."
            />
          )}
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
              <LoaderCircle
                size={16}
                strokeWidth={2.2}
                className="cf__spinner"
              />
            ) : (
              <Send size={16} strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
