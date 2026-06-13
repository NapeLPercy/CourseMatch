import React, { useState, useEffect } from "react";
import { FileText, Download, Trash2 } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import { useAuth } from "../../context/AuthContext";
import {
  downloadProspectus,
  deleteProspectus,
} from "../../services/prospectusService";
import "../../styles/Prospectus.css";
import { universitiesData } from "../../Utils/textData/universityProspectus";

/* ── Card ───────────────────────────────── */
function ProspectusCard({ item, isAdmin, onDelete }) {
  const [downloading, setDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const response = await downloadProspectus(item.id);
      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      window.open(url, "_blank");

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setDownloading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${item.name} ${item.year} prospectus?`)) return;
    setDeleting(true);
    try {
      await deleteProspectus(item.id);
      onDelete(item.id);
    } catch {
      console.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="pros__card" style={{ "--i": 0 }}>
      {/* Avatar */}
      <div className="pros__avatar">
        <span className="pros__avatar-text">{item.id?.toUpperCase()}</span>
      </div>

      {/* Info */}
      <div className="pros__card-body">
        <h3 className="pros__uni-name">{item.name}</h3>
        <span className="pros__year">{item.year} Prospectus</span>
      </div>

      {/* Actions */}
      <div className="pros__card-actions">
        <button
          className="pros__download-btn"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? (
            <span className="pros__spinner" />
          ) : (
            <Download size={15} strokeWidth={2.2} />
          )}
          {downloading ? "Downloading…" : "Download"}
        </button>

        {isAdmin && (
          <button
            className="pros__delete-btn"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <span className="pros__spinner pros__spinner--red" />
            ) : (
              <Trash2 size={15} strokeWidth={2} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────── */
export default function Prospectus() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [prospectus, setProspectus] = useState(universitiesData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /*useEffect(() => {
    fetchProspectus();
  }, []);

  const fetchProspectus = async () => {
    setLoading(true);
    setError(false);
    try {
      //const { data } = await getProspectus();
      //setProspectus(data.prospectus || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };*/

  const handleDelete = (id) => {
    setProspectus((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="pros">
      <PageHeader
        icon={FileText}
        title={isAdmin ? "Manage prospectus" : "University prospectus"}
        subtitle={
          isAdmin
            ? "Upload, manage and remove university prospectus documents available to students."
            : "Download the latest prospectus from South African universities to explore courses and requirements."
        }
        pillOne={!loading && !error ? `${prospectus.length} available` : null}
      />

      {/* {loading && <ProspectusSkeleton />}

      {error && (
        <ErrorState
          message="Failed to load prospectus documents. Please try again."
          onRetry={fetchProspectus}
        />
      )}

      {!loading && !error && prospectus.length === 0 && (
        <EmptyState message="No prospectus documents are available yet." />
      )}*/}

      {prospectus.length > 0 && (
        <div className="pros__grid">
          {prospectus.map((item, i) => (
            <ProspectusCard
              key={item.id}
              item={{ ...item, _index: i }}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
