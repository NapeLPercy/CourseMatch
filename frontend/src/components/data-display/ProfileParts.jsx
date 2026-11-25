/* Shared building blocks for CareerGoals and PersonalityProfile. */

/**
 * Multi-option answers were stored joined with " and "
 * ("Writing and Dancing and Watching Movies"), so split them back apart.
 */
export function splitMulti(value) {
  if (!value || typeof value !== "string") return [];
  return value
    .split(/\s+and\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** "independent" -> "Independent", "hands_on" -> "Hands on" */
export function formatChoice(value) {
  if (!value) return "";
  const text = String(value).replace(/[_-]/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function InfoCard({
  icon: Icon,
  label,
  tone = "blue",
  index = 0,
  wide = false,
  children,
}) {
  return (
    <section
      className={`pd__card pd__card--${tone}${wide ? " pd__card--wide" : ""}`}
      style={{ "--i": index }}
    >
      <div className="pd__card-head">
        <span className="pd__card-icon" aria-hidden="true">
          <Icon size={16} strokeWidth={2} />
        </span>
        <h2 className="pd__card-label">{label}</h2>
      </div>
      {children}
    </section>
  );
}

/** Single text answer. `size="lg"` is used for the featured card. */
export function ValueText({ children, size = "md" }) {
  if (!children) return <p className="pd__muted">Not added yet</p>;
  return <p className={`pd__value pd__value--${size}`}>{children}</p>;
}

/** Single-choice answer shown as one prominent chip. */
export function ChoiceValue({ children }) {
  if (!children) return <p className="pd__muted">Not added yet</p>;
  return (
    <div className="pd__chips">
      <span className="pd__chip pd__chip--lg">{children}</span>
    </div>
  );
}

/** Multi-option answer shown as a wrapping list of chips. */
export function ChipList({ items }) {
  if (!items?.length) return <p className="pd__muted">Not added yet</p>;
  return (
    <ul className="pd__chips">
      {items.map((item) => (
        <li key={item} className="pd__chip">
          {item}
        </li>
      ))}
    </ul>
  );
}
/**
 * One skeleton for both pages. It reuses the real grid and card classes so
 * the loading state lines up with the loaded layout.
 *
 * Props
 *  count  Number of placeholder cards (5 for career goals, 6 for personality).
 */
export default function ProfileSkeleton({ count = 6 }) {
  return (
    <div className="pd__grid" aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`pd__card pd__card--skel${i === 0 && count === 5 ? " pd__card--wide" : ""}`}
          style={{ "--i": i }}
        >
          <div className="pd__card-head">
            <div className="pd__skel pd__skel--icon" />
            <div className="pd__skel pd__skel--label" />
          </div>

          <div className="pd__skel-chips">
            <div className="pd__skel pd__skel--chip" />
            <div className="pd__skel pd__skel--chip pd__skel--chip-lg" />
            <div className="pd__skel pd__skel--chip" />
          </div>
        </div>
      ))}
    </div>
  );
}