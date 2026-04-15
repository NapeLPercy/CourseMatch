import {
  Eye,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../Utils/datetime";

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function BlogCard({ post, index }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <article
      className="bl__card"
      style={{ "--index": index }}
      onClick={handleClick}
    >
      <div className="bl__cover-wrap">
        <img
          className="bl__cover-img"
          src={post.coverImageUrl}
          alt={post.title}
        />
        <div className="bl__cover-scrim" />
        <span className="bl__topic-badge">{post.topic}</span>
      </div>

      <div className="bl__card-body">
        <h2 className="bl__card-title">{post.title}</h2>
        <p className="bl__card-excerpt">{post.excerpt}</p>

        <div className="bl__card-footer">
          <div className="bl__author">
            <div className="bl__avatar">{getInitials(post.author.name)}</div>
            <div className="bl__author-info">
              <span className="bl__author-name">{post.author.name}</span>
              <span className="bl__meta-row">
                <Calendar size={11} strokeWidth={2} />
                {formatTimestamp(post.publishedAt)}
                <span className="bl__dot" />
                <Eye size={11} strokeWidth={2} />
                {post.reads.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            className="bl__read-more"
            onClick={(e) => {
              e.stopPropagation(); // 🔥 prevents double trigger
              handleClick();
            }}
          >
            Read more <ArrowRight size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}