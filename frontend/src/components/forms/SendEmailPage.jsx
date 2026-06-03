import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Mail,
  User,
  ChevronLeft,
  Link,
  Image,
  X,
  Send,
  Calendar,
  Clock,
} from "lucide-react";
import { sendEmail } from "../../services/emailService";
import SubmitSuccess from "../ui/SubmitSuccess";
import SubmitError from "../ui/SubmitError";
import StatusPill from "../ui/StatusPill";
import { formatTimestamp } from "../../Utils/datetime";
import axios from "axios";
import "../../styles/SendEmailPage.css";

export default function SendEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [linkText, setLinkText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("to", user.email);
    formData.append("subject", subject);
    formData.append("message", message);
    if (link) formData.append("link", link);
    if (linkText) formData.append("linkText", linkText);
    if (selectedImage) formData.append("coursematchImage", selectedImage);

    try {

      await sendEmail(formData); /*axios.post("/api/messages/send", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });*/
      setSuccess(true);
      setSubject("");
      setMessage("");
      setLink("");
      setLinkText("");
      removeImage();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send email. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="se">
        <p className="se__no-user">No user selected.</p>
      </div>
    );

  return (
    <div className="se">
      {/* Back */}
      <button className="se__back" onClick={() => navigate(-1)}>
        <ChevronLeft size={16} strokeWidth={2.5} />
        Back
      </button>

      {/* User info card */}
      <div className="se__user-card">
        <div className="se__user-avatar">
          <User size={22} strokeWidth={1.8} />
        </div>
        <div className="se__user-body">
          <div className="se__user-top">
            <p className="se__user-email">{user.email}</p>
            <div className="se__user-pills">
              <StatusPill value={user.hasSubjects} label="Subjects" />
              <StatusPill value={user.hasProfile} label="Profile" />
            </div>
          </div>
          <div className="se__user-meta">
            <span className="se__meta-item">
              <Calendar size={12} strokeWidth={2} />
              Joined {formatTimestamp(user.created_at)}
            </span>
            <span className="se__meta-item">
              <Clock size={12} strokeWidth={2} />
              Last login {formatTimestamp(user.last_login)}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="se__form" onSubmit={handleSubmit}>
        <div className="se__form-head">
          <div className="se__form-icon">
            <Mail size={20} strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="se__form-title">Send email</h2>
            <p className="se__form-to">
              To: <strong>{user.email}</strong>
            </p>
          </div>
        </div>

        {/* Subject — required */}
        <div className="se__field">
          <label className="se__label">
            Subject <span className="se__required">*</span>
          </label>
          <input
            className="se__input"
            type="text"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        {/* Message — required */}
        <div className="se__field">
          <label className="se__label">
            Message <span className="se__required">*</span>
          </label>
          <textarea
            className="se__textarea"
            placeholder="Write your message here…"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Link — optional */}
        <div className="se__field-row">
          <div className="se__field">
            <label className="se__label">
              <Link size={13} strokeWidth={2} /> Link URL
              <span className="se__optional">optional</span>
            </label>
            <input
              className="se__input"
              type="url"
              placeholder="https://…"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="se__field">
            <label className="se__label">
              Link text
              <span className="se__optional">optional</span>
            </label>
            <input
              className="se__input"
              type="text"
              placeholder="e.g. View your results"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
            />
          </div>
        </div>

        {/* Image — optional */}
        <div className="se__field">
          <label className="se__label">
            <Image size={13} strokeWidth={2} /> Attach image
            <span className="se__optional">optional</span>
          </label>
          <div
            className="se__image-drop"
            onClick={() => fileRef.current?.click()}
          >
            {imagePreview ? (
              <div className="se__image-preview-wrap">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="se__image-preview"
                />
                <button
                  type="button"
                  className="se__image-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                >
                  <X size={13} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <div className="se__image-placeholder">
                <Image
                  size={22}
                  strokeWidth={1.5}
                  className="se__image-ph-icon"
                />
                <p>Click to upload an image</p>
                <span>PNG, JPG, WEBP</span>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="se__file-input"
            onChange={handleImageChange}
          />
        </div>

        {/* Feedback */}
        {success && <SubmitSuccess success="Email sent successfully!" />}
        {error && <SubmitError error={error} />}

        {/* Submit */}
        <button
          type="submit"
          className="se__submit"
          disabled={loading || !subject.trim() || !message.trim()}
        >
          {loading ? (
            <span className="se__spinner" />
          ) : (
            <Send size={16} strokeWidth={2.2} />
          )}
          {loading ? "Sending…" : "Send email"}
        </button>
      </form>
    </div>
  );
}
