import { useState, useMemo,useEffect } from "react";
import { Search, CheckCircle2, XCircle, Calendar, Mail } from "lucide-react";
import "../../styles/AdminViewUsers.css";
import { getAllAccounts } from "../../services/accountService";
import { formatTimestamp } from "../../Utils/datetime";
import ErrorState from "../ui/ErrorState";
import  AdminUserListSkeleton from "../ui/AdminViewUsersSkeleton";
function getInitials(email) {
  return email.slice(0, 2).toUpperCase();
}

function StatusPill({ value, label }) {
  return (
    <span className={`aul__pill ${value ? "aul__pill--yes" : "aul__pill--no"}`}>
      {value ? (
        <CheckCircle2 size={11} strokeWidth={2.5} />
      ) : (
        <XCircle size={11} strokeWidth={2.5} />
      )}
      {label}
    </span>
  );
}

export default function AdminUserList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const[loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchUsers = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data } = await getAllAccounts();
      console.log(data);
      setUsers(data.result);
    } catch {
      setError("Failed to load users data");
    } finally {
      setLoading(false);
    }
  };

   useState(() => {
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      const matchQ =
        !q ||
        u.email.toLowerCase().includes(q) ||
        u.user_id.toLowerCase().includes(q);
      const matchF =
        filter === "all" ||
        (filter === "complete" && u.hasProfile && u.hasSubjects) ||
        (filter === "incomplete" && (!u.hasProfile || !u.hasSubjects));
      return matchQ && matchF;
    });
  }, [users, search, filter]);

  if(loading) return < AdminUserListSkeleton/>
  if(error) return <ErrorState message={error} onRetry={fetchUsers}/>
  return (
    <div className="aul">
      {/* Controls */}
      <div className="aul__controls">
        <div className="aul__search-wrap">
          <Search size={14} strokeWidth={2} className="aul__search-icon" />
          <input
            className="aul__search"
            type="text"
            placeholder="Search by email or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="aul__filter-tabs">
          {[
            { key: "all", label: "All" },
            { key: "complete", label: "Complete" },
            { key: "incomplete", label: "Incomplete" },
          ].map((t) => (
            <button
              key={t.key}
              className={`aul__tab ${filter === t.key ? "aul__tab--active" : ""}`}
              onClick={() => setFilter(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="aul__count">
        <span>{filtered.length}</span> user{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Table */}
      {(filtered.length === 0) ? (
        <div className="aul__empty">
          <Search size={36} strokeWidth={1.5} />
          <p>No users match your search.</p>
        </div>
      ) : (
        <div className="aul__table-wrap">
          <table className="aul__table">
            <thead>
              <tr>
                <th>User</th>
                {/*<th>User ID</th>*/}
                <th>Joined</th>
                <th>Profile</th>
                <th>Subjects</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="aul__row">
                  <td>
                    <div className="aul__user-cell">
                      <div className="aul__avatar">{getInitials(u.email)}</div>
                      <div className="aul__user-info">
                        <span className="aul__email">
                          <Mail size={11} strokeWidth={2} />
                          {u.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  {/*<td>
                    <span className="aul__id">{u.user_id}</span>
                  </td>*/}
                  <td>
                    <span className="aul__date">
                      <Calendar size={11} strokeWidth={2} />
                      {formatTimestamp(u.created_at)}
                    </span>
                  </td>
                  <td>
                    <StatusPill value={u.hasProfile} label="Profile" />
                  </td>
                  <td>
                    <StatusPill value={u.hasSubjects} label="Subjects" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
