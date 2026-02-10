import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";
import AuthCard from "../components/layout/AuthCard";
import ".././styles/Account.css";
import { validatePassword } from "../Utils/passwordManager";

export default function Account() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //
  const clearAfterDelay = (setter, ms = 3000) => {
    setTimeout(() => setter(null), ms);
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setSuccess(null);

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setError(passwordError);
      setTimeout(() => setError(null), 6000);
      return;
    }

    const API_BASE = process.env.REACT_APP_API_BASE;
    if (!API_BASE) {
      setError("Configuration error: API base URL is missing.");
      clearAfterDelay(setError);
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_BASE}/api/auth/register`, form);
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => {
        setSuccess(null);
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(
        err.response?.data?.error || "Registration failed. Please try again.",
      );
      clearAfterDelay(setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create Account">
      {error && (
        <div className="rp__error">
          <div className="rp__error-header">
            <AlertCircle size={15} strokeWidth={2} className="rp__error-icon" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="rp__success">
          <div className="rp__success-icon">
            <CheckCircle2 size={48} strokeWidth={1.4} />
          </div>
          <p className="rp__success-text">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form">
        {/* Email */}
        <div className="register__field">
          <label htmlFor="register-email" className="register__label">
            <Mail size={13} strokeWidth={2} className="register__label-icon" />
            Email
          </label>
          <input
            id="register-email"
            type="email"
            name="email"
            className="register__input"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="register__field">
          <label htmlFor="register-password" className="register__label">
            <Lock size={13} strokeWidth={2} className="register__label-icon" />
            Password
          </label>
          <div className="register__input-wrap">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              name="password"
              className="register__input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="register__toggle"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={16} strokeWidth={2} />
              ) : (
                <Eye size={16} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="register__submit" disabled={loading}>
          {loading ? (
            <span className="register__spinner" />
          ) : (
            <UserPlus size={16} strokeWidth={2.2} />
          )}
          {loading ? "Creating account…" : "Create Account"}
        </button>

        {/* Login link */}
        <p className="register__footer">
          Already have an account?{" "}
          <Link to="/login" className="register__footer-link">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
