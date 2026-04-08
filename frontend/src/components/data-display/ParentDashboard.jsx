export default function ParentDashboard() {
  const parent = {
    name: "Sarah Johnson",
    child: "Alex Johnson",
    childProgress: "Good",
    alerts: 2,
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Parent Dashboard</h1>

      <h2>Welcome, {parent.name}</h2>

      <div style={{ marginTop: "15px" }}>
        <p><strong>Child:</strong> {parent.child}</p>
        <p><strong>Progress Status:</strong> {parent.childProgress}</p>
        <p><strong>Alerts:</strong> {parent.alerts}</p>
      </div>

      <div style={{ marginTop: "15px" }}>
        <p>Latest update: Your child improved in Mathematics this term 📈</p>
      </div>
    </div>
  );
}