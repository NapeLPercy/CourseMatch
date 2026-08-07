export default function renderCourseCard(course, index) {
  const prereqs = [...(course.prereqs || [])];

  const maths = prereqs.find(
    (p) => p.subject_name.toLowerCase() === "mathematics",
  );

  const mathLit = prereqs.find(
    (p) => p.subject_name.toLowerCase() === "mathematical literacy",
  );

  const otherPrereqs = prereqs.filter(
    (p) =>
      !["mathematics", "mathematical literacy"].includes(
        p.subject_name.toLowerCase(),
      ),
  );

  const displayPrereqs = [];

  if (maths && mathLit) {
    displayPrereqs.push({
      isMathGroup: true,
      maths,
      mathLit,
    });
  } else if (maths) {
    displayPrereqs.push(maths);
  } else if (mathLit) {
    displayPrereqs.push(mathLit);
  }

  displayPrereqs.push(...otherPrereqs);

  return (
    <li className="uni-course-card" key={index}>
      <h3 className="uni-course-card__title">{course.qualification_name}</h3>
      <div className="uni-course-card__meta">
        <span className="uni-course-card__meta-item">
          <strong>Min APS:</strong> {course.minimum_aps}
        </span>
        <span className="uni-course-card__meta-item">
          <strong>NQF:</strong> {course.qualification_nqf}
        </span>
        <span className="uni-course-card__meta-item">
          <strong>Duration:</strong> {course.minimum_duration} yrs
        </span>

        <span className="uni-course-card__meta-item">
          <strong>Code:</strong> {course.qualification_code}
        </span>
      </div>

      {displayPrereqs.length > 0 && (
        <div className="uni-course-card__prereqs">
          <p className="uni-course-card__prereqs-label">Prerequisites</p>

          <ul className="uni-course-card__prereqs-list">
            {displayPrereqs.map((prereq, idx) => (
              <li className="uni-course-card__prereq-tag" key={idx}>
                {prereq.isMathGroup ? (
                  <>
                    Mathematics
                    <span className="prereq-mark">
                      {prereq.maths.min_mark}%
                    </span>
                    {" OR "}
                    Maths Literacy
                    <span className="prereq-mark">
                      {prereq.mathLit.min_mark}%
                    </span>
                  </>
                ) : (
                  <>
                    {prereq.subject_name}
                    <span className="prereq-mark">{prereq.min_mark}%</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

// export default function renderCourseCard(course, index) {
//   return (
//     <li className="uni-course-card" key={index}>
//       <h3 className="uni-course-card__title">{course.qualification_name}</h3>

//       <div className="uni-course-card__meta">
//         <span className="uni-course-card__meta-item">
//           <strong>Min APS:</strong> {course.minimum_aps}
//         </span>
//         <span className="uni-course-card__meta-item">
//           <strong>NQF:</strong> {course.qualification_nqf}
//         </span>
//         <span className="uni-course-card__meta-item">
//           <strong>Duration:</strong> {course.minimum_duration} yrs
//         </span>

//         <span className="uni-course-card__meta-item">
//           <strong>Code:</strong> {course.qualification_code}
//         </span>
//       </div>

//       {course.prereqs && course.prereqs.length > 0 && (
//         <div className="uni-course-card__prereqs">
//           <p className="uni-course-card__prereqs-label">Prerequisites</p>
//           <ul className="uni-course-card__prereqs-list">
//             {course.prereqs.map((prereq, idx) => (
//               <li className="uni-course-card__prereq-tag" key={idx}>
//                 {prereq.subject_name}
//                 <span className="prereq-mark">{prereq.min_mark}%</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </li>
//   );
// }
