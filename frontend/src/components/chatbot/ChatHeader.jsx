import React from "react";
import { X, Bot } from "lucide-react";

export default function ChatHeader({ onClose, logoSrc }) {
  return (
    <div className="cb__header">
      {logoSrc ? (
        <img src={logoSrc} alt="CourseMatch Bot" className="cb__header-logo" />
      ) : (
        <div className="cb__header-logo-fallback">
          <Bot size={20} strokeWidth={1.8} />
        </div>
      )}
      <div className="cb__header-text">
        <p className="cb__header-name">CourseMatch AI</p>
        <div className="cb__header-status">
          <span className="cb__status-dot" />
          Online
        </div>
      </div>
      <button className="cb__header-close" onClick={onClose} aria-label="Close chat">
        <X size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}