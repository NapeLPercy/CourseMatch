import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";
import AuthCard from "../components/layout/AuthCard";
import { useAuth } from "../context/AuthContext";
import ".././styles/Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_BASE = process.env.REACT_APP_API_BASE;

    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, form);
      const user = response.data.user;
      const student = user.student;

      if (student) {
        sessionStorage.setItem("student", JSON.stringify(student));
      }

      setSuccess("Login successful!");
      login(user);

      setTimeout(() => {
        navigate("/my-dashboard");
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Login failed: " + err.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Welcome Back">
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

      <form onSubmit={handleSubmit} className="login-form">
        {/* Email */}
        <div className="login__field">
          <label htmlFor="login-email" className="login__label">
            <Mail size={13} strokeWidth={2} className="login__label-icon" />
            Email
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            className="login__input"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="login__field">
          <label htmlFor="login-password" className="login__label">
            <Lock size={13} strokeWidth={2} className="login__label-icon" />
            Password
          </label>
          <div className="login__input-wrap">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              className="login__input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login__toggle"
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

        {/* Forgot password link */}
        <Link to="/forgot-password" className="login__forgot">
          Forgot password?
        </Link>

        {/* Submit */}
        <button type="submit" className="login__submit" disabled={loading}>
          {loading ? (
            <span className="login__spinner" />
          ) : (
            <LogIn size={16} strokeWidth={2.2} />
          )}
          {loading ? "Signing in…" : "Sign In"}
        </button>

        {/* Register link */}
        <p className="login__footer">
          Don't have an account?{" "}
          <Link to="/register" className="login__footer-link">
            Create one
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
