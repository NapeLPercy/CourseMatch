import React, { useState } from "react";
import ChatLauncher from "./ChatLauncher";
import ChatBot from "./ChatBot";
import "./Chatbot.css";

const BOT_LOGO = null; // replace with "/images/bot-logo.png" when ready

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <ChatLauncher onClick={() => setOpen(true)} logoSrc={BOT_LOGO} />
      )}

      {open && (
        <>
          <div className="cbw__overlay" onClick={() => setOpen(false)} />
          <ChatBot onClose={() => setOpen(false)} logoSrc={BOT_LOGO} />
        </>
      )}
    </>
  );
}