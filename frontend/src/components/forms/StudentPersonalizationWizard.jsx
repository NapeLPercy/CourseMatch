import { useState } from "react";
import {
  BrainCog,
  ChevronLeft,
  ChevronRight,
  Send,
  GraduationCap,
} from "lucide-react";
import { addCompleteStudentInfo } from "../../services/studentService";
import SubmitSuccess from "../ui/SubmitSuccess";
import SubmitError from "../ui/SubmitError";
import PageHeader from "../ui/PageHeader";
import "../../styles/AddMyProfile.css";
import ActionPrompt from "../data-display/ActionPrompt";
import { MultiSelect } from "./PersonalityFiles/MultiSelect";
import { PairedSubjects } from "./PersonalityFiles/PairedSubjects";
import { SubjectSelect } from "./PersonalityFiles/SubjectSelect";
import { SingleSelect } from "./PersonalityFiles/SingleSelect";

/* ── Main component ─────────────────────── */
export default function PersonalityProfileWizard({
  steps,
  questions,
  icon,
  title,
  subtitle,
  mutation,
}) {
  const initialAnswers = questions.reduce((acc, q) => {
    acc[q.name] = q.type === "single" ? "" : [];
    return acc;
  }, {});

  const [step, setStep] = useState(0);
  const currentStep = steps[step]; //tracks the curent step
  const total = steps.length;
  const isLast = step === total - 1;
  const progress = (step / total) * 100;

  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [aiFeaturesPrompt, setAiFeaturesPrompt] = useState(false);

  const handleChange = (name, val) => {
    setAnswers((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};
    for (const q of currentStep.questions) {
      const val = answers[q.name];
      if (q.type === "single") {
        if (!val || val.trim() === "") {
          newErrors[q.name] = "Please select an option.";
        }
      } else {
        const arr = Array.isArray(val) ? val : [];
        if (arr.length < q.minAnswers) {
          newErrors[q.name] =
            `Select at least ${q.minAnswers} option${q.minAnswers > 1 ? "s" : ""}.`;
        }
        if (arr.length > q.maxAnswers) {
          newErrors[q.name] =
            `Select no more than ${q.maxAnswers} option${q.maxAnswers > 1 ? "s" : ""}.`;
        }
      }
    }
    // Cross-validate enjoyed vs disliked subjects
    if (currentStep.paired) {
      const enjoyed = Array.isArray(answers.enjoyedSubjects)
        ? answers.enjoyedSubjects
        : [];
      const disliked = Array.isArray(answers.dislikedSubjects)
        ? answers.dislikedSubjects
        : [];
      const overlap = enjoyed.filter((s) => disliked.includes(s));

      if (overlap.length > 0) {
        newErrors.enjoyedSubjects = `You can't like and dislike the same subject: ${overlap.join(", ")}`;
        // newErrors.dislikedSubjects = " "; // triggers red border without duplicate message
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    setSubmitError("");

    const payload = Object.fromEntries(
      Object.entries(answers).map(([key, val]) => [
        key,
        Array.isArray(val) ? val.join(" and ") : val,
      ]),
    );

    mutation.mutate(payload, {
      onSuccess: () => {
        setSuccess(true);
        sessionStorage.removeItem("student_dashboard");
        setTimeout(() => {
          setSuccess(false);
          setAnswers(initialAnswers);
          setStep(0);
        }, 3000);
      },
      onError: (err) => {
        if (err?.response?.status === 409) {
          setSubmitError("You already submitted your data.");
          setTimeout(() => {
            setAiFeaturesPrompt(true);
          }, 2000);
          return;
        } else {
          setSubmitError("Submission failed. Please try again.");
        }
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  const q = currentStep.questions[0];

  return (
    <div className="amp">
      <PageHeader icon={icon} title={title} subtitle={subtitle} />
      {aiFeaturesPrompt ? (
        <ActionPrompt
          icon={GraduationCap}
          title="Profile submitted!"
          subtitle="You can now access personalized AI-driven course recommendations, compare qualifications side-by-side, and explore different careers."
          btnText="View University courses"
          navigateTo="/view-courses"
        />
      ) : (
        <>
          {/* Progress */}
          <div className="amp__progress">
            <div className="amp__progress-track">
              <div
                className="amp__progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="amp__progress-label">
              {step + 1} <span className="amp__progress-sep">/</span> {total}
            </span>
          </div>

          {/* Card */}
          <div className="amp__card" key={step}>
            {!currentStep.paired && (
              <>
                <span className="amp__step-badge">
                  Question {step + 1} of {total}
                </span>
                <h2 className="amp__question">{q.label}</h2>
                {q.helperText && <p className="amp__helper">{q.helperText}</p>}

                {(q.type === "multiple" || q.type === "subjects") && (
                  <p className="amp__counter">
                    {Array.isArray(answers[q.name])
                      ? answers[q.name].length
                      : 0}{" "}
                    / {q.maxAnswers} selected
                  </p>
                )}

                {q.type === "multiple" && (
                  <MultiSelect
                    question={q}
                    value={answers[q.name]}
                    onChange={(val) => handleChange(q.name, val)}
                  />
                )}

                {q.type === "single" && (
                  <SingleSelect
                    question={q}
                    value={answers[q.name]}
                    onChange={(val) => handleChange(q.name, val)}
                  />
                )}

                {q.type === "subjects" && (
                  <SubjectSelect
                    question={q}
                    value={answers[q.name]}
                    onChange={(val) => handleChange(q.name, val)}
                  />
                )}

                {errors[q.name] && (
                  <p className="amp__error">{errors[q.name]}</p>
                )}
              </>
            )}

            {currentStep.paired && (
              <>
                <span className="amp__step-badge">
                  Question {step + 1} of {total}
                </span>
                <h2 className="amp__question">Your subject preferences</h2>
                <PairedSubjects
                  questions={currentStep.questions}
                  answers={answers}
                  onChange={handleChange}
                />
                {currentStep.questions.map((pq) =>
                  errors[pq.name] ? (
                    <p key={pq.name} className="amp__error">
                      {errors[pq.name]}
                    </p>
                  ) : null,
                )}
              </>
            )}
          </div>

          {success && (
            <SubmitSuccess success="Profile submitted successfully!" />
          )}
          {submitError && <SubmitError error={submitError} />}

          {/* Actions */}
          <div className="amp__actions">
            <button
              type="button"
              className="amp__btn amp__btn--back"
              onClick={handleBack}
              disabled={step === 0}
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
              Back
            </button>

            {isLast ? (
              <button
                type="button"
                className="amp__btn amp__btn--submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="amp__spinner" />
                ) : (
                  <Send size={15} strokeWidth={2.2} />
                )}
                {loading ? "Submitting…" : "Submit Profile"}
              </button>
            ) : (
              <button
                type="button"
                className="amp__btn amp__btn--next"
                onClick={handleNext}
              >
                Next
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
