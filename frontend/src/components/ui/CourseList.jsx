import renderCourseCard from "./CourseCard";
import { Library} from "lucide-react";
// Full course list or empty state
  export default function renderCourseList (courseList, emptyMessage){
    if (courseList.length === 0) {
      return (
        <div className="uni-empty-state">
          <div className="uni-empty-icon">
            <Library color="#1e3a8a" size={54} />
          </div>
          <p>{emptyMessage}</p>
        </div>
      );
    }

    return (
      <ul className="uni-course-list">
        {courseList.map((course, index) => renderCourseCard(course, index))}
      </ul>
    );
  };