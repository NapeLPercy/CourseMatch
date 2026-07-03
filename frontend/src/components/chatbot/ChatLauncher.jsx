import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";

export default function ChatLauncher({ onClick, logoSrc }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
  let timer;

  const onScroll = () => {
    setVisible(false);
    clearTimeout(timer);
    timer = setTimeout(() => setVisible(true), 800);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    clearTimeout(timer);
  };
}, []); // empty deps — register once only

  return (
    <div className={`cbl ${!visible ? "cbl--hidden" : ""}`}>
      <span className="cbl__label">Talk to me</span>
      <button className="cbl__btn" onClick={onClick} aria-label="Open chat">
        {logoSrc ? (
          <img src={logoSrc} alt="Bot" className="cbl__btn-logo" />
        ) : (
          <Bot size={26} strokeWidth={1.8} className="cbl__btn-fallback" />
        )}
      </button>
    </div>
  );
}