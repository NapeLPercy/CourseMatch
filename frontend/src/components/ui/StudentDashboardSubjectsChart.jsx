import {
  TrendingUp
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function getMarkColor(mark) {
  const m = Number(mark);

  if (m >= 80) return "#16a34a"; // green - distinction
  if (m >= 70) return "#2563eb"; // blue - strong pass
  if (m >= 60) return "#8b5cf6"; // purple - average pass
  if (m >= 50) return "#f59e0b"; // amber - weak pass
  if (m >= 40) return "#d97706"; // borderline
  return "#dc2626"; // fail
}

export default function SubjectsChart({ subjects }) {
  const sorted = [...subjects]
    .map((s) => ({ name: s.name, mark: Number(s.mark) }))
    .sort((a, b) => b.mark - a.mark);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="db__tooltip">
          <p className="db__tooltip-name">{payload[0].payload.name}</p>
          <p className="db__tooltip-val">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="db__card">
      <div className="db__section-head">
        <div className="db__section-icon db__section-icon--green">
          <TrendingUp size={18} strokeWidth={2} />
        </div>
        <h2 className="db__section-title">Academic performance</h2>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
        >
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={130}
            tick={{ fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="mark" radius={[0, 6, 6, 0]}>
            {sorted.map((entry, i) => (
              <Cell key={i} fill={getMarkColor(entry.mark)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="db__legend">
        {[
          { color: "#16a34a", label: "80%+ Distinction" },
          { color: "#2563eb", label: "70–79% Excellent Pass" },
          { color: "#8b5cf6", label: "60–69% Pass" },
          { color: "#f59e0b", label: "50–59% Avarage Pass" },
          { color: "#d97706", label: "40–49% Borderline" },
          { color: "#dc2626", label: "Below 40%" },
        ].map((l) => (
          <span key={l.label} className="db__legend-item">
            <span className="db__legend-dot" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}