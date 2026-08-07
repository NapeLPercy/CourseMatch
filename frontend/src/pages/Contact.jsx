import { useState, useRef } from "react";
import {
  Mail,
  User,
  BookOpen,
  MessageSquare,
  Send,
  LoaderCircle,
  ChevronDown,
  Facebook,
  Phone,
  AtSign,
} from "lucide-react";
import "../styles/Contact.css";
import { sendEmail } from "../Utils/emailManager";
import { getCurrentDateTime } from "../Utils/datetime";
import SubmitError from "../components/ui/SubmitError";
import SubmitSuccess from "../components/ui/SubmitSuccess";
import SEO from "../components/ui/SEO";

const SOCIAL = [
  {
    icon: Facebook,
    label: "Facebook",
    handle: "CourseMatch",
    href: "https://web.facebook.com/profile.php?id=61572570570851",
    color: "blue",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    handle: "+27 68 274 8821",
    href: "https://wa.me/27682748821",
    color: "blue",
  },
  {
    icon: AtSign,
    label: "Email",
    handle: "lekoloanepercy007@gmail.com",
    href: "mailto:lekoloanepercy007@gmail.com",
    color: "blue",
  },
];

const REQUIRED = ["email", "enquiry", "message"];

function validate(fields) {
  const errs = {};
  if (!fields.email.trim()) {
    errs.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errs.email = "Please enter a valid email address.";
  }
  if (!fields.enquiry) errs.enquiry = "Please select an enquiry type.";
  if (!fields.message.trim()) errs.message = "Message is required.";
  if(fields.message.trim().length<=5) errs.message="Message should be more than 5 letters";
  return errs;
}

export default function Contact() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    enquiry: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...fields, [name]: value };
    setFields(updated);

    // live validation — clear error as soon as field is valid
    const errs = validate(updated);
    setErrors((prev) => ({
      ...prev,
      [name]: errs[name] || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setSubmitError("");
    setSuccess(false);

    try {
      await sendEmail({
        from_name: fields.name,
        from_email: fields.email,
        enquiry: fields.enquiry,
        message: fields.message,
        time: getCurrentDateTime(),
      });
      setSuccess(true);
      setFields({ name: "", email: "", enquiry: "", message: "" });
      setErrors({});
    } catch {
      setSubmitError("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldState = (name) => {
    if (errors[name]) return "ct__field--error";
    if (REQUIRED.includes(name) && fields[name]) return "ct__field--valid";
    return "";
  };

  return (
    <>
      <SEO
        title="Contact CourseMatch | Get Help & Support"
        description="Contact CourseMatch for support, feedback, or partnership inquiries. We're here to help South African students."
        url="https://coursematchapp.co.za/contact-us"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact CourseMatch",
          description:
            "Contact CourseMatch for support, feedback, or partnership inquiries.",
          url: "https://coursematchapp.co.za/contact-us",
        }}
      />

      <main className="ct">
        <div className="ct__inner">
          {/* ── LEFT — Form ── */}
          <div className="ct__left">
            <div className="ct__heading-wrap">
              <span className="ct__eyebrow">Contact us</span>
              <h1 className="ct__heading">We'd love to hear from you.</h1>
              <p className="ct__subheading">
                Have a question, found a bug, or want to partner with us? Drop
                us a message and we'll get back to you as soon as possible.
              </p>
            </div>

            <form className="ct__form" onSubmit={handleSubmit} noValidate>
              {/* Name — optional */}
              <div className={`ct__field ${fieldState("name")}`}>
                <label className="ct__label" htmlFor="name">
                  Full name
                  <span className="ct__optional">optional</span>
                </label>
                <div className="ct__input-wrap">
                  <User size={15} className="ct__input-icon" strokeWidth={2} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="ct__input"
                    placeholder="Your name"
                    value={fields.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email — required */}
              <div className={`ct__field ${fieldState("email")}`}>
                <label className="ct__label" htmlFor="email">
                  Email address
                  <span className="ct__req">*</span>
                </label>
                <div className="ct__input-wrap">
                  <Mail size={15} className="ct__input-icon" strokeWidth={2} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="ct__input"
                    placeholder="you@example.com"
                    value={fields.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="ct__error">{errors.email}</p>}
              </div>

              {/* Enquiry — required */}
              <div className={`ct__field ${fieldState("enquiry")}`}>
                <label className="ct__label" htmlFor="enquiry">
                  Enquiry type
                  <span className="ct__req">*</span>
                </label>
                <div className="ct__input-wrap ct__input-wrap--select">
                  <BookOpen
                    size={15}
                    className="ct__input-icon"
                    strokeWidth={2}
                  />
                  <select
                    id="enquiry"
                    name="enquiry"
                    className="ct__input ct__select"
                    value={fields.enquiry}
                    onChange={handleChange}
                  >
                    <option value="">Select an enquiry type…</option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Course Data Issue">Course Data Issue</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown
                    size={13}
                    className="ct__select-chevron"
                    strokeWidth={2.5}
                  />
                </div>
                {errors.enquiry && (
                  <p className="ct__error">{errors.enquiry}</p>
                )}
              </div>

              {/* Message — required */}
              <div className={`ct__field ${fieldState("message")}`}>
                <label className="ct__label" htmlFor="message">
                  Message
                  <span className="ct__req">*</span>
                </label>
                <div className="ct__input-wrap ct__input-wrap--textarea">
                  <MessageSquare
                    size={15}
                    className="ct__input-icon ct__input-icon--top"
                    strokeWidth={2}
                  />
                  <textarea
                    id="message"
                    name="message"
                    className="ct__input ct__textarea"
                    placeholder="Tell us how we can help…"
                    rows={5}
                    value={fields.message}
                    onChange={handleChange}
                  />
                </div>
                {errors.message && (
                  <p className="ct__error">{errors.message}</p>
                )}
              </div>

              {success && (
                <SubmitSuccess success="Message sent! We'll be in touch soon." />
              )}
              {submitError && <SubmitError error={submitError} />}

              <button type="submit" className="ct__submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle
                      size={16}
                      strokeWidth={2}
                      className="ct__spin"
                    />{" "}
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} strokeWidth={2.2} /> Send message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── RIGHT — Social cards ── */}
          <div className="ct__right">
            <p className="ct__right-label">Other ways to reach us</p>
            <div className="ct__socials">
              {SOCIAL.map(({ icon: Icon, label, handle, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ct__social ct__social--${color}`}
                >
                  <div className={`ct__social-icon ct__social-icon--${color}`}>
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div className="ct__social-text">
                    <span className="ct__social-label">{label}</span>
                    <span className="ct__social-handle">{handle}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Info block */}
            <div className="ct__info">
              <p className="ct__info-title">Response time</p>
              <p className="ct__info-desc">
                We typically respond within <strong>24–48 hours</strong> on
                weekdays. For urgent queries, reach out via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
