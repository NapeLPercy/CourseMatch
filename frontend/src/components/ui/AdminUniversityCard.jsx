import React, { useState } from "react";
import { Edit3, Trash2, Globe, Hash, BookOpen } from "lucide-react";
import "../../styles/AdminViewUniversities.css";
import ConfirmationModal from "../data-display/ConfirmationModal";
import { removeUniversity } from "../../services/universityService";

/* Single university card */
export default function AdminUniversityCard({ uni, index, afterDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  const handleEdit = () => {
    console.log("EDIT UNIVERSITY:", uni);
    alert(`Edit clicked for "${uni.name}". Check console for full data.`);
  };

  const handleDelete = () => {
    setModalMessage(
      <>
        You are about to delete <strong>{uni.name}</strong> from university list
      </>,
    );
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteUniversity(uni.abbreviation);
    afterDelete(uni.abbreviation);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setModalMessage(null);
  };

  const deleteUniversity = async (abbreviation) => {
    try {
      // The 'await' keyword pauses execution until the promise is resolved
      const { data } = await removeUniversity(abbreviation);
      console.log(data);
      if (!data.success) {
        alert("Failed to delete a university");
        return;
      }
    } catch (error) {
      console.error("An error occurred during the request:");
    } finally {
      setIsModalOpen(false);
      setModalMessage(null);
    }
  };

  return (
    <div className="vu__card" style={{ animationDelay: `${index * 0.05}s` }}>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          title="Delete Item?"
          message={modalMessage}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          variant="danger"
        />
      )}
      {/* Header: abbreviation + actions */}
      <div className="vu__card-header">
        <div className="vu__abbrev">
          <Hash size={16} strokeWidth={2} className="vu__abbrev-icon" />
          <span className="vu__abbrev-text">{uni.abbreviation}</span>
        </div>

        <div className="vu__actions">
          <button
            type="button"
            className="vu__btn vu__btn--edit"
            onClick={handleEdit}
            aria-label={`Edit ${uni.name}`}
          >
            <Edit3 size={15} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="vu__btn vu__btn--delete"
            onClick={handleDelete}
            aria-label={`Delete ${uni.name}`}
          >
            <Trash2 size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="vu__body">
        <h3 className="vu__title">{uni.name}</h3>

        {uni.url && (
          <div className="vu__detail">
            <Globe size={13} strokeWidth={2} className="vu__detail-icon" />
            <a
              href={uni.url}
              target="_blank"
              rel="noopener noreferrer"
              className="vu__link"
            >
              {uni.url}
            </a>
          </div>
        )}

        {/* Faculties */}
        {uni.faculties && uni.faculties.length > 0 && (
          <div className="vu__faculties">
            <div className="vu__faculties-title">
              <BookOpen size={14} strokeWidth={2} />
              Faculties ({uni.faculties.length})
            </div>
            <ul className="vu__faculty-list">
              {uni.faculties.map((f) => (
                <li key={f.faculty_id} className="vu__faculty-item">
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
