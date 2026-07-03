import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { Calculator, BookOpen, HelpCircle, } from "lucide-react";
import { sendChatbotMessage } from "../../services/chatbotService";

const GREETING = {
  role: "bot",
  text: "Hey! 👋 I'm CourseMatch AI. I'm here to help you find the right university courses based on your subjects, APS score, and interests.",
  timestamp: new Date(),
};

const FEATURES_MSG = {
  role: "bot",
  text: "Here's what I can help you with:",
  custom: {
    type: "features_list",
    features: [
      { icon: Calculator, label: "Ask APS score questions" },
      { icon: BookOpen, label: "Explore course requirements" },
      { icon: HelpCircle, label: "Understand admission rules" },
    ],
  },
  timestamp: new Date(),
};

export default function ChatBot({ onClose, logoSrc }) {
  const [messages, setMessages] = useState([GREETING, FEATURES_MSG]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text) => {
    const userMsg = { role: "user", text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await sendChatbotMessage("Student user", text);
      const data = response?.data;

      let botText;
      let botCustom;

      if (!Array.isArray(data) || data.length === 0) {
        botText = "I couldn't find a proper response. Please try again.";
      } else if (data[0]?.custom) {
        botCustom = data[0].custom;
      } else {
        botText =
          data[0]?.text ||
          "I received an empty response. Please try rephrasing.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: botText,
          custom: botCustom,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cb">
      <ChatHeader onClose={onClose} logoSrc={logoSrc} />

      <div className="cb__messages">
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} />
        ))}
        {loading && (
          <div className="cb__loading">
            <span className="cb__loading-dot" />
            <span className="cb__loading-dot" />
            <span className="cb__loading-dot" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
