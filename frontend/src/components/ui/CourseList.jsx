import renderCourseCard from "./CourseCard";
import EmptyState from "./EmptyState";
// Full course list or empty state
export default function renderCourseList(courseList, emptyMessage) {
  if (courseList.length === 0)return <EmptyState message={emptyMessage}/>;

  return (
    <ul className="uni-course-list">
      {courseList.map((course, index) => renderCourseCard(course, index))}
    </ul>
  );
}
