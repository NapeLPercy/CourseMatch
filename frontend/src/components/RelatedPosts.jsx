import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import "../styles/RelatedPosts.css";

export default function RelatedPosts({ posts }) {
  const navigate = useNavigate();

  if (!posts.length) return null;

  return (
    <div className="rp">
      <h3 className="rp__heading">More in this category</h3>
      <div className="rp__grid">
        {posts.map((post, i) => (
          <RelatedCard
            key={post.id}
            post={post}
            index={i}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  );
}

function RelatedCard({ post, index, navigate }) {
  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <div
      className="rp__card"
      style={{ "--index": index }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Cover with data overlaid */}
      <div className="rp__cover-wrap">
        <img
          className="rp__cover-img"
          src={post.coverImageUrl}
          alt={post.title}
        />
        <div className="rp__cover-scrim" />

        {/* Data on top of image */}
        <div className="rp__overlay">
          <p className="rp__title">{post.title}</p>
          <span className="rp__reads">
            <Eye size={11} strokeWidth={2} />
            {post.reads.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
