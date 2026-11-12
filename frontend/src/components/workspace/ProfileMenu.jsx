import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, LogOut, ShieldCheck } from "lucide-react";
import { getInitials } from "./navUtils";

/**
 * Props
 *  user      { name?, email? } — display only.
 *  isAdmin   Shows an administrator badge (metadata from the nav config).
 *  links     Optional [{ label, path }] rendered above the sign-out action.
 *  onLogout  Called from the sign-out item. Hidden when omitted.
 */
export default function ProfileMenu({ user, isAdmin, links = [], onLogout }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const name = user?.name || user?.email || "Account";

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrapRef.current?.querySelector(".ws-profile__btn")?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="ws-profile" ref={wrapRef}>
      <button
        type="button"
        className="ws-profile__btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="ws-avatar" aria-hidden="true">
          {getInitials(name)}
        </span>
        <span className="ws-profile__name">{name}</span>
        <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
      </button>

      {open && (
        <div className="ws-profile__menu" role="menu">
          <div className="ws-profile__head">
            <span className="ws-profile__head-name">{name}</span>
            {user?.email && user.email !== name && (
              <span className="ws-profile__head-email">{user.email}</span>
            )}
            {isAdmin && (
              <span className="ws-badge">
                <ShieldCheck size={11} strokeWidth={2.4} />
                Administrator
              </span>
            )}
          </div>

          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              role="menuitem"
              className="ws-profile__item"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {onLogout && (
            <button
              type="button"
              role="menuitem"
              className="ws-profile__item ws-profile__item--danger"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
            >
              <LogOut size={15} strokeWidth={2} />
              Sign out
            </button>
          )}
        </div>
      )}
    </div>
  );
}