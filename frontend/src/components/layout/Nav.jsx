import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ChevronDown, Menu, X, LogOut } from "lucide-react";
import { NAV_CONFIG } from "../../Utils/textData/menuConfig";
import { FORCE_COLOURED_NAV } from "../../Utils/textData/navbarColorConfig";
import SmallLoader from "../ui/SmallLoader";
import ChatWidget from "../chatbot/ChatWidget";

import "../../styles/Nav.css";

/* ── Dropdown item ──────────────────────── */
function DropdownItem({ item, onClose }) {
  return (
    <Link to={item.path} className="nav__dropdown-link" onClick={onClose}>
      {item.label}
    </Link>
  );
}

/* ── Nav item (with or without dropdown) ── */
function NavItem({ item, onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  if (item.dropdown) {
    return (
      <div
        ref={ref}
        className="nav__item nav__item--dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="nav__trigger" aria-expanded={open}>
          {item.label}
          <ChevronDown
            size={13}
            strokeWidth={2.5}
            className={`nav__chevron ${open ? "nav__chevron--open" : ""}`}
          />
        </button>
        {open && (
          <div className="nav__dropdown">
            <div className="nav__dropdown-inner">
              {item.dropdown.map((sub) => (
                <DropdownItem key={sub.path} item={sub} onClose={onClose} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="nav__item">
      <Link to={item.path} className="nav__link" onClick={onClose}>
        {item.label}
      </Link>
    </div>
  );
}

/* ── Mobile accordion item ──────────────── */
function MobileNavItem({ item, onClose, activeDropdown, setActiveDropdown }) {
  const id = item.label;
  const open = activeDropdown === id;

  const toggle = () => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  if (item.dropdown) {
    return (
      <div className="nav__mob-item">
        <button
          className="nav__mob-trigger"
          onClick={toggle}
          aria-expanded={open}
        >
          {item.label}
          <ChevronDown
            size={14}
            strokeWidth={2.5}
            className={`nav__chevron ${open ? "nav__chevron--open" : ""}`}
          />
        </button>
        {open && (
          <div className="nav__mob-dropdown">
            {item.dropdown.map((sub) => (
              <Link
                key={sub.path}
                to={sub.path}
                className="nav__mob-link"
                onClick={onClose}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="nav__mob-item">
      <Link
        to={item.path}
        className="nav__mob-link nav__mob-link--top"
        onClick={onClose}
      >
        {item.label}
      </Link>
    </div>
  );
}

/* ── Main Nav ───────────────────────────── */
export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "ADMIN";
  const isTutor = user?.role === "TUTOR";
  const isParent = user?.role === "PARENT";
  const currentRole = !isLoggedIn
    ? "guest"
    : isAdmin
      ? "admin"
      : isTutor
        ? "tutor"
        : isParent
          ? "parent"
          : "student";

  const navItems = NAV_CONFIG[currentRole];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const forceColored = FORCE_COLOURED_NAV.some((r) =>
    location.pathname.startsWith(r),
  );
  const isColored = forceColored || scrolled;

  /* Scroll */
  useEffect(() => {
    const onScroll = () => {
      if (!forceColored) setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceColored]);

  /* Lock body on mobile open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  //handle responsiveness
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 1000) {
      setMobileOpen(false);
    }
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  /* Close mobile on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      navigate("/");
      logout();
      setLoggingOut(false);
    }, 2000);
  };

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav className={`nav ${isColored ? "nav--colored" : "nav--transparent"}`}>
        <div className="nav__inner">
          {/* Logo */}
          <Link to="/" className="nav__logo" onClick={closeMobile}>
            <span className="nav__logo-course">Course</span>
            <span className="nav__logo-match">Match</span>
          </Link>

          {/* Desktop links */}
          <div className="nav__links">
            {navItems?.main?.map((item) => (
              <NavItem
                key={item.path || item.label}
                item={item}
                onClose={closeMobile}
              />
            ))}
          </div>

            <ChatWidget />
            
          {/* Desktop actions */}
          <div className="nav__actions">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav__btn nav__btn--ghost">
                  Sign in
                </Link>
                <Link to="/register" className="nav__btn nav__btn--primary">
                  Get started
                </Link>
              </>
            ) : (
              <button
                className="nav__btn nav__btn--logout"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? (
                  <SmallLoader />
                ) : (
                  <LogOut size={15} strokeWidth={2} />
                )}
                {loggingOut ? "Signing out…" : "Sign out"}
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav__burger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={2} />
            ) : (
              <Menu size={22} strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav__drawer ${mobileOpen ? "nav__drawer--open" : ""}`}>
        <div className="nav__drawer-inner">
          <div className="nav__drawer-links">
            {navItems?.main?.map((item) => (
              <MobileNavItem
                key={item.path || item.label}
                item={item}
                onClose={closeMobile}
                activeDropdown={activeMobileDropdown}
                setActiveDropdown={setActiveMobileDropdown}
              />
            ))}
          </div>

          <div className="nav__drawer-footer">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="nav__drawer-btn nav__drawer-btn--ghost"
                  onClick={closeMobile}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="nav__drawer-btn nav__drawer-btn--primary"
                  onClick={closeMobile}
                >
                  Get started
                </Link>
              </>
            ) : (
              <button
                className="nav__drawer-btn nav__drawer-btn--logout"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? (
                  <SmallLoader />
                ) : (
                  <LogOut size={15} strokeWidth={2} />
                )}
                {loggingOut ? "Signing out…" : "Sign out"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && <div className="nav__overlay" onClick={closeMobile} />}
    </>
  );
}
