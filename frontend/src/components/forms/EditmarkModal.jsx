import React, { useState } from "react";
import "../../styles/EditmarkModal.css";

export default function EditmarkModal({ subject, onSave, onClose }) {
  /* ------------------------------------------------ */
  // Local state
  /* ------------------------------------------------ */
  const [mark, setMark] = useState(String(subject.Mark));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  /* ------------------------------------------------ */
  // Validation
  /* ------------------------------------------------ */
  const validate = (value) => {
    const num = Number(value);

    if (value.trim() === "") return "Mark cannot be empty.";
    if (isNaN(num)) return "Mark must be a number.";
    if (num < 0 || num > 100) return "Mark must be between 0 and 100.";
    return ""; // valid
  };

  /* ------------------------------------------------ */
  // Handlers
  /* ------------------------------------------------ */
  const handleChange = (e) => {
    const val = e.target.value;
    setMark(val);
    setError(validate(val)); // live feedback as user types
  };

  const handleSave = async () => {
    const validationError = validate(mark);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    // hand the actual API call off to the parent via onSave
    // parent decides the endpoint, method, payload shape, etc.
    await onSave({
      Subject_Id: subject.Subject_Id,
      Mark: Number(mark),
    });

    // if onSave didn't throw, we're done —
    // parent is responsible for closing the modal after success
    setSaving(false);
  };

  /* ------------------------------------------------ */
  // Render
  /* ------------------------------------------------ */
  const isInvalid = error.length > 0;

  return (
    <div className="emd-overlay" onClick={onClose}>
      {/* sheet – stop clicks propagating to the overlay */}
      <div className="emd-sheet" onClick={(e) => e.stopPropagation()}>
        {/* close ✕ */}
        <button className="emd-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* subject name */}
        <div className="emd-header">
          <p className="emd-header__label">Editing</p>
          <h2 className="emd-header__title">{subject.Name}</h2>
        </div>

        {/* current mark snapshot */}
        <div className="emd-current">
          <div className="emd-current__badge">{subject.Mark}</div>
          <div className="emd-current__meta">
            <span className="emd-current__meta-label">Current mark</span>
            <span className="emd-current__meta-value">
              {subject.Mark} / 100
            </span>
          </div>
        </div>

        {/* new mark input */}
        <div className="emd-field">
          <label className="emd-field__label" htmlFor="emd-mark-input">
            New Mark
          </label>
          <input
            id="emd-mark-input"
            type="number"
            min="0"
            max="100"
            value={mark}
            onChange={handleChange}
            className={`emd-field__input${isInvalid ? " emd-field__input--invalid" : ""}`}
            disabled={saving}
            autoFocus
          />
          <p className="emd-field__error">{error}</p>
        </div>

        <p style={{ color: "red" }}>
          Marks cannot be changed for now,COMING SOON!
        </p>
        {/* action buttons */}
        <div className="emd-actions">
          <button
            className="emd-actions__btn emd-actions__btn--cancel"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            className={`emd-actions__btn emd-actions__btn--save${saving ? " emd-actions__btn--saving" : ""}`}
            onClick={handleSave}
            disabled={true}
            // disabled={saving || isInvalid}
          >
            {saving ? (
              <>
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </>
            ) : (
              "Update Mark"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
