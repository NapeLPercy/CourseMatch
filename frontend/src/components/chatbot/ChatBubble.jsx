import React from "react";

/* ── Custom renderers — add new types here ── */
function FeaturesList({ features }) {
  return (
    <div className="cb__features">
      {features.map((f, i) => {
        const Icon = f.icon;
        return (
          <div key={i} className="cb__feature-item">
            <Icon size={14} strokeWidth={2} className="cb__feature-icon" />
            {f.label}
          </div>
        );
      })}
    </div>
  );
}

function SubjectList({ subjects }) {
  return (
    <div className="cb__subject-list">
      {subjects.map((s, i) => (
        <div key={i} className="cb__subject-item">
          <span className="cb__subject-name">{s.name}</span>
          <span className="cb__subject-code">{s.code}</span>
        </div>
      ))}
    </div>
  );
}

function renderCustom(custom) {
  switch (custom.type) {
    case "features_list":
      return <FeaturesList features={custom.features} />;
    case "subject_list":
      return <SubjectList subjects={custom.subjects} />;
    default:
      return (
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: 0 }}>
          [Unsupported content type: {custom.type}]
        </p>
      );
  }
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatBubble({ message }) {
  const { role, text, custom, timestamp } = message;
  const isBot = role === "bot";

  return (
    <div
      className={`cb__bubble-wrap cb__bubble-wrap--${isBot ? "bot" : "user"}`}
    >
      <div className={`cb__bubble cb__bubble--${isBot ? "bot" : "user"}`}>
        {text && <span>{text}</span>}
        {custom && renderCustom(custom)}
      </div>
      <span className="cb__bubble-time">{formatTime(timestamp)}</span>
    </div>
  );
}
