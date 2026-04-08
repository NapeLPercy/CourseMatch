import { Inbox } from "lucide-react";
import "../../styles/EmptyState.css";

export default function EmptyState({ message = "Nothing here yet" }) {
  return (
    <div className="empty-state">
      <div className="empty-state__content">
        <div className="empty-state__icon">
          <Inbox size={44} />
        </div>

        <h2 className="empty-state__title">Empty</h2>

        <p className="empty-state__message">{message}</p>
      </div>
    </div>
  );
}