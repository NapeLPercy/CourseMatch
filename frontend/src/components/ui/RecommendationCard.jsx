export default function renderRecommendationCard(course) {
  return (
    <li className="rec-card" key={course.qualificationCode}>
      {/* fit score badge - sits to the left */}
      <div className="rec-card__score-badge">
        <span className="rec-card__score-badge__value">{course.fitScore}</span>
        <span className="rec-card__score-badge__label">fit</span>
      </div>

      {/* name + code */}
      <div className="rec-card__header">
        <h3 className="rec-card__title">{course.qualificationName}</h3>
        <span className="rec-card__code">{course.qualificationCode}</span>
      </div>

      {/* AI reasoning */}
      <p className="rec-card__reason">
        <strong>Why this course?</strong> {course.reason}
      </p>
    </li>
  );
}
