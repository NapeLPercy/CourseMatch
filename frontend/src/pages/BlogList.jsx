import { useState, useMemo, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
} from "lucide-react";
import "../styles/BlogList.css";
import BlogSkeleton from "../components/ui/BlogsSkeleton";
import ErrorState from "../components/ui/ErrorState";
import { getAllBlogs } from "../services/blogService";
import BlogCard from "../components/ui/BlogCard";

export default function BlogList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    userFetchAllBlogs();
  }, []);

  const userFetchAllBlogs = async () => {
    setError(null);
    try {
      const { data } = await getAllBlogs();

      setPosts(data.blogs);
    } catch (error) {
      setError("Failed to fetch blogs, try again!");
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(
    () => [...new Set(posts.map((p) => p.topic))].sort(),
    [posts],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return posts.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q);
      const matchC = !category || p.topic === category;
      return matchQ && matchC;
    });
  }, [posts, search, category]);

  if (loading) return <BlogSkeleton count={6} />;
  if (error) return <ErrorState message={error} onRetry={userFetchAllBlogs} />;

  return (
    <div className="bl">
      <div className="bl__hero">
        <h1 className="bl__title">Explore Our Blog</h1>
        <p className="bl__subtitle">
          Career guidance, subject tips, and everything you need to make the
          right choices for matric and beyond.
        </p>
      </div>

      <div className="bl__controls">
        <div className="bl__search-wrap">
          <Search className="bl__search-icon" size={15} strokeWidth={2} />
          <input
            className="bl__search"
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bl__filter-wrap">
          <SlidersHorizontal
            size={14}
            strokeWidth={2}
            className="bl__filter-icon"
          />
          <select
            className="bl__filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="bl__results-label">
        <span>{filtered.length}</span> article{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="bl__empty">
          <Search size={40} strokeWidth={1.5} />
          <h3>No articles found</h3>
          <p>Try a different search term or category.</p>
        </div>
      ) : (
        <div className="bl__grid">
          {filtered.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
