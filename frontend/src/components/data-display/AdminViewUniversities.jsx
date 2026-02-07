import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Search,
  Edit3,
  Trash2,
  Building2,
  Globe,
  Hash,
  BookOpen,
} from "lucide-react";
import "../../styles/AdminViewUniversities.css";
import ConfirmationModal from "./ConfirmationModal";

/* ─── Single university card ────────────────────────────────── */
function UniversityCard({ uni, index, afterDelete }) {
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
    const API_BASE = process.env.REACT_APP_API_BASE;
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      // The 'await' keyword pauses execution until the promise is resolved
      const response = await axios.delete(
        `${API_BASE}/api/university/${abbreviation}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("Data received:", response.data);
      const data = response.data;
      alert(data.message);
      setIsModalOpen(false);
      setModalMessage(null);
    } catch (error) {
      console.error("An error occurred during the request:");

      if (error.response) {
        console.error("Server response data:", error.response.data);
        console.error("Server response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
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

/* ─── Main component ────────────────────────────────────────── */
export default function AdminViewUniversities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch universities (replace with real API call)
  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const token = JSON.parse(sessionStorage.getItem("token"));

    try {
      const res = await axios.get(`${API_BASE}/api/university/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const universitiesData = res.data.universities;
      setUniversities(universitiesData);
      setLoading(false);
    } catch (error) {
      console.log(error.message || "Failed to fetch universities");
    }
  };

  // Filter universities
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return universities;

    const q = searchQuery.toLowerCase();
    return universities.filter(
      (uni) =>
        uni.abbreviation.toLowerCase().includes(q) ||
        uni.name.toLowerCase().includes(q) ||
        uni.faculties.some((f) => f.name.toLowerCase().includes(q)),
    );
  }, [searchQuery, universities]);

  if (loading) {
    return (
      <div className="vu">
        <div className="vu__loading">Loading universities...</div>
      </div>
    );
  }

  //after successful deletion, remove uni from the list
  const handleAfterDelete = (universityAbbre) => {
    setUniversities(universities.filter(uni=> uni.abbreviation!==universityAbbre));
  };

  return (
    <div className="vu">
      {/* Search */}
      <div className="vu__search-wrap">
        <Search size={18} strokeWidth={2} className="vu__search-icon" />
        <input
          type="text"
          className="vu__search-input"
          placeholder="Search by abbreviation, name, or faculty…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Meta */}
      <div className="vu__meta">
        Showing <strong>{filtered.length}</strong> universit
        {filtered.length !== 1 ? "ies" : "y"}
      </div>

      {/* Cards */}
      {filtered.length > 0 ? (
        <div className="vu__grid">
          {filtered.map((uni, i) => (
            <UniversityCard
              key={uni.abbreviation}
              uni={uni}
              index={i}
              afterDelete={handleAfterDelete}
            />
          ))}
        </div>
      ) : (
        <div className="vu__empty">
          <p>No universities match your search.</p>
        </div>
      )}
    </div>
  );
}
