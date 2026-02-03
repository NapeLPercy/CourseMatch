import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../../styles/AuthCard.css";

export default function AuthCard({ title, children }) {
  const navigate = useNavigate();

  return (
    <div className="auth">
      {/* Ambient background */}
      <div className="auth__bg" aria-hidden="true" />
      <div className="auth__geo auth__geo--1" aria-hidden="true" />
      <div className="auth__geo auth__geo--2" aria-hidden="true" />

      {/* Back button */}
      <button
        type="button"
        className="auth__back"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <ArrowLeft size={18} strokeWidth={2} />
        <span>Back</span>
      </button>

      {/* Card */}
      <div className="auth__card">
        <h1 className="auth__title">
          {title}
        </h1>
        <div className="auth__body">{children}</div>
      </div>
    </div>
  );
}