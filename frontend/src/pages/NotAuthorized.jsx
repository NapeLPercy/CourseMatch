import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldX, ArrowLeft, Home } from "lucide-react";
import "./../styles/NotAuthorized.css";

export default function NotAuthorized() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // Get user role from sessionStorage and navigate to appropriate home
    const role = JSON.parse(sessionStorage.getItem("role")); // Adjust based on your auth setup

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "STUDENT") {
      navigate("/my-dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="na">
      {/* Background decorations */}
      <div className="na__bg">
        <div className="na__bg-mesh" />
        <div className="na__bg-circle na__bg-circle--1" />
        <div className="na__bg-circle na__bg-circle--2" />
      </div>

      {/* Content */}
      <div className="na__content">
        <div className="na__icon-wrap">
          <ShieldX size={72} strokeWidth={1.4} className="na__icon" />
        </div>

        <div className="na__text-wrap">
          <h1 className="na__code">403</h1>
          <h2 className="na__title">Access Denied</h2>
          <p className="na__message">
            You don't have permission to view this page. This area is restricted
            to authorized users only.
          </p>
        </div>

        <div className="na__actions">
          <button
            className="na__btn na__btn--ghost"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} strokeWidth={2.2} />
            Go Back
          </button>

          <button className="na__btn na__btn--primary" onClick={handleGoHome}>
            <Home size={16} strokeWidth={2.2} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
