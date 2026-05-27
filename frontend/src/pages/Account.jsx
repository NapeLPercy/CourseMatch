import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import AuthCard from "../components/layout/AuthCard";
import ".././styles/Account.css";
import { validatePassword } from "../Utils/passwordManager";
import { register } from "../services/accountService";
import SubmitSuccess from "../components/ui/SubmitSuccess";

export default function Account() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

    setLoading(true);

    try {
      const { data } = await register(form);
      if (!data.success) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }
      setSuccess("Registration successful, check your email to verify your account");
      setTimeout(() => {
        setSuccess(null);
       // navigate("/login");
      }, 10000);
    } catch (err) {
      setError("Registration failed. Please try again.");
      clearAfterDelay(setError);
    } finally {
      setLoading(false);
      clearAfterDelay(setError);
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

      {success && <SubmitSuccess success={success}/>}

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

        {/*CREATE ACCOUNT DISCLAIMER */}
        <p
          style={{
            fontSize: "0.85rem",
            color: "#475569",
            textAlign: "center",
            marginTop: "0px",
          }}
        >
          By creating an account, you accept our{" "}
          <a
            href="/terms-and-conditions"
            style={{
              color: "#2563eb",
              fontWeight: "600",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.borderBottomColor = "#2563eb")}
            onMouseLeave={(e) =>
              (e.target.style.borderBottomColor = "transparent")
            }
          >
            Terms and Conditions
          </a>
        </p>
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
