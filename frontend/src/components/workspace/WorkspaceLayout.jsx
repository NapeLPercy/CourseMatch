import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { getActiveTrail } from "./navUtils";
import "../../styles/Workspace.css";

const COLLAPSE_KEY = "cm-sidebar-collapsed";
const MOBILE_QUERY = "(max-width: 900px)";

function readCollapsed() {
  try {
    return localStorage.getItem(COLLAPSE_KEY) === "1";
  } catch {
    return false;
  }
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * Role-agnostic application shell.
 *
 * Props
 *  navigation            Config object. Every array-valued key is rendered as a
 *                        nav section. Items: { path, label, icon? } or
 *                        { label, icon?, dropdown: [{ path, label }] }.
 *                        Metadata: showUser (account UI), isAdmin (admin badge).
 *  user                  { name?, email?, ... } — display only.
 *  brand                 Optional node to replace the default wordmark.
 *  children              Optional. Falls back to <Outlet /> for route layouts.
 *  onSearch(query)       Called when the search form is submitted.
 *  onSearchChange(query) Called on every keystroke (optional).
 *  notificationCount     Number of unread notifications (shows the dot).
 *  onNotificationsClick  Called when the bell is pressed.
 *  profileLinks          Optional [{ label, path }] shown in the profile menu.
 *  onLogout              Called from the sign-out buttons.
 */
export default function WorkspaceLayout({
  navigation,
  user,
  brand,
  children,
  onSearch,
  onSearchChange,
  notificationCount = 0,
  onNotificationsClick,
  profileLinks,
  onLogout,
}) {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const menuButtonRef = useRef(null);
  const wasOpen = useRef(false);

  // The persisted collapsed state only applies on desktop.
  const iconOnly = collapsed && !isMobile;

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Close the drawer after navigation.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Close the drawer if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);

  // Escape to close + lock background scroll while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  // Hand focus back to the hamburger when the drawer closes.
  useEffect(() => {
    if (wasOpen.current && !drawerOpen) menuButtonRef.current?.focus();
    wasOpen.current = drawerOpen;
  }, [drawerOpen]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* storage unavailable — keep in-memory state */
      }
      return next;
    });
  }, []);

  const expandSidebar = useCallback(() => {
    setCollapsed(false);
    try {
      localStorage.setItem(COLLAPSE_KEY, "0");
    } catch {
      /* ignore */
    }
  }, []);

  const showUser = Boolean(navigation?.showUser && user);
  const trail = getActiveTrail(navigation, pathname);

  return (
    <div className={`ws${iconOnly ? " ws--collapsed" : ""}`}>
      <a href="#ws-content" className="ws__skip">
        Skip to content
      </a>

      <Sidebar
        navigation={navigation}
        user={user}
        brand={brand}
        iconOnly={iconOnly}
        isMobile={isMobile}
        open={drawerOpen}
        onToggleCollapse={toggleCollapsed}
        onExpand={expandSidebar}
        onClose={closeDrawer}
        onLogout={onLogout}
      />

      <div
        className={`ws__backdrop${drawerOpen ? " ws__backdrop--visible" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div className="ws__main">
        <Topbar
          trail={trail}
          user={user}
          showUser={showUser}
          isAdmin={Boolean(navigation?.isAdmin)}
          drawerOpen={drawerOpen}
          menuButtonRef={menuButtonRef}
          onMenuClick={() => setDrawerOpen(true)}
          onSearch={onSearch}
          onSearchChange={onSearchChange}
          notificationCount={notificationCount}
          onNotificationsClick={onNotificationsClick}
          profileLinks={profileLinks}
          onLogout={onLogout}
        />

        <main className="ws__content" id="ws-content" tabIndex={-1}>
          <div className="ws__content-inner">{children ?? <Outlet />}</div>
        </main>
      </div>
    </div>
  );
}