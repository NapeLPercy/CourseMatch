import React, { useState } from "react";
import { FileText, Upload, X, FilePlus } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import SubmitSuccess from "../ui/SubmitSuccess";
import SubmitError from "../ui/SubmitError";
import { universitiesData } from "../../Utils/textData/universityProspectus";
import { addProspectus } from "../../services/prospectusService";
import "../../styles/AddProspectus.css";

export default function AddProspectus() {
  const [universityCode, setUniversityCode] = useState("");
  const [file, setFile]                     = useState(null);
  const [errors, setErrors]                 = useState({});
  const [loading, setLoading]               = useState(false);
  const [success, setSuccess]               = useState(false);
  const [submitError, setSubmitError]       = useState("");

  const fileRef = React.useRef(null);

  const selectedUni = universitiesData.find((u) => u.id === universityCode);
  const title = selectedUni ? `${selectedUni.name} Prospectus` : "";

  const handleFileChange = (e) => {
    const picked = e.target.files[0];
    if (!picked) return;
    if (picked.type !== "application/pdf") {
      setErrors((prev) => ({ ...prev, file: "Only PDF files are accepted." }));
      return;
    }
    setFile(picked);
    setErrors((prev) => ({ ...prev, file: null }));
  };

  const removeFile = () => {
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const validate = () => {
    const newErrors = {};
    if (!universityCode) newErrors.university = "Please select a university.";
    if (!file)           newErrors.file       = "Please upload a PDF file.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess(false);
    setSubmitError("");

    const formData = new FormData();
    formData.append("universityCode", universityCode);
    formData.append("title", title);
    formData.append("file", file);

    try {
      await addProspectus(formData);
      setSuccess(true);
      setUniversityCode("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Failed to upload prospectus. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ap">
      <PageHeader
        icon={FilePlus}
        title="Add prospectus"
        subtitle="Upload a university prospectus PDF to make it available for students to download."
      />

      <form className="ap__form" onSubmit={handleSubmit}>

        {/* University select */}
        <div className="ap__field">
          <label className="ap__label">
            University <span className="ap__required">*</span>
          </label>
          <div className="ap__select-wrap">
            <select
              className={`ap__select ${errors.university ? "ap__select--error" : ""}`}
              value={universityCode}
              onChange={(e) => {
                setUniversityCode(e.target.value);
                setErrors((prev) => ({ ...prev, university: null }));
              }}
            >
              <option value="">Select a university…</option>
              {universitiesData.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
          {errors.university && (
            <p className="ap__error">{errors.university}</p>
          )}
        </div>

        {/* Auto title preview */}
        {title && (
          <div className="ap__field">
            <label className="ap__label">Document title</label>
            <div className="ap__title-preview">{title}</div>
          </div>
        )}

        {/* PDF upload */}
        <div className="ap__field">
          <label className="ap__label">
            PDF file <span className="ap__required">*</span>
          </label>

          {file ? (
            <div className="ap__file-preview">
              <div className="ap__file-icon">
                <FileText size={22} strokeWidth={1.8} />
              </div>
              <div className="ap__file-info">
                <p className="ap__file-name">{file.name}</p>
                <span className="ap__file-size">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <button
                type="button"
                className="ap__file-remove"
                onClick={removeFile}
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <div
              className={`ap__dropzone ${errors.file ? "ap__dropzone--error" : ""}`}
              onClick={() => fileRef.current?.click()}
            >
              <div className="ap__dropzone-icon">
                <Upload size={24} strokeWidth={1.8} />
              </div>
              <p className="ap__dropzone-text">
                Click to upload a PDF file
              </p>
              <span className="ap__dropzone-sub">PDF only · Max 20MB</span>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="ap__file-input"
            onChange={handleFileChange}
          />

          {errors.file && <p className="ap__error">{errors.file}</p>}
        </div>

        {/* Feedback */}
        {success     && <SubmitSuccess success="Prospectus uploaded successfully!" />}
        {submitError && <SubmitError   error={submitError} />}

        {/* Submit */}
        <div className="ap__actions">
          <button
            type="submit"
            className="ap__submit"
            disabled={loading}
          >
            {loading ? <span className="ap__spinner" /> : <Upload size={16} strokeWidth={2.2} />}
            {loading ? "Uploading…" : "Upload Prospectus"}
          </button>
        </div>

      </form>
    </div>
  );
}