import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Award,
  Target,
  Heart,
  Briefcase,
  BookOpen,
  ThumbsDown,
  Sparkles,
  Users,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import "../../styles/AddMyProfile.css";
import { addCompleteStudentInfo } from "../../services/studentService";

/*  Validation schema */
const schema = yup.object().shape({
  strengths: yup
    .string()
    .required("Tell us at least one strength")
    .min(3, "Strength must be at least 3 characters")
    .max(200, "Strength must be less than 200 characters"),
  weaknesses: yup
    .string()
    .required("Tell us a weakness")
    .min(3, "Weakness must be at least 3 characters")
    .max(200, "Weakness must be less than 200 characters"),
  goals: yup
    .string()
    .required("This field is required")
    .min(3, "Goals must be at least 3 characters"),
  aspiration: yup.string().min(3, "Aspiration must be at least 3 characters"),
  preferredEnvironment: yup.string().required("Select an option"),
  hobbies: yup
    .string()
    .required("Please list at least one hobby or interest")
    .min(3, "Hobbies must be at least 3 characters"),
  dreamJob: yup.string().min(3, "Dream job must be at least 3 characters"),
  enjoyedSubjects: yup
    .string()
    .required("This field is required")
    .min(3, "Please name at least one subject"),
  dislikedSubjects: yup
    .string()
    .required("This field is required")
    .min(3, "Please name at least one subject"),

  problemSolvingApproach: yup
    .string()
    .required("Select your problem-solving approach"),

  workStyle: yup.string().required("Select your preferred work style"),
});

/*  Main component */
export default function AddMyProfile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  //add profile data
  const onSubmit = async (profileData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { data } = await addCompleteStudentInfo(profileData);

      if (!data.success) {
        setError("Failed to submit profile. Please try again.");
        return;
      }

      setSuccess("Profile saved successfully");
    } catch (err) {
      setError("Failed to submit profile. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setError(null);
        setSuccess(null);
      }, 1000);
    }
  };

  return (
    <div className="spf">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="spf__form">
        {/* ── Section 1: Strengths & Goals ── */}
        <div className="spf__section">
          <h2 className="spf__section-title">Strengths & Goals</h2>

          <div className="spf__field">
            <label htmlFor="spf-strengths" className="spf__label">
              <Award size={14} strokeWidth={2} className="spf__label-icon" />
              What are your strengths? *
            </label>
            <textarea
              id="spf-strengths"
              {...register("strengths")}
              placeholder="e.g., Good at explaining things, patient, analytical thinking…"
              className={`spf__textarea ${errors.strengths ? "spf__input--error" : ""}`}
              rows={3}
            />
            {errors.strengths && (
              <span className="spf__error">
                <AlertCircle size={12} strokeWidth={2} />
                {errors.strengths.message}
              </span>
            )}
          </div>

          <div className="spf__field">
            <label htmlFor="spf-weaknesses" className="spf__label">
              <Target size={14} strokeWidth={2} className="spf__label-icon" />
              What do you want to improve? *
            </label>
            <textarea
              id="spf-weaknesses"
              {...register("weaknesses")}
              placeholder="e.g., Public speaking, time management, difficulty staying focused…"
              className={`spf__textarea ${errors.weaknesses ? "spf__input--error" : ""}`}
              rows={3}
            />
            {errors.weaknesses && (
              <span className="spf__error">
                <AlertCircle size={12} strokeWidth={2} />
                {errors.weaknesses.message}
              </span>
            )}
          </div>

          <div className="spf__field">
            <label htmlFor="spf-goals" className="spf__label">
              <Briefcase
                size={14}
                strokeWidth={2}
                className="spf__label-icon"
              />
              Career goals (short or long term) *
            </label>
            <textarea
              id="spf-goals"
              {...register("goals")}
              placeholder="Explain your career goals"
              className={`spf__textarea ${errors.goals ? "spf__input--error" : ""}`}
              rows={3}
            />
            {errors.goals && (
              <span className="spf__error">
                <AlertCircle size={12} strokeWidth={2} />
                {errors.goals.message}
              </span>
            )}
          </div>

          <div className="spf__field">
            <label htmlFor="spf-aspiration" className="spf__label">
              <Heart size={14} strokeWidth={2} className="spf__label-icon" />
              Aspirations or dream paths *
            </label>
            <textarea
              id="spf-aspiration"
              {...register("aspiration")}
              placeholder="e.g., I want to help people, make a difference in technology…"
              className={`spf__textarea ${errors.aspiration ? "spf__input--error" : ""}`}
              rows={2}
            />
            {errors.aspiration && (
              <span className="spf__error">
                <AlertCircle size={12} strokeWidth={2} />
                {errors.aspiration.message}
              </span>
            )}
          </div>

          <div className="spf__field">
            <label htmlFor="spf-dreamjob" className="spf__label">
              <Sparkles size={14} strokeWidth={2} className="spf__label-icon" />
              Dream Job *
            </label>
            <input
              id="spf-dreamjob"
              type="text"
              {...register("dreamJob")}
              placeholder="e.g., Software Engineer, Nurse, Attorney…"
              className={`spf__input ${errors.dreamJob ? "spf__input--error" : ""}`}
            />
            {errors.dreamJob && (
              <span className="spf__error">
                <AlertCircle size={12} strokeWidth={2} />
                {errors.dreamJob.message}
              </span>
            )}
          </div>
        </div>

        {/* ── Section 3: Learning Preferences ── */}
        <div className="spf__section">
          <h2 className="spf__section-title">Learning Preferences</h2>

          <div className="spf__field">
            <label htmlFor="spf-env" className="spf__label">
              <BookOpen size={14} strokeWidth={2} className="spf__label-icon" />
              Preferred learning environment *
            </label>
            <select
              id="spf-env"
              {...register("preferredEnvironment")}
              className={`spf__select ${errors.preferredEnvironment ? "spf__input--error" : ""}`}
            >
              <option value="">Select one</option>
              <option value="practical">Practical / hands-on</option>
              <option value="theory">Theory-focused</option>
              <option value="balanced">Balanced</option>
              <option value="self-paced">Self-paced / independent</option>
              <option value="group">Group / team-based</option>
            </select>
            {errors.preferredEnvironment && (
              <span className="spf__error">
                <AlertCircle size={12} strokeWidth={2} />
                {errors.preferredEnvironment.message}
              </span>
            )}
          </div>

          <div className="spf__row">
            <div className="spf__field">
              <label htmlFor="spf-enjoyed" className="spf__label">
                <BookOpen
                  size={14}
                  strokeWidth={2}
                  className="spf__label-icon"
                />
                Subjects you enjoy *
              </label>
              <input
                id="spf-enjoyed"
                type="text"
                {...register("enjoyedSubjects")}
                placeholder="e.g., Life Sciences, CAT, History…"
                className={`spf__input ${errors.enjoyedSubjects ? "spf__input--error" : ""}`}
              />
              {errors.enjoyedSubjects && (
                <span className="spf__error">
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.enjoyedSubjects.message}
                </span>
              )}
            </div>

            <div className="spf__field">
              <label htmlFor="spf-disliked" className="spf__label">
                <ThumbsDown
                  size={14}
                  strokeWidth={2}
                  className="spf__label-icon"
                />
                Subjects you dislike *
              </label>
              <input
                id="spf-disliked"
                type="text"
                {...register("dislikedSubjects")}
                placeholder="e.g., Mathematics, Geography…"
                className={`spf__input ${errors.dislikedSubjects ? "spf__input--error" : ""}`}
              />
              {errors.dislikedSubjects && (
                <span className="spf__error">
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.dislikedSubjects.message}
                </span>
              )}
            </div>
          </div>

          <div className="spf__field">
            <label htmlFor="spf-hobbies" className="spf__label">
              <Heart size={14} strokeWidth={2} className="spf__label-icon" />
              Hobbies / Interests *
            </label>
            <textarea
              id="spf-hobbies"
              {...register("hobbies")}
              placeholder="e.g., Gaming, photography, sports, music…"
              className={`spf__textarea ${errors.hobbies ? "spf__input--error" : ""}`}
              rows={2}
            />
            {errors.hobbies && (
              <span className="spf__error">
                <AlertCircle size={12} strokeWidth={2} />
                {errors.hobbies.message}
              </span>
            )}
          </div>
        </div>

        {/* ── Section 4: Work & Problem-Solving Style (NEW) ── */}
        <div className="spf__section">
          <h2 className="spf__section-title">Work & Problem-Solving Style</h2>

          <div className="spf__row">
            <div className="spf__field">
              <label htmlFor="spf-workstyle" className="spf__label">
                <Users size={14} strokeWidth={2} className="spf__label-icon" />
                Preferred work style *
              </label>
              <select
                id="spf-workstyle"
                {...register("workStyle")}
                className={`spf__select ${errors.workStyle ? "spf__input--error" : ""}`}
              >
                <option value="">Select one</option>
                <option value="independent">Independent / solo work</option>
                <option value="collaborative">Collaborative / team work</option>
                <option value="flexible">Flexible / both</option>
              </select>
              {errors.workStyle && (
                <span className="spf__error">
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.workStyle.message}
                </span>
              )}
            </div>

            <div className="spf__field">
              <label htmlFor="spf-problemsolving" className="spf__label">
                <Lightbulb
                  size={14}
                  strokeWidth={2}
                  className="spf__label-icon"
                />
                Problem-solving approach *
              </label>
              <select
                id="spf-problemsolving"
                {...register("problemSolvingApproach")}
                className={`spf__select ${errors.problemSolvingApproach ? "spf__input--error" : ""}`}
              >
                <option value="">Select one</option>
                <option value="creative">Creative / innovative</option>
                <option value="analytical">Analytical / logical</option>
                <option value="balanced">Balanced approach</option>
              </select>
              {errors.problemSolvingApproach && (
                <span className="spf__error">
                  <AlertCircle size={12} strokeWidth={2} />
                  {errors.problemSolvingApproach.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Messages ── */}
        {success && (
          <div className="spf__message spf__message--success">{success}</div>
        )}

        {error && (
          <div className="spf__message spf__message--error">{error}</div>
        )}

        {/* ── Submit ── */}
        <button type="submit" className="spf__submit" disabled={loading}>
          {loading ? (
            <>
              <span className="spf__spinner" />
              Submitting…
            </>
          ) : (
            <>
              <Sparkles size={16} strokeWidth={2.2} />
              Submit Profile
            </>
          )}
        </button>
      </form>
    </div>
  );
}
