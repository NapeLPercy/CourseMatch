import { useEffect, useRef } from "react";
import {
  GraduationCap,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import SidebarNavigation from "./SidebarNavigation";
import { getInitials } from "./navUtils";

export default function Sidebar({
  navigation,
  user,
  brand,
  iconOnly,
  isMobile,
  open,
  onToggleCollapse,
  onExpand,
  onClose,
  onLogout,
}) {
  const closeRef = useRef(null);
  const showUser = Boolean(navigation?.showUser && user);
  const name = user?.name || user?.email || "Account";

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <aside
      id="ws-sidebar"
      className={`ws-sidebar${open ? " ws-sidebar--open" : ""}`}
    >
      {/* Brand — fixed */}
      <div className="ws-sidebar__head">
        <div className="ws-brand">
          <span className="ws-brand__mark" aria-hidden="true">
            <GraduationCap size={18} strokeWidth={2} />
          </span>
          {!iconOnly && (
            <span className="ws-brand__name">
              {brand ?? (
                <>
                  Course<span className="ws-brand__accent">Match</span>
                </>
              )}
            </span>
          )}
        </div>

        {isMobile && (
          <button
            ref={closeRef}
            type="button"
            className="ws-icon-btn ws-icon-btn--on-dark"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <X size={18} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Navigation — scrolls on its own */}
      <nav className="ws-sidebar__nav" aria-label="Main navigation">
        <SidebarNavigation
          navigation={navigation}
          iconOnly={iconOnly}
          onNavigate={onClose}
          onExpand={onExpand}
        />
      </nav>

      {/* Footer — fixed */}
      <div className="ws-sidebar__foot">
        {!isMobile && (
          <button
            type="button"
            className="ws-collapse"
            onClick={onToggleCollapse}
            aria-expanded={!iconOnly}
            aria-controls="ws-sidebar"
            aria-label={iconOnly ? "Expand sidebar" : "Collapse sidebar"}
            title={iconOnly ? "Expand sidebar" : undefined}
          >
            {iconOnly ? (
              <PanelLeftOpen size={18} strokeWidth={1.9} />
            ) : (
              <PanelLeftClose size={18} strokeWidth={1.9} />
            )}
            {!iconOnly && <span>Collapse</span>}
          </button>
        )}

        {showUser && (
          <div className="ws-account">
            <div className="ws-avatar ws-avatar--on-dark" aria-hidden="true">
              {getInitials(name)}
            </div>

            {!iconOnly && (
              <>
                <div className="ws-account__text">
                  <span className="ws-account__name">{name}</span>
                  <span className="ws-account__sub">
                    {navigation.isAdmin ? "Administrator" : user.email}
                  </span>
                </div>
                {onLogout && (
                  <button
                    type="button"
                    className="ws-icon-btn ws-icon-btn--on-dark"
                    aria-label="Sign out"
                    onClick={onLogout}
                  >
                    <LogOut size={16} strokeWidth={2} />
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}