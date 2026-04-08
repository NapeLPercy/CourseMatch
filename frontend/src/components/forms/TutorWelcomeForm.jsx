import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import "../../styles/WelcomeOnboarding.css";
import SubmitError from "../ui/SubmitError";
import SubmitSuccess from "../ui/SubmitSuccess";

export default function TutorForm({
  onSubmitTutor,
  onBack,
  loading,
  success,
  error,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    yearsOfExperience: "",
    highestQualification: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required, minimum of 5 letters";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.yearsOfExperience.trim())
      newErrors.yearsOfExperience = "Experience is required";
    if (!formData.highestQualification.trim())
      newErrors.highestQualification = "Qualification is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    formData.role = "TUTOR";
    onSubmitTutor(formData );
  };

  return (
    <form className="welcome__form" onSubmit={handleSubmit}>
      <div className="welcome__form-header">
        <h3>Tutor Information</h3>
        <p>Help us connect you with learners</p>
      </div>

      <div className="welcome__field">
        <label htmlFor="tutor-name">Full Name *</label>
        <input
          id="tutor-name"
          type="text"
          value={formData.fullName}
          onChange={(e) => {
            setFormData({ ...formData, fullName: e.target.value });
            if (e.target.value.length >= 5)
              setErrors((prev) => ({ ...prev, fullName: "" }));
          }}
          placeholder="e.g., Dr. John Doe"
        />
        {errors.fullName && (
          <span className="welcome__error">{errors.fullName}</span>
        )}
      </div>
      <div className="welcome__field-row">
        <div className="welcome__field">
          <label htmlFor="tutor-gender">Gender *</label>
          <select
            id="tutor-gender"
            value={formData.gender}
            onChange={(e) => {
              setFormData({ ...formData, gender: e.target.value });
              setErrors((prev) => ({ ...prev, gender: "" }));
            }}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <span className="welcome__error">{errors.gender}</span>
          )}
        </div>

        <div className="welcome__field">
          <label htmlFor="tutor-experience">Years of Experience *</label>
          <input
            id="tutor-experience"
            type="text"
            value={formData.yearsOfExperience}
            onChange={(e) => {
              setFormData({ ...formData, yearsOfExperience: e.target.value });
              if (e.target.value.length > 0)
                setErrors((prev) => ({ ...prev, yearsOfExperience: "" }));
            }}
            placeholder="e.g., 5 years"
          />
          {errors.yearsOfExperience && (
            <span className="welcome__error">{errors.yearsOfExperience}</span>
          )}
        </div>
      </div>
      <div className="welcome__field">
        <label htmlFor="tutor-qualification">Highest Qualification *</label>
        <input
          id="tutor-qualification"
          type="text"
          value={formData.highestQualification}
          onChange={(e) => {
            setFormData({ ...formData, highestQualification: e.target.value });
            setErrors((prev) => ({ ...prev, highestQualification: "" }));
          }}
          placeholder="e.g., Bachelor of Education"
        />
        {errors.highestQualification && (
          <span className="welcome__error">{errors.highestQualification}</span>
        )}
      </div>

      {/* error and success */}
      <SubmitError error={error} />
      <SubmitSuccess success={success} />

      <div className="welcome__form-actions">
        <button
          type="button"
          className="welcome__btn welcome__btn--ghost"
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`welcome__btn welcome__btn--primary ${loading ? "loading" : ""}`}
        >
          {loading ? (
            <>
              <Loader2 className="spinner-icon" size={16} strokeWidth={2.5} />
              <span>Completing Setup...</span>
            </>
          ) : (
            <>
              <Check size={16} strokeWidth={2.5} />
              <span>Complete Setup</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
