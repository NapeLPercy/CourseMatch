export default function renderCourseCard(course, index) {
  return (
    <li className="uni-course-card" key={index}>
      <h3 className="uni-course-card__title">{course.qualification_name}</h3>

      <div className="uni-course-card__meta">
        <span className="uni-course-card__meta-item">
          <strong>Code:</strong> {course.qualification_code}
        </span>
        <span className="uni-course-card__meta-item">
          <strong>Duration:</strong> {course.minimum_duration} yrs
        </span>
        <span className="uni-course-card__meta-item">
          <strong>Min APS:</strong> {course.minimum_aps}
        </span>
      </div>

      {course.prereqs && course.prereqs.length > 0 && (
        <div className="uni-course-card__prereqs">
          <p className="uni-course-card__prereqs-label">Prerequisites</p>
          <ul className="uni-course-card__prereqs-list">
            {course.prereqs.map((prereq, idx) => (
              <li className="uni-course-card__prereq-tag" key={idx}>
                {prereq.subject_name}
                <span className="prereq-mark">{prereq.min_mark}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
