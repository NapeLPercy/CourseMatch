import {
  Trash2,
  Globe,
  FileText,
  Eye,
  Calendar,
  Tag,
} from "lucide-react";
import { formatTimestamp } from "../../Utils/datetime";
export default function AdminBlogCard({ post, onDelete, onToggleStatus }) {
  const isDraft = post.status === "DRAFT";

  return (
    <article className="avb__card">
      {/* Cover */}
      <div className="avb__cover-wrap">
        <img
          className="avb__cover-img"
          src={post.coverImageUrl}
          alt={post.title}
        />
        <div className="avb__cover-scrim" />

        {/* Status badge — top left */}
        <span
          className={`avb__status-badge avb__status-badge--${post.status.toLowerCase()}`}
        >
          {isDraft ? (
            <FileText size={9} strokeWidth={2.5} />
          ) : (
            <Globe size={9} strokeWidth={2.5} />
          )}
          {isDraft ? "DRAFT" : "PUBLISHED"}
        </span>

        {/* Topic badge — top right */}
        <span className="avb__topic-badge">
          <Tag size={9} strokeWidth={2.5} />
          {post.topic}
        </span>
      </div>

      {/* Body */}
      <div className="avb__card-body">
        <h2 className="avb__card-title">{post.title}</h2>
        <p className="avb__card-excerpt">{post.excerpt}</p>

        <div className="avb__card-meta">
          <span className="avb__meta-item">
            <Calendar size={11} strokeWidth={2} />
            {formatTimestamp(post.publishedAt)}
          </span>
          <span className="avb__meta-item">
            <Eye size={11} strokeWidth={2} />
            {post.reads.toLocaleString()} reads
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="avb__card-actions">
        {/* Toggle status */}
        <button
          className={`avb__action-btn avb__action-btn--${isDraft ? "publish" : "draft"}`}
          onClick={() => onToggleStatus(isDraft, post.id)}
        >
          {isDraft ? (
            <>
              <Globe size={13} strokeWidth={2.5} />
              Publish
            </>
          ) : (
            <>
              <FileText size={13} strokeWidth={2.5} />
              Move to draft
            </>
          )}
        </button>

        {/* Delete */}
        <button
          className="avb__action-btn avb__action-btn--delete"
          onClick={() => onDelete(post)}
        >
          <Trash2 size={13} strokeWidth={2.5} />
          Delete
        </button>
      </div>
    </article>
  );
}