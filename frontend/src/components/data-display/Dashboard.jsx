import { Link } from "react-router-dom"
import "../../styles/Dashboard.css";


export default function Dashboard({ user }) {
  return (
    <div className="dashboard-container">

      <h2>Welcome, {user?.name || "Student"}</h2>
      <p>Select an option below:</p>

      <div className="dashboard-links">

        <Link to="/subjects">
          View Subjects
        </Link>

        <Link to="/endorsement">
          Check Matric Endorsement
        </Link>

        <Link to="/recommendations">
          Get Course Recommendations
        </Link>

        <Link to="/profile">
          My Profile
        </Link>

      </div>
    </div>
  );
}
