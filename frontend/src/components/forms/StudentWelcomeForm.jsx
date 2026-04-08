import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import "../../styles/WelcomeOnboarding.css";
import SubmitError from "../ui/SubmitError";
import SubmitSuccess from "../ui/SubmitSuccess";

export default function StudentForm({
  onSubmitStudent,
  onBack,
  loading,
  success,
  error,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    grade: "",
    age: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required, minimum of 5 letters";
    if (!formData.grade) newErrors.grade = "Grade is required";
    if (!formData.age) newErrors.age = "Age is required, minimum age is 13";
    if (!formData.gender) newErrors.gender = "Gender is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    formData.role = "STUDENT";
    onSubmitStudent(formData);
  };

  return (
    <form className="welcome__form" onSubmit={handleSubmit}>
      <div className="welcome__form-header">
        <h3>Student Information</h3>
        <p>Help us personalize your course recommendations</p>
      </div>

      <div className="welcome__field">
        <label htmlFor="student-name">Full Name *</label>
        <input
          id="student-name"
          type="text"
          value={formData.fullName}
          onChange={(e) => {
            setFormData({ ...formData, fullName: e.target.value });
            if (e.target.value.length >= 5)
              setErrors((prev) => ({ ...prev, fullName: "" }));
          }}
          placeholder="e.g., Thabo Molefe"
        />
        {errors.fullName && (
          <span className="welcome__error">{errors.fullName}</span>
        )}
      </div>

      <div className="welcome__field-row">
        <div className="welcome__field">
          <label htmlFor="student-grade">Grade *</label>
          <select
            id="student-grade"
            value={formData.grade}
            onChange={(e) => {
              setFormData({ ...formData, grade: e.target.value });
              setErrors((prev) => ({ ...prev, grade: "" }));
            }}
          >
            <option value="">Select grade</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
            <option value="Metriculated">Metriculated</option>
          </select>
          {errors.grade && (
            <span className="welcome__error">{errors.grade}</span>
          )}
        </div>

        <div className="welcome__field">
          <label htmlFor="student-age">Age *</label>
          <input
            id="student-age"
            type="number"
            value={formData.age}
            onChange={(e) => {
              setFormData({ ...formData, age: e.target.value });

              if (e.target.value >= 13)
                setErrors((prev) => ({ ...prev, age: "" }));
            }}
            placeholder="e.g., 17"
            min="13"
            max="40"
          />
          {errors.age && <span className="welcome__error">{errors.age}</span>}
        </div>
      </div>

      <div className="welcome__field">
        <label htmlFor="student-gender">Gender *</label>
        <select
          id="student-gender"
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
