import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { NAV_CONFIG } from "../../Utils/textData/menuConfig";
import "../../styles/Nav.css";
import SmallLoader from "../ui/SmallLoader";

export default function Nav() {
  const { user, logout } = useAuth();

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

  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});

  // Pages where navbar must be colored immediately
  const forceColoredRoutes = [
    "/student/course-deep-dive",
    "/admin/manage-blogs",
    "/blog/",
    "/blogs",
    "/my-courses",
    "/tutors/home",
    "/aps-calculator",
    "/view-courses",
    "/student/add/subjects",
    "/student/dashboard",
    "/tutor/dashboard",
    "/parent/dashboard",
    "/admin/dashboard",
    "/student/manage-my-profile",
    "/admin/manage-qualifications",
    "/admin/manage-universities",
    "/contact-us",
    "/student/view/subjects",
    "/login",
    "/register",
    "/terms-and-conditions",
    "/welcome",
    "/faq",
    "/about",
  ];

  const forceColored = forceColoredRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      if (forceColored) return;
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceColored]);

  const navColored = forceColored || scrolled;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      const isInsideDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(e.target),
      );

      if (isInsideDropdown) return; // ✅ ignore internal clicks

      setOpenDropdowns({});
    };

    //document.addEventListener("mousedown", handler);
    //document.addEventListener("click", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobile]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobile(false);
    setOpenDropdowns({});
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setMobile(false); // close overlay
        setOpenDropdowns({}); // optional: reset dropdowns (prevents weird states)
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setLogOut(true);
    setTimeout(() => {
      navigate("/");
      logout();

      setLogOut(false);
    }, 3000);
  };

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Render a single nav item (with or without dropdown)
  const renderNavItem = (item, index, isMobile = false) => {
    const key = `${item.label}-${index}`;
    const Icon = item.icon;

    // Item with dropdown
    if (item.dropdown) {
      const isOpen = openDropdowns[key];

      return (
        <div
          key={key}
          ref={(el) => (dropdownRefs.current[key] = el)}
          className="nav__dropdown-wrap"
        >
          <button
            type="button"
            className={`nav__dropdown-trigger ${
              isOpen ? "nav__dropdown-trigger--open" : ""
            } ${isMobile ? "nav__overlay-link" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown(key);
            }}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            {Icon && (
              <Icon size={15} strokeWidth={2} className="nav__link-icon" />
            )}
            {item.label}
            <ChevronDown
              size={14}
              strokeWidth={2.2}
              className={`nav__dropdown-chevron ${
                isOpen ? "nav__dropdown-chevron--open" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="nav__dropdown-panel">
              {item.dropdown.map((subItem, subIndex) => {
                const SubIcon = subItem.icon;
                console.log(subItem.path);
                return (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className="nav__dropdown-item"
                    onClick={() => {
                      requestAnimationFrame(() => {
                        setOpenDropdowns({});
                        setMobile(false);
                      });
                    }}
                  >
                    {SubIcon && <SubIcon size={15} strokeWidth={2} />}
                    {subItem.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // Regular link
    return (
      <Link
        key={key}
        to={item.path}
        className={`nav__link ${isActive(item.path) ? "nav__link--active" : ""} ${
          isMobile ? "nav__overlay-link" : ""
        }`}
        onClick={() => setMobile(false)}
      >
        {Icon && <Icon size={15} strokeWidth={2} className="nav__link-icon" />}
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* Main nav bar */}
      <nav className={`nav ${navColored ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          {/* Logo */}
          <Link to="/" className="nav__logo" onClick={() => setMobile(false)}>
            Course<span className="nav__logo-accent">Match</span>
          </Link>

          {/* Desktop links */}
          <div className="nav__desktop">
            {navItems.main.map((item, index) =>
              renderNavItem(item, index, false),
            )}

            {/* Guest actions (login/signup buttons) */}
            {navItems.actions && (
              <>
                <Link
                  to={navItems.actions.login.path}
                  className={`nav__action-btn nav__action-btn--${navItems.actions.login.variant}`}
                >
                  <navItems.actions.login.icon size={15} strokeWidth={2} />
                  {navItems.actions.login.label}
                </Link>
                <Link
                  to={navItems.actions.signup.path}
                  className={`nav__action-btn nav__action-btn--${navItems.actions.signup.variant}`}
                >
                  <navItems.actions.signup.icon size={15} strokeWidth={2} />
                  {navItems.actions.signup.label}
                </Link>
              </>
            )}

            {/* Logged-in user pill + logout */}
            {navItems.showUser && (
              <div className="nav__user">
                <div
                  className={`nav__avatar ${
                    navItems.isAdmin ? "nav__avatar--admin" : ""
                  }`}
                >
                  <User size={15} strokeWidth={2} />
                </div>
                <button
                  type="button"
                  className="nav__logout"
                  onClick={handleLogout}
                  disabled={logOut}
                >
                  {logOut ? (
                    <SmallLoader />
                  ) : (
                    <LogOut size={15} strokeWidth={2} />
                  )}
                  {logOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}

          <button
            type="button"
            className="nav__hamburger"
            onClick={() => setMobile((o) => !o)}
            aria-label={mobile ? "Close menu" : "Open menu"}
          >
            {mobile ? (
              <X size={22} strokeWidth={2} />
            ) : (
              <Menu size={22} strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`nav__overlay ${mobile ? "nav__overlay--open" : ""}`}>
        <div className="nav__overlay-inner">
          {/* Close button */}
          <button
            type="button"
            className="nav__overlay-close"
            onClick={() => setMobile(false)}
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={2} />
          </button>

          {/* Links */}
          <div className="nav__overlay-links">
            {navItems.main.map((item, index) =>
              renderNavItem(item, index, true),
            )}

            {/* Guest actions */}
            {navItems.actions && (
              <>
                <div className="nav__overlay-divider" />
                <Link
                  to={navItems.actions.login.path}
                  className="nav__overlay-link nav__overlay-link--ghost"
                  //nav__overlay-link nav__overlay-link--primary"
                  onClick={() => setMobile(false)}
                >
                  <navItems.actions.login.icon size={18} strokeWidth={2} />
                  {navItems.actions.login.label}
                </Link>
                <Link
                  to={navItems.actions.signup.path}
                  className="nav__overlay-link nav__overlay-link--primary"
                  onClick={() => setMobile(false)}
                >
                  <navItems.actions.signup.icon size={18} strokeWidth={2} />
                  {navItems.actions.signup.label}
                </Link>
              </>
            )}

            {/* Logged-in logout button */}
            {navItems.showUser && (
              <>
                <div className="nav__overlay-divider" />
                <button
                  type="button"
                  className="nav__overlay-logout"
                  onClick={handleLogout}
                  disabled={logOut}
                >
                  {logOut ? (
                    <SmallLoader />
                  ) : (
                    <LogOut size={18} strokeWidth={2} />
                  )}
                  {logOut ? "Logging out..." : "Logout"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
