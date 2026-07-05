import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";

export default function ChatLauncher({ onClick, logoSrc }) {
  return (
    <>
      {/*  <span className="cbl__label">Talk to me</span>*/}
      <button className="cbl__btn" onClick={onClick} aria-label="Open chat">
        {logoSrc ? (
          <img src={logoSrc} alt="Bot" className="cbl__btn-logo" />
        ) : (
          <Bot size={26} strokeWidth={1.8} className="cbl__btn-fallback" />
        )}
      </button>
    </>
  );
}
