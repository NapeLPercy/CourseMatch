import React, { useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle2, X, AlertCircle } from "lucide-react";
import AuthCard from "../components/layout/AuthCard";
import ".././styles/ResetPassword.css";

export default function ResetPassword() {
  const { token } = useParams(); // e.g. route: /reset-password/:token
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error as user types
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!form.password.trim() || !form.confirmPassword.trim()) {
      setError("Both password fields are required.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const API_BASE = process.env.REACT_APP_API_BASE;

    try {
      const response = await axios.post(`${API_BASE}/api/auth/reset-password`, {
        token,
        password: form.password,
      });

      console.log("Server response:", response.data);
      setSuccess(true);
    } catch (err) {
      console.error("Reset password error:", err.response?.data || err.message);
      setError(
        err.response?.data?.error ||
          "Failed to reset password. Please try again or request a new reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <AuthCard title="Password Reset">
        <div className="rp__success">
          <div className="rp__success-icon">
            <CheckCircle2 size={48} strokeWidth={1.4} />
          </div>
          <h3 className="rp__success-title">All set!</h3>
          <p className="rp__success-text">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
          <Link to="/login" className="rp__success-btn">
            Go to Login
          </Link>
        </div>
      </AuthCard>
    );
  }

  // Form screen
  return (
    <AuthCard title="Reset Password">
      <form onSubmit={handleSubmit} className="rp-form">
        <p className="rp__hint">Enter your new password below.</p>

        {/* Error message */}
        {error && (
          <div className="rp__error">
            <div className="rp__error-header">
              <AlertCircle size={15} strokeWidth={2} className="rp__error-icon" />
              <span>{error}</span>
              <button
                type="button"
                className="rp__error-close"
                onClick={() => setError(null)}
                aria-label="Dismiss error"
              >
                <X size={13} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}

        {/* New Password */}
        <div className="rp__field">
          <label htmlFor="rp-password" className="rp__label">
            <Lock size={13} strokeWidth={2} className="rp__label-icon" />
            New Password
          </label>
          <div className="rp__input-wrap">
            <input
              id="rp-password"
              type={showPassword ? "text" : "password"}
              name="password"
              className="rp__input"
              placeholder="Enter new password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="rp__toggle"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="rp__field">
          <label htmlFor="rp-confirm" className="rp__label">
            <Lock size={13} strokeWidth={2} className="rp__label-icon" />
            Confirm Password
          </label>
          <div className="rp__input-wrap">
            <input
              id="rp-confirm"
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              className="rp__input"
              placeholder="Confirm new password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="rp__toggle"
              onClick={() => setShowConfirm((s) => !s)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="rp__submit" disabled={loading}>
          {loading ? (
            <span className="rp__spinner" />
          ) : (
            <CheckCircle2 size={16} strokeWidth={2.2} />
          )}
          {loading ? "Resetting…" : "Reset Password"}
        </button>

        {/* Back to login */}
        <p className="rp__footer">
          Remember your password?{" "}
          <Link to="/login" className="rp__footer-link">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}