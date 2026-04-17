import { useEffect, useState } from "react";
import { Calendar, Eye, ArrowLeft, Tag } from "lucide-react";
import "../styles/BlogPost.css";
import { useNavigate } from "react-router-dom";
import RelatedPosts from "../components/RelatedPosts";
import ShareMenu from "../components/ui/ShareMenu";
import { getBlogById } from "../services/blogService";
import { useParams } from "react-router-dom";
import { formatTimestamp } from "../Utils/datetime";
import BlogPostSkeleton from "../components/ui/BlogPostSkeleton";
import BlogNotFound from "../components/ui/BlogNotFound";
import ErrorState from "../components/ui/ErrorState";
function getInitials(name) {
  if (!name) return;
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Block({ block }) {
  if (block.type === "heading") {
    return <h2 className="bp__block-heading">{block.content}</h2>;
  }
  return <p className="bp__block-paragraph">{block.content}</p>;
}

export default function BlogPost() {
  const [post, setPost] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  // const sorted = [...post?.blocks].sort((a, b) => a.position - b.position);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPostAndRelatedPosts(id);
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getPostAndRelatedPosts = async (postId) => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const { data } = await getBlogById(postId);
      if (!data.success) {
        //blognot found
        setNotFound(true);
        return;
      }
      setPost(data.blog);
      setRelatedPosts(data.blog.related);
    } catch (error) {
      setError("Server error, could not fetch blog post");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <BlogPostSkeleton />;
  if (notFound) return <BlogNotFound />;
  if (error)
    return <ErrorState message={error} onRetry={getPostAndRelatedPosts} />;
  
  return (
    <div className="bp">
      {/* Back nav */}
      <button className="bp__back" onClick={() => navigate("/blogs")}>
        <ArrowLeft size={15} strokeWidth={2.5} />
        Back to blog
      </button>

      {/* Cover */}
      <div className="bp__cover-wrap">
        <img
          className="bp__cover-img"
          src={post.coverImageUrl}
          alt={post.title}
        />
        <div className="bp__cover-scrim" />
        <span className="bp__topic-badge">
          <Tag size={10} strokeWidth={2.5} />
          {post.topic}
        </span>
      </div>

      {/* Article */}
      <article className="bp__article">
        {/* Header */}
        <header className="bp__header">
          <h1 className="bp__title">{post.title}</h1>
          <p className="bp__excerpt">{post.excerpt}</p>

          <div className="bp__meta-row">
            {/* Author */}
            <div className="bp__author">
              <div className="bp__avatar">
                {getInitials(post?.author?.name)}
              </div>
              <div className="bp__author-info">
                <span className="bp__author-name">{post?.author?.name}</span>
                <span className="bp__meta-sub">
                  <Calendar size={11} strokeWidth={2} />
                  {formatTimestamp(post.publishedAt)}
                  <span className="bp__dot" />
                  <Eye size={11} strokeWidth={2} />
                  {post?.reads?.toLocaleString()} reads
                </span>
              </div>
            </div>

            {/* Share */}
            <ShareMenu post={post} />
          </div>

          <div className="bp__divider" />
        </header>

        {/* Content blocks */}
        <div className="bp__content">
          {post?.blocks?.map((block) => (
            <Block key={block.position} block={block} />
          ))}
        </div>

        {/* Footer share nudge */}
        <div className="bp__footer">
          <p className="bp__footer-label">Found this helpful?</p>
          <ShareMenu title={post.title} />
        </div>

        <RelatedPosts posts={relatedPosts} />
      </article>
    </div>
  );
}
