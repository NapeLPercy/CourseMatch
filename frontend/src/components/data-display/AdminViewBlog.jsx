import { useState, useEffect } from "react";
import { Trash2, Search, SlidersHorizontal } from "lucide-react";
import "../../styles/AdminViewBlogs.css";
import {
  adminGetAllBlogs,
  deleteBlog,
  updateBlogStatus,
} from "../../services/blogService";
import BlogSkeleton from "../ui/BlogsSkeleton";
import ErrorState from "../ui/ErrorState";
import AdminBlogCard from "../ui/AdminBlogCard";

function ConfirmModal({ post, onConfirm, onCancel }) {
  return (
    <div className="avb__modal-backdrop" onClick={onCancel}>
      <div className="avb__modal" onClick={(e) => e.stopPropagation()}>
        <div className="avb__modal-icon">
          <Trash2 size={22} strokeWidth={2} color="#dc2626" />
        </div>
        <h3 className="avb__modal-title">Delete post?</h3>
        <p className="avb__modal-body">
          <strong>"{post.title}"</strong> will be permanently deleted. This
          action cannot be undone.
        </p>
        <div className="avb__modal-actions">
          <button className="avb__modal-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="avb__modal-confirm" onClick={onConfirm}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminViewBlogs() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    userFetchAllBlogs();
  }, []);

  const userFetchAllBlogs = async () => {
    setError(null);
    try {
      const { data } = await adminGetAllBlogs();
      setPosts(data.blogs);
    } catch (error) {
      setError("Failed to fetch blog posts");
    } finally {
      setTimeout(() => {
        setLoading(false);
      },2000);
    }
  };

  const filtered = posts.filter((p) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.topic.toLowerCase().includes(q);
    const matchS = !statusFilter || p.status === statusFilter;
    return matchQ && matchS;
  });

  async function handleToggleStatus(isDraft, id) {
    try {
      const { data } = await updateBlogStatus(
        isDraft ? "PUBLISHED" : "DRAFT",
        id,
      );

      if (!data.success) {
        alert("error ccoured!");
        return;
      }

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, status: p.status === "DRAFT" ? "PUBLISHED" : "DRAFT" }
            : p,
        ),
      );
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async function handleDeleteConfirm() {
    try {
      const { data } = await deleteBlog(pendingDelete.id);

      if (!data.success) {
        alert("error ccoured");
        return;
      }
      setPosts((prev) => prev.filter((p) => p.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  const published = posts.filter((p) => p.status === "PUBLISHED").length;
  const drafts = posts.filter((p) => p.status === "DRAFT").length;

  if (loading) return <BlogSkeleton count={6} />;
  if (error) return <ErrorState message={error} onRetry={userFetchAllBlogs} />;

  return (
    <div className="avb">
      {/* Stats */}
      <div className="avb__stats">
        <div className="avb__stat">
          <span className="avb__stat-value">{posts.length}</span>
          <span className="avb__stat-label">Total</span>
        </div>
        <div className="avb__stat-divider" />
        <div className="avb__stat">
          <span className="avb__stat-value avb__stat-value--published">
            {published}
          </span>
          <span className="avb__stat-label">Published</span>
        </div>
        <div className="avb__stat-divider" />
        <div className="avb__stat">
          <span className="avb__stat-value avb__stat-value--draft">
            {drafts}
          </span>
          <span className="avb__stat-label">Drafts</span>
        </div>
      </div>

      {/* Controls */}
      <div className="avb__controls">
        <div className="avb__search-wrap">
          <Search className="avb__search-icon" size={15} strokeWidth={2} />
          <input
            className="avb__search"
            type="text"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="avb__filter-wrap">
          <SlidersHorizontal
            size={14}
            strokeWidth={2}
            className="avb__filter-icon"
          />
          <select
            className="avb__filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <p className="avb__results-label">
        <span>{filtered.length}</span> post{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="avb__empty">
          <Search size={40} strokeWidth={1.5} />
          <h3>No posts found</h3>
          <p>Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="avb__grid">
          {filtered.map((post, i) => (
            <AdminBlogCard
              key={post.id}
              post={post}
              index={i}
              onDelete={setPendingDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      {/* Delete confirm modal */}
      {pendingDelete && (
        <ConfirmModal
          post={pendingDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
