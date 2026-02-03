import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Mail, Send, CheckCircle2, X, AlertCircle } from "lucide-react";
import AuthCard from "../components/layout/AuthCard";
import ".././styles/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side email validation
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const API_BASE = process.env.REACT_APP_API_BASE;

    try {
      const response = await axios.post(`${API_BASE}/api/auth/forgot-password`, {
        email,
      });

      console.log("Server response:", response.data);
      setSuccess(true);
    } catch (err) {
      console.error("Forgot password error:", err.response?.data || err.message);
      setError(
        err.response?.data?.error ||
          "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <AuthCard title="Check Your Email">
        <div className="fp__success">
          <div className="fp__success-icon">
            <CheckCircle2 size={48} strokeWidth={1.4} />
          </div>
          <h3 className="fp__success-title">Reset link sent!</h3>
          <p className="fp__success-text">
            We've sent a password reset link to <strong>{email}</strong>. Check
            your inbox and follow the instructions.
          </p>
          <Link to="/login" className="fp__success-btn">
            Back to Login
          </Link>
        </div>
      </AuthCard>
    );
  }

  // Form screen
  return (
    <AuthCard title="Forgot Password?">
      <form onSubmit={handleSubmit} className="fp-form">
        <p className="fp__hint">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {/* Error message */}
        {error && (
          <div className="fp__error">
            <div className="fp__error-header">
              <AlertCircle size={15} strokeWidth={2} className="fp__error-icon" />
              <span>{error}</span>
              <button
                type="button"
                className="fp__error-close"
                onClick={() => setError(null)}
                aria-label="Dismiss error"
              >
                <X size={13} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}

        {/* Email field */}
        <div className="fp__field">
          <label htmlFor="fp-email" className="fp__label">
            <Mail size={13} strokeWidth={2} className="fp__label-icon" />
            Email
          </label>
          <input
            id="fp-email"
            type="email"
            className="fp__input"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="fp__submit" disabled={loading}>
          {loading ? (
            <span className="fp__spinner" />
          ) : (
            <Send size={16} strokeWidth={2.2} />
          )}
          {loading ? "Sending…" : "Send Reset Link"}
        </button>

        {/* Back to login */}
        <p className="fp__footer">
          Remember your password?{" "}
          <Link to="/login" className="fp__footer-link">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}