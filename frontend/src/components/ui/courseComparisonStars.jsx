export default function ComparisonStars({ score, color }) {
  let stars = 1;

  if (score >= 90) {
    stars = 5;
  } else if (score >= 80) {
    stars = 4;
  } else if (score >= 70) {
    stars = 3;
  } else if (score >= 60) {
    stars = 2;
  }

  return (
    <div className="cc__star" style={{ color: color }}>
      {"★".repeat(stars)}
      {"☆".repeat(5 - stars)}
    </div>
  );
}
