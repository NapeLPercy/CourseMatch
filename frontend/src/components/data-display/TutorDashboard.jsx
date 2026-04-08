export default function TutorDashboard() {
  const tutor = {
    name: "Mr. Smith",
    subjects: ["Mathematics", "Physics"],
    students: 18,
    pendingReviews: 5,
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Tutor Dashboard</h1>

      <h2>Welcome, {tutor.name}</h2>

      <div style={{ marginTop: "15px" }}>
        <p><strong>Subjects:</strong> {tutor.subjects.join(", ")}</p>
        <p><strong>Students Assigned:</strong> {tutor.students}</p>
        <p><strong>Pending Reviews:</strong> {tutor.pendingReviews}</p>
      </div>

      <div style={{ marginTop: "15px" }}>
        <p>You have 3 students needing feedback this week 📝</p>
      </div>
    </div>
  );
}