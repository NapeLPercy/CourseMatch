import React, { useRef } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
  const ref = useRef(null);

  const handleSend = () => {
    const val = ref.current?.value.trim();
    if (!val) return;
    onSend(val);
    ref.current.value = "";
    ref.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div className="cb__input-area">
      <textarea
        ref={ref}
        className="cb__input"
        placeholder="Ask me anything…"
        rows={1}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        disabled={disabled}
      />
      <button className="cb__send" onClick={handleSend} disabled={disabled}>
        <Send size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
}