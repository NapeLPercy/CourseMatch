import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import AuthCard from "../components/layout/AuthCard";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { verifyAccount } from "../services/accountService";

export default function VerifyAccount() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    verifyUserEmail();
  }, []);

  const verifyUserEmail = async () => {
    // No token in URL
    if (!token) {
      setError("Invalid verification link.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await verifyAccount(token);

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Verification failed.");
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Something went wrong while verifying your account.",
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  // Success screen
  if (success) {
    return (
      <AuthCard title="Account Verification">
        <div className="rpp__success">
          <div className="rp__success-icon">
            <CheckCircle2 size={48} strokeWidth={1.4} />
          </div>
          <h3 className="rp__success-title">All set!</h3>
          <p className="rp__success-text">
            Your account has been verified successfully. You can now sign in and
            explore CourseMatch.
          </p>
          <Link to="/login" className="rp__success-btn">
            Go to Login
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Account Verification">
      <div>
        {/* Loader */}
        {loading && (
          <div className="va_loader">
            <div className="va_loader-spinner"></div>
            <p className="va_loader-text">Verifying email...</p>
          </div>
        )}

        {/* Error message */}
        {!loading && error && (
          <div className="rp__error">
            <div className="rp__error-header">
              <AlertCircle
                size={15}
                strokeWidth={2}
                className="rp__error-icon"
              />
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>
    </AuthCard>
  );
}
