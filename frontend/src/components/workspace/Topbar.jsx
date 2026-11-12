import { Fragment } from "react";
import { ChevronRight, Menu } from "lucide-react";
import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import ProfileMenu from "./ProfileMenu";

export default function Topbar({
  trail = [],
  user,
  showUser,
  isAdmin,
  drawerOpen,
  menuButtonRef,
  onMenuClick,
  onSearch,
  onSearchChange,
  notificationCount,
  onNotificationsClick,
  profileLinks,
  onLogout,
}) {
  return (
    <header className="ws-topbar">
      {/* Hamburger — mobile only (hidden by CSS on desktop) */}
      <button
        ref={menuButtonRef}
        type="button"
        className="ws-icon-btn ws-topbar__menu"
        aria-label="Open navigation"
        aria-expanded={drawerOpen}
        aria-controls="ws-sidebar"
        onClick={onMenuClick}
      >
        <Menu size={20} strokeWidth={2} />
      </button>

      {trail.length > 0 && (
        <nav className="ws-crumbs" aria-label="Breadcrumb">
          <ol>
            {trail.map((label, i) => {
              const last = i === trail.length - 1;
              return (
                <Fragment key={`${label}-${i}`}>
                  {i > 0 && (
                    <li className="ws-crumbs__sep" aria-hidden="true">
                      <ChevronRight size={14} strokeWidth={2} />
                    </li>
                  )}
                  <li aria-current={last ? "page" : undefined}>{label}</li>
                </Fragment>
              );
            })}
          </ol>
        </nav>
      )}

      <div className="ws-topbar__spacer" />

      <SearchBar onSearch={onSearch} onChange={onSearchChange} />

      <div className="ws-topbar__actions">
        <NotificationButton
          count={notificationCount}
          onClick={onNotificationsClick}
        />
        {showUser && (
          <ProfileMenu
            user={user}
            isAdmin={isAdmin}
            links={profileLinks}
            onLogout={onLogout}
          />
        )}
      </div>
    </header>
  );
}