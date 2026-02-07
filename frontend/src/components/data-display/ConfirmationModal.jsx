import React, { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";
import "../../styles/ConfirmationModal.css";
import CreatePortal, { createPortal } from "react-dom";

export default function ConfirmationModal({
  isOpen,
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // "danger" | "primary"
}) {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Click outside to close
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="cm__backdrop" onClick={handleBackdropClick}>
      <div ref={modalRef} className="cm__modal" role="dialog" aria-modal="true">
        {/* Close button */}
        <button
          type="button"
          className="cm__close"
          onClick={onCancel}
          aria-label="Close modal"
        >
          <X size={18} strokeWidth={2} />
        </button>

        {/* Icon */}
        <div className={`cm__icon cm__icon--${variant}`}>
          <AlertTriangle size={32} strokeWidth={1.6} />
        </div>

        {/* Title */}
        {title && <h2 className="cm__title">{title}</h2>}

        {/* Message */}
        <div className="cm__message">{message}</div>

        {/* Actions */}
        <div className="cm__actions">
          <button
            type="button"
            className="cm__btn cm__btn--cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={`cm__btn cm__btn--confirm cm__btn--confirm-${variant}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,

    document.body,
  );
}
