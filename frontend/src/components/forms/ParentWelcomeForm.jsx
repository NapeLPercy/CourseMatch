import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import "../../styles/WelcomeOnboarding.css";
import SubmitError from "../ui/SubmitError";
import SubmitSuccess from "../ui/SubmitSuccess";

export default function ParentForm({
  onSubmitParent,
  onBack,
  loading,
  success,
  error,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    relationshipToStudent: "",
    purpose: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    if (loading) return;

    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required, minimum of 5 letters";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.relationshipToStudent)
      newErrors.relationshipToStudent = "Relationship is required";
    if (!formData.purpose) newErrors.purpose = "Purpose is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    formData.role="PARENT";
    onSubmitParent(formData );
  };

  return (
    <form className="welcome__form" onSubmit={handleSubmit}>
      <div className="welcome__form-header">
        <h3>Parent/Guardian Information</h3>
        <p>Help us support your child's academic journey</p>
      </div>

      <div className="welcome__field">
        <label htmlFor="parent-name">Full Name *</label>
        <input
          id="parent-name"
          type="text"
          value={formData.fullName}
          onChange={(e) => {
            setFormData({ ...formData, fullName: e.target.value });
            if (e.target.value.length >= 5)
              setErrors((prev) => ({ ...prev, fullName: "" }));
          }}
          placeholder="e.g., Sarah Molefe"
        />
        {errors.fullName && (
          <span className="welcome__error">{errors.fullName}</span>
        )}
      </div>

      <div className="welcome__field-row">
        <div className="welcome__field">
          <label htmlFor="parent-gender">Gender *</label>
          <select
            id="parent-gender"
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
          <label htmlFor="parent-relationship">Relationship *</label>
          <select
            id="parent-relationship"
            value={formData.relationshipToStudent}
            onChange={(e) => {
              setFormData({
                ...formData,
                relationshipToStudent: e.target.value,
              });

              setErrors((prev) => ({ ...prev, relationshipToStudent: "" }));
            }}
          >
            <option value="">Select relationship</option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Guardian">Guardian</option>
            <option value="Other">Other</option>
          </select>
          {errors.relationshipToStudent && (
            <span className="welcome__error">
              {errors.relationshipToStudent}
            </span>
          )}
        </div>
      </div>

      <div className="welcome__field">
        <label htmlFor="parent-purpose">Purpose *</label>
        <select
          id="parent-purpose"
          value={formData.purpose}
          onChange={(e) => {
            setFormData({ ...formData, purpose: e.target.value });
            setErrors((prev) => ({ ...prev, purpose: "" }));
          }}
        >
          <option value="">Select purpose</option>
          <option value="Follow student matched courses">
            Follow student matched courses
          </option>
          <option value="Track progress">Track progress</option>
          <option value="Monitor application status">
            Monitor application status
          </option>
          <option value="Provide guidance">Provide guidance</option>
        </select>
        {errors.purpose && (
          <span className="welcome__error">{errors.purpose}</span>
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
