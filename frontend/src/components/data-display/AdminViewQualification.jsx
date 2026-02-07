import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Loader2,
  Edit3,
  Trash2,
  Building2,
  BookOpen,
  FileText,
  Award,
  Clock,
  Hash,
} from "lucide-react";
import "../../styles/AdminViewQualification.css";
import ConfirmationModal from "./ConfirmationModal";

/* ─── Single qualification card ─────────────────────────────── */
function QualificationCard({ qual, index, afterDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  const handleEdit = () => {
    console.log("EDIT QUALIFICATION:", qual);
    alert(`Edit clicked for "${qual.name}". Check console for full data.`);
  };

  const handleDelete = () => {
    setModalMessage(<>You are about to delete <strong>{qual.name}</strong> from qualifications list</>);
    setIsModalOpen(true);
  };


  const confirmDelete=()=>{
    deleteQualification(qual.code);
    afterDelete(qual.code);
  }

  const cancelDelete=()=>{
    setIsModalOpen(false);
    setModalMessage(null);
  }

  const deleteQualification = async (code) => {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const token = JSON.parse(sessionStorage.getItem("token"));
  try {
    // The 'await' keyword pauses execution until the promise is resolved
    const response = await axios.delete(`${API_BASE}/api/qualification/${code}`,{
      headers: {Authorization: `Bearer ${token}`}
    });
    
  console.log("Data received:", response.data);
  const data = response.data;
  alert(data.message);
  setIsModalOpen(false)
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
    <div className="avq__card" style={{ animationDelay: `${index * 0.05}s` }}>
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
      {/* Header: University + Faculty */}
      <div className="avq__card-header">
        <div className="avq__header-left">
          <div className="avq__uni">
            <Building2 size={14} strokeWidth={2} className="avq__uni-icon" />
            <span className="avq__uni-name">{qual.university.name}</span>
          </div>
          <div className="avq__faculty">
            <BookOpen size={13} strokeWidth={2} className="avq__faculty-icon" />
            <span className="avq__faculty-name">{qual.faculty.name}</span>
          </div>
        </div>

        <div className="avq__actions">
          <button
            type="button"
            className="avq__btn avq__btn--edit"
            onClick={handleEdit}
            aria-label={`Edit ${qual.name}`}
          >
            <Edit3 size={15} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="avq__btn avq__btn--delete"
            onClick={handleDelete}
            aria-label={`Delete ${qual.name}`}
          >
            <Trash2 size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Body: Qualification details */}
      <div className="avq__body">
        <h3 className="avq__title">{qual.name}</h3>

        <div className="avq__details">
          <div className="avq__detail">
            <Hash size={13} strokeWidth={2} className="avq__detail-icon" />
            <span className="avq__detail-label">Code:</span>
            <span className="avq__detail-value">{qual.code}</span>
          </div>

          {qual.minimum_aps && (
            <div className="avq__detail">
              <Award size={13} strokeWidth={2} className="avq__detail-icon" />
              <span className="avq__detail-label">Min APS:</span>
              <span className="avq__detail-value">{qual.minimum_aps}</span>
            </div>
          )}

          {qual.minimum_endorsement && (
            <div className="avq__detail">
              <FileText
                size={13}
                strokeWidth={2}
                className="avq__detail-icon"
              />
              <span className="avq__detail-label">Endorsement:</span>
              <span className="avq__detail-value">
                {qual.minimum_endorsement}
              </span>
            </div>
          )}

          {qual.minimum_duration && (
            <div className="avq__detail">
              <Clock size={13} strokeWidth={2} className="avq__detail-icon" />
              <span className="avq__detail-label">Duration:</span>
              <span className="avq__detail-value">
                {qual.minimum_duration} years
              </span>
            </div>
          )}
        </div>

        {/* Prerequisites table */}
        {qual.prerequisites && qual.prerequisites.length > 0 && (
          <div className="avq__prereqs">
            <div className="avq__prereqs-title">Prerequisites</div>
            <div className="avq__prereqs-table">
              {qual.prerequisites.map((p, i) => (
                <div key={i} className="avq__prereq-row">
                  <span className="avq__prereq-name">{p.subject_name}</span>
                  <span className="avq__prereq-mark">{p.minimum_mark}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export default function AdminViewQualifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch qualifications
  useEffect(() => {
    const fetchQualifications = async () => {
      const API_BASE = process.env.REACT_APP_API_BASE;
      const token = JSON.parse(sessionStorage.getItem("token"));

      try {
        const res = await axios.get(`${API_BASE}/api/qualification/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const qualificationsData = res.data.qualifications;
        setTimeout(() => {
          setQualifications(qualificationsData);
          setLoading(false);
        }, 3000);
        //setSearchQuery(qualificationsData);
      } catch (error) {
        setLoading(false);
        console.error(
          "Failed to fetch qualifications:",
          error.response?.data || error.message,
        );
      }
    };

    fetchQualifications();
  }, []);

  // Filter qualifications by search query
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return qualifications;

    const q = searchQuery.toLowerCase();
    return qualifications.filter(
      (qual) =>
        qual.name.toLowerCase().includes(q) ||
        qual.code.toLowerCase().includes(q) ||
        qual.university.name.toLowerCase().includes(q) ||
        qual.faculty.name.toLowerCase().includes(q),
    );
  }, [searchQuery, qualifications]);


  //after successful course deletion
  const handleAfterDelete=(qualificationCode)=>{
    setQualifications(qualifications.filter(qualification=> qualification.code !== qualificationCode));
  }
  return (
    <div className="avq">
      {loading && (
        <div className="avq__empty">
          <Loader2
            className="avq__spinner"
            size={28}
            color={"#1e3a8a"}
            strokeWidth={2.2}
          />
          <p>Loading qualifications...</p>
        </div>
      )}

      {/* Search bar */}
      <div className="avq__search-wrap">
        <Search size={18} strokeWidth={2} className="avq__search-icon" />
        <input
          type="text"
          className="avq__search-input"
          placeholder="Search by name, code, university, or faculty…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Results count */}
      <div className="avq__meta">
        Showing <strong>{filtered.length}</strong> qualification
        {filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Qualification cards */}
      {filtered.length > 0 ? (
        <div className="avq__grid">
          {filtered.map((qual, i) => (
            <QualificationCard key={qual.code} qual={qual} index={i} afterDelete={handleAfterDelete} />
          ))}
        </div>
      ) : (
        <div className="avq__empty">
          <p>No qualifications match your search.</p>
        </div>
      )}
    </div>
  );
}
