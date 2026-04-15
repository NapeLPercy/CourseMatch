import "../../styles/BlogPostSkeleton.css";

export default function BlogPostSkeleton() {
  return (
    <div className="bps">
      {/* Back button */}
      <div className="bps__back bps__shine" />

      {/* Cover */}
      <div className="bps__cover bps__shine">
        {/* topic badge top left */}
        <div className="bps__cover-badge bps__cover-shine" />
      </div>

      {/* Article */}
      <div className="bps__article">
        {/* Title */}
        <div className="bps__title bps__shine" />
        <div className="bps__title bps__title--short bps__shine" />

        {/* Excerpt */}
        <div className="bps__excerpt bps__shine" />
        <div className="bps__excerpt bps__excerpt--short bps__shine" />

        {/* Meta row: author + share btn */}
        <div className="bps__meta-row">
          <div className="bps__author">
            <div className="bps__avatar bps__shine" />
            <div className="bps__author-lines">
              <div className="bps__author-name bps__shine" />
              <div className="bps__author-sub bps__shine" />
            </div>
          </div>
          <div className="bps__share-btn bps__shine" />
        </div>

        <div className="bps__divider" />

        {/* Content blocks */}
        <div className="bps__content">
          {/* block 1 */}
          <div className="bps__block-heading bps__shine" />
          <div className="bps__block-line bps__shine" />
          <div className="bps__block-line bps__shine" />
          <div className="bps__block-line bps__block-line--short bps__shine" />

          {/* block 2 */}
          <div className="bps__block-heading bps__block-heading--mid bps__shine" />
          <div className="bps__block-line bps__shine" />
          <div className="bps__block-line bps__shine" />
          <div className="bps__block-line bps__block-line--mid bps__shine" />

          {/* block 3 */}
          <div className="bps__block-heading bps__block-heading--short bps__shine" />
          <div className="bps__block-line bps__shine" />
          <div className="bps__block-line bps__block-line--mid bps__shine" />
        </div>

        {/* Footer */}
        <div className="bps__footer">
          <div className="bps__footer-label bps__shine" />
          <div className="bps__share-btn bps__shine" />
        </div>
      </div>
    </div>
  );
}