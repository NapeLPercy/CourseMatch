import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchX, Home, ArrowLeft } from "lucide-react";
import ".././styles/NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="nf">
      {/* Ambient background */}
      <div className="nf__bg" aria-hidden="true" />
      <div className="nf__geo nf__geo--1" aria-hidden="true" />
      <div className="nf__geo nf__geo--2" aria-hidden="true" />

      {/* Content */}
      <div className="nf__content">
        {/* Icon */}
        <div className="nf__icon">
          <SearchX size={72} strokeWidth={1.3} />
        </div>

        {/* 404 */}
        <h1 className="nf__code">404</h1>

        {/* Headline */}
        <h2 className="nf__title">Page Not Found</h2>

        {/* Body text */}
        <p className="nf__text">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        {/* Actions */}
        <div className="nf__actions">
          <Link to="/" className="nf__btn nf__btn--primary">
            <Home size={16} strokeWidth={2.2} />
            <span>Go Home</span>
          </Link>
          <button
            type="button"
            className="nf__btn nf__btn--ghost"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} strokeWidth={2.2} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}