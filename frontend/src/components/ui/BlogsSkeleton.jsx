import "../../styles/BlogsSkeleton.css";

/* Single skeleton card — matches both BlogList and AdminViewBlogs card structure */
function SkeletonCard({ isAdmin = false }) {
  return (
    <div className="bsk__card">
      {/* Cover */}
      <div className="bsk__cover">
        {/* top-left badge */}
        <div className="bsk__badge bsk__badge--left bsk__shine" />
        {/* top-right badge — admin shows topic on right too */}
        {isAdmin && <div className="bsk__badge bsk__badge--right bsk__shine" />}
      </div>

      {/* Body */}
      <div className="bsk__body">
        <div className="bsk__line bsk__line--title bsk__shine" />
        <div className="bsk__line bsk__line--title-short bsk__shine" />
        <div className="bsk__line bsk__shine" />
        <div className="bsk__line bsk__line--short bsk__shine" />

        {/* Meta row */}
        <div className="bsk__meta">
          <div className="bsk__meta-item bsk__shine" />
          <div className="bsk__meta-item bsk__shine" />
        </div>
      </div>

      {/* Footer */}
      <div className="bsk__footer">
        <div className="bsk__author">
          <div className="bsk__avatar bsk__shine" />
          <div className="bsk__author-lines">
            <div className="bsk__author-name bsk__shine" />
            <div className="bsk__author-sub bsk__shine" />
          </div>
        </div>
        {isAdmin ? (
          /* Admin: two action buttons */
          <div className="bsk__actions">
            <div className="bsk__btn bsk__shine" />
            <div className="bsk__btn bsk__btn--sm bsk__shine" />
          </div>
        ) : (
          /* User: read more ghost link */
          <div className="bsk__readmore bsk__shine" />
        )}
      </div>
    </div>
  );
}

/**
 * BlogSkeleton
 *
 * Props:
 *   count  — number of skeleton cards to render (default 6)
 *   isAdmin — switches card structure to match AdminViewBlogs (default false)
 */
export default function BlogSkeleton({ count = 6, isAdmin = false }) {
  return (
    <div className="bsk">
      {/* Header shimmer */}
      <div className="bsk__header">
        <div className="bsk__heading bsk__shine" />
        <div className="bsk__subheading bsk__shine" />
      </div>

      {/* Controls shimmer */}
      <div className="bsk__controls">
        <div className="bsk__search bsk__shine" />
        <div className="bsk__filter bsk__shine" />
      </div>

      {/* Grid */}
      <div className="bsk__grid">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}