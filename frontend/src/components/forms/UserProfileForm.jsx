import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../styles/UserProfileForm.css"; // <-- your custom css

// Validation schema
const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Name must at leats be 3 characters"),
  age: yup
    .number()
    .typeError("Enter a valid age")
    .min(16, "Minimum age is 16")
    .max(60, "Maximum age is 60"),
  strengths: yup
    .string()
    .required("Tell us at least one strength")
    .min(3, "Strength must at least be 3 characters")
    .max(100, "Strength must be 100 less than characters"),
  weaknesses: yup
    .string()
    .required("Tell us a weakness")
    .min(3, "Weakness must at leats be 3 characters")
    .max(100, "Weakness must be 100 less than characters"),
  goals: yup
    .string()
    .required("This field is required")
    .min(3, "Goals must at leats be 3 characters"),
  aspiration: yup.string(),
  preferredEnvironment: yup.string().required("Select an option"),
  hobbies: yup
    .string()
    .required("Please list at least one hobby or interest")
    .min(3, "Hobbies must be at least 3 characters"),

  dreamJob: yup
    .string()
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .min(3, "Dream job must be at least 3 characters"),

  enjoyedSubjects: yup
    .string()
    .required("This field is required")
    .min(3, "Please name at least one subject"),

  dislikedSubjects: yup
    .string()
    .required("This field is required")
    .min(3, "Please name at least one subject"),
});

export default function StudentProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleProfileSubmit = (data) => {};

  const onSubmit = (data) => {
    console.log("PROFILE:", data);
    handleProfileSubmit(data);
  };

  return (
    <div className="form-wrapper">
      <h2>Student Profile</h2>
      <p>We’ll use this to match you with the best possible courses.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full name */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            {...register("fullName")}
            placeholder="e.g John Doe"
          />
          {errors.fullName && (
            <span className="error-msg">{errors.fullName.message}</span>
          )}
        </div>

        {/* Age */}
        <div className="form-group">
          <label>Age</label>
          <input type="number" {...register("age")} placeholder="e.g 19" />
          {errors.age && (
            <span className="error-msg">{errors.age.message}</span>
          )}
        </div>

        {/* Strengths */}
        <div className="form-group">
          <label>What are your strengths?</label>
          <textarea
            {...register("strengths")}
            placeholder="e.g Good at explaining things, patient, analytical thinking…"
          />
          {errors.strengths && (
            <span className="error-msg">{errors.strengths.message}</span>
          )}
        </div>

        {/* Weaknesses */}
        <div className="form-group">
          <label>What is something you want to improve?</label>
          <textarea
            {...register("weaknesses")}
            placeholder="e.g Public speaking, time management, difficulty staying focused…"
          />
          {errors.weaknesses && (
            <span className="error-msg">{errors.weaknesses.message}</span>
          )}
        </div>

        {/* Career Goals */}
        <div className="form-group">
          <label>Career goals (short or long term)</label>
          <textarea
            {...register("goals")}
            placeholder="Explain your career goals"
          />
          {errors.goals && (
            <span className="error-msg">{errors.goals.message}</span>
          )}
        </div>

        {/* Aspirations */}
        <div className="form-group">
          <label>Any aspirations or dream paths?</label>
          <textarea
            {...register("aspiration")}
            placeholder="e.g I want to help people."
          />
        </div>

        {/* Preferred Learning Environment */}
        <div className="form-group">
          <label>Preferred learning environment</label>
          <select {...register("preferredEnvironment")}>
            <option value="">Select one</option>
            <option value="practical">Practical / hands-on</option>
            <option value="theory">Theory-focused</option>
            <option value="balanced">Balanced</option>
            <option value="self-paced">Self-paced/independent</option>
            <option value="group">Group / team-based</option>
          </select>
          {errors.preferredEnvironment && (
            <span className="error-msg">
              {errors.preferredEnvironment.message}
            </span>
          )}
        </div>

        {/* Dream Job (optional) */}
        <div className="form-group">
          <label>Dream Job</label>
          <input
            {...register("dreamJob")}
            className="form-group"
            placeholder="Software Engineer, Nurse, Attorney..."
          />

          {errors.dreamJob && (
            <span className="error-msg">{errors.dreamJob.message}</span>
          )}
        </div>

        {/* Subjects They Enjoy */}
        <div className="form-group">
          <label>Subjects You Enjoy *</label>
          <input
            {...register("enjoyedSubjects")}
            className="form-group"
            placeholder="Life Sciences, CAT, History..."
          />

          {errors.enjoyedSubjects && (
            <span className="error-msg">{errors.enjoyedSubjects.message}</span>
          )}
        </div>

        {/* Subjects They Dislike */}
        <div className="form-group">
          <label>Subjects You Dislike *</label>
          <input
            {...register("dislikedSubjects")}
            className="form-group"
            placeholder="Mathematics, Geography..."
          />
          {errors.dislikedSubjects && (
            <span className="error-msg">{errors.dislikedSubjects.message}</span>
          )}
        </div>

        {/* Hobbies & Interests */}
        <div className="form-group">
          <label>Hobbies / Interests *</label>
          <textarea
            {...register("hobbies")}
            className="form-group"
            placeholder="Gaming, photography, sports, music..."
          />

          {errors.hobbies && (
            <span className="error-msg">{errors.hobbies.message}</span>
          )}
        </div>

        <button className="submit-btn" type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
}
