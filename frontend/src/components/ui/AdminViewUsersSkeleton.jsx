import "../../styles/AdminViewUsers.css";

export default function AdminUserListSkeleton({ rows = 6 }) {
  return (
    <div className="auls">

      {/* Controls */}
      <div className="auls__controls">
        <div className="auls__search auls__shine" />
        <div className="auls__tabs auls__shine" />
      </div>

      {/* Count line */}
      <div className="auls__count auls__shine" />

      {/* Table */}
      <div className="auls__table-wrap">
        {/* Head */}
        <div className="auls__thead">
          {["User", "User ID", "Joined", "Profile", "Subjects"].map((h) => (
            <div key={h} className="auls__th auls__shine" />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="auls__row" style={{ "--i": i }}>
            {/* User cell */}
            <div className="auls__user-cell">
              <div className="auls__avatar auls__shine" />
              <div className="auls__shine auls__email" />
            </div>
            {/* ID */}
            <div className="auls__shine auls__id" />
            {/* Date */}
            <div className="auls__shine auls__date" />
            {/* Profile pill */}
            <div className="auls__shine auls__pill" />
            {/* Subjects pill */}
            <div className="auls__shine auls__pill" />
          </div>
        ))}
      </div>
    </div>
  );
}