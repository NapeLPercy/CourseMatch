import { Bell } from "lucide-react";

/**
 * Props
 *  count    Unread notifications. Any value above 0 shows the dot.
 *  onClick  Called when the bell is pressed.
 */
export default function NotificationButton({ count = 0, onClick }) {
  const label =
    count > 0 ? `Notifications, ${count} unread` : "Notifications";

  return (
    <button
      type="button"
      className="ws-icon-btn"
      aria-label={label}
      onClick={onClick}
    >
      <Bell size={18} strokeWidth={1.9} />
      {count > 0 && <span className="ws-notify-dot" aria-hidden="true" />}
    </button>
  );
}