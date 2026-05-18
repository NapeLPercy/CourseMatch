import { useState } from "react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { personalityQuestions } from "../../Utils/textData/personalityQuestions";
import { addCompleteStudentInfo } from "../../services/studentService";
import SubmitSuccess from "../ui/SubmitSuccess";
import SubmitError from "../ui/SubmitError";
import "../../styles/AddMyProfile.css";

const TOTAL = personalityQuestions.length;

const initialAnswers = personalityQuestions.reduce((acc, q) => {
  acc[q.name] = "";
  return acc;
}, {});

export default function PersonalityProfileWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const current = personalityQuestions[step];
  const isLast = step === TOTAL - 1;
  const progress = (step / TOTAL) * 100;

  const handleChange = (val) => {
    setAnswers((prev) => ({ ...prev, [current.name]: val }));
    if (error) setError("");
  };

  const validate = () => {
    const val = answers[current.name];
    if (!val || val.toString().trim() === "") {
      setError("This field is required.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validate()) return;
    setError("");
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setSubmitError("");
    try {
      const { data } = await addCompleteStudentInfo(answers);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setAnswers(initialAnswers);
        setStep(0);
      }, 3000);
    } catch (err) {
      setSubmitError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ppw">
      {/* Intro */}
      <p className="ppw__intro">
        Enter your personality profile so that our AI can recommend the best
        courses for you based on your unique strengths, interests, and goals.
      </p>

      {/* Progress */}
      <div className="ppw__progress">
        <div className="ppw__progress-track">
          <div
            className="ppw__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="ppw__progress-label">
          {step}
          <span className="ppw__progress-sep">/</span>
          {TOTAL}
        </span>
      </div>

      {/* Question card */}
      <div className="ppw__card" key={step}>
        <div className="ppw__step-badge">
          Question {step + 1} of {TOTAL}
        </div>
        <label className="ppw__label">{current.label}</label>

        {/* Textarea */}
        {current.type === "textarea" && (
          <div className="ppw__field-wrap">
            <textarea
              className={`ppw__textarea ${error ? "ppw__textarea--error" : ""}`}
              placeholder={current.placeholder}
              maxLength={current.maxLength}
              value={answers[current.name]}
              onChange={(e) => handleChange(e.target.value)}
              rows={4}
            />
            <span className="ppw__char-count">
              {answers[current.name].length}/{current.maxLength}
            </span>
          </div>
        )}

        {/* Select */}
        {current.type === "select" && (
          <div className="ppw__options">
            {current.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`ppw__option ${answers[current.name] === opt.value ? "ppw__option--active" : ""}`}
                onClick={() => handleChange(opt.value)}
              >
                {opt.label}
                {answers[current.name] === opt.value && (
                  <span className="ppw__option-check">✓</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Inline error */}
        {error && <p className="ppw__error">{error}</p>}
      </div>

      {/* Success / Submit error */}
      {success && <SubmitSuccess success="Profile submitted successfully!" />}
      {submitError && <SubmitError error={submitError} />}

      {/* Actions */}
      <div className="ppw__actions">
        <button
          type="button"
          className="ppw__back-btn"
          onClick={handleBack}
          disabled={step === 0}
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          Back
        </button>

        {isLast ? (
          <button
            type="button"
            className="ppw__submit-btn"
            onClick={handleSubmit}
            disabled={loading || !answers[current.name]}
          >
            {loading ? (
              <span className="ppw__spinner" />
            ) : (
              <Send size={15} strokeWidth={2.2} />
            )}
            {loading ? "Submitting…" : "Submit Profile"}
          </button>
        ) : (
          <button type="button" className="ppw__next-btn" onClick={handleNext}>
            Next
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}
