import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  BookOpen,
  FileText,
  GraduationCap,
  Home,
  Info,
  LogIn,
  UserPlus,
  TrendingUpDown,
  Building2,
} from "lucide-react";
import "../../styles/Nav.css";

export default function Nav() {
  const { user, logout } = useAuth();

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "ADMIN";
  const isStudent = isLoggedIn && !isAdmin;

  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false); // frosted on scroll
  const [mobile, setMobile] = useState(false); // mobile drawer open
  const [accountOpen, setAccountOpen] = useState(false); // desktop dropdown
  const dropdownRef = useRef(null);

  //Checks if user access white coloured pages which requires the
  // nav bar to just be blue-like, even without a scroll
  // useRouteMatchIncludes();

  // Pages where navbar must be colored immediately
  const forceColoredRoutes = [
    "/view-courses",
    "/add-subjects",
    "/my-dashboard",
    "/admin/dashboard",
    "/student/manage-my-profile",
    "/admin/manage-qualifications",
    "/admin/manage-universities",
    "/contact-us",
    "/my-subjects",
    "/login",
    "/register",
    "/terms-and-conditions",
  ];

  // derived state (no setState)
  const forceColored = forceColoredRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  // ── Scroll listener ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      // If the route forces colored nav, ignore scroll state
      if (forceColored) return;
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceColored]);

  const navColored = forceColored || scrolled;

  // ── Close dropdown on outside click ──────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setAccountOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Lock body scroll when mobile drawer is open ─────────
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobile]);

  // ── Close mobile drawer on route change ──────────────────
  useEffect(() => {
    setMobile(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setLogOut(true);

    setTimeout(() => {
      logout();
      navigate("/");
      setLogOut(false);
    }, 3000);
  };

  const isActive = (path) => location.pathname === path;

  /* ─── Shared link component ────────────────────────────── */
  const NavLink = ({ to, icon: Icon, children, className = "" }) => (
    <Link
      to={to}
      className={`nav__link ${isActive(to) ? "nav__link--active" : ""} ${className}`}
      onClick={() => setMobile(false)}
    >
      {Icon && <Icon size={15} strokeWidth={2} className="nav__link-icon" />}
      {children}
    </Link>
  );

  /* ─── RENDER ───────────────────────────────────────────── */
  return (
    <>
      {/* ════ Main bar ════ */}
      <nav className={`nav ${navColored ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          {/* Logo */}
          <Link to="/" className="nav__logo" onClick={() => setMobile(false)}>
            Course<span className="nav__logo-accent">Match</span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="nav__desktop">
            {/*NON LOGGED IN USERS*/}
            {!isLoggedIn && (
              <>
                <NavLink to="/" icon={Home}>
                  Home
                </NavLink>
                <NavLink to="/about" icon={Info}>
                  About Us
                </NavLink>

                {/* Account dropdown */}
                <div ref={dropdownRef} className="nav__dropdown-wrap">
                  <button
                    type="button"
                    className={`nav__dropdown-trigger ${accountOpen ? "nav__dropdown-trigger--open" : ""}`}
                    onClick={() => setAccountOpen((o) => !o)}
                    aria-haspopup="true"
                    aria-expanded={accountOpen}
                  >
                    Account
                    <ChevronDown
                      size={14}
                      strokeWidth={2.2}
                      className={`nav__dropdown-chevron ${accountOpen ? "nav__dropdown-chevron--open" : ""}`}
                    />
                  </button>

                  {accountOpen && (
                    <div className="nav__dropdown-panel">
                      <Link
                        to="/login"
                        className="nav__dropdown-item"
                        onClick={() => setAccountOpen(false)}
                      >
                        <LogIn size={15} strokeWidth={2} /> Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="nav__dropdown-item"
                        onClick={() => setAccountOpen(false)}
                      >
                        <UserPlus size={15} strokeWidth={2} /> Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}

            {/*LOGGED IN USER === STUDENT*/}
            {isStudent && (
              <>
                <NavLink to="/my-dashboard" icon={TrendingUpDown}>
                  DashBoard
                </NavLink>
                <NavLink to="/my-subjects" icon={BookOpen}>
                  My Subjects
                </NavLink>

                <NavLink to="/add-subjects" icon={FileText}>
                  Add Subjects
                </NavLink>

                <NavLink to="/student/manage-my-profile" icon={User}>
                  Manage profile
                </NavLink>

                <NavLink to="/view-courses" icon={GraduationCap}>
                  Courses
                </NavLink>

                {/* User pill + logout */}
                <div className="nav__user">
                  <div className="nav__avatar">
                    <User size={15} strokeWidth={2} />
                  </div>
                  <button
                    type="button"
                    className="nav__logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={15} strokeWidth={2} />

                    {logOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </>
            )}

            {/*LOGGED IN USER === ADMIN*/}
            {isAdmin && (
              <>
                <NavLink to="/admin/dashboard" icon={TrendingUpDown}>
                  Admin Dashboard
                </NavLink>
                <NavLink to="/admin/manage-qualifications" icon={GraduationCap}>
                  Manage Qualifications
                </NavLink>
                <NavLink to="/admin/manage-universities" icon={Building2}>
                  Universities & Faculties
                </NavLink>
                <NavLink to="/admin/reports" icon={FileText}>
                  Reports
                </NavLink>

                {/* admin pill */}
                <div className="nav__user">
                  <div className="nav__avatar nav__avatar--admin">
                    <User size={15} />
                  </div>
                  <button
                    type="button"
                    className="nav__logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={15} strokeWidth={2} />

                    {logOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
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

      {/* ════ Mobile overlay ════ */}
      <div className={`nav__overlay ${mobile ? "nav__overlay--open" : ""}`}>
        <div className="nav__overlay-inner">
          {/* Close */}
          <button
            type="button"
            className="nav__overlay-close"
            onClick={() => setMobile(false)}
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={2} />
          </button>

          {/* Logo inside overlay */}
          <Link
            to="/"
            className="nav__logo nav__overlay-logo"
            onClick={() => setMobile(false)}
          >
            Course<span className="nav__logo-accent">Match</span>
          </Link>

          {/* Links */}
          <div className="nav__overlay-links">
            {!isLoggedIn && (
              <>
                <NavLink to="/" icon={Home} className="nav__overlay-link">
                  Home
                </NavLink>
                <NavLink to="/about" icon={Info} className="nav__overlay-link">
                  About Us
                </NavLink>
                <div className="nav__overlay-divider" />
                <NavLink to="/login" icon={LogIn} className="nav__overlay-link">
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  icon={UserPlus}
                  className="nav__overlay-link"
                >
                  Sign Up
                </NavLink>
              </>
            )}

            {isStudent && (
              <>
                <NavLink
                  to="/my-dashboard"
                  icon={TrendingUpDown}
                  className="nav__overlay-link"
                >
                  DashBoard
                </NavLink>

                <NavLink
                  to="/add-subjects"
                  icon={FileText}
                  className="nav__overlay-link"
                >
                  Add Subjects
                </NavLink>
                <NavLink
                  to="/my-subjects"
                  icon={BookOpen}
                  className="nav__overlay-link"
                >
                  My Subjects
                </NavLink>

                <NavLink to="/student/manage-my-profile" icon={User}>
                  Manage profile
                </NavLink>

                <NavLink
                  to="/view-courses"
                  icon={GraduationCap}
                  className="nav__overlay-link"
                >
                  Courses
                </NavLink>
                <div className="nav__overlay-divider" />
                <button
                  type="button"
                  className="nav__overlay-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={18} strokeWidth={2} />
                  {logOut ? "Logging out..." : "Logout"}
                </button>
              </>
            )}

            {isAdmin && (
              <>
                <NavLink
                  to="/admin/dashboard"
                  icon={TrendingUpDown}
                  className="nav__overlay-link"
                >
                  Admin Dashboard
                </NavLink>
                <NavLink
                  to="/admin/manage-qualifications"
                  icon={GraduationCap}
                  className="nav__overlay-link"
                >
                  Manage Qualifications
                </NavLink>
                <NavLink
                  to="/admin/manage-universities"
                  icon={Building2}
                  className="nav__overlay-link"
                >
                  Universities & Faculties
                </NavLink>

                <NavLink to="/admin/reports" icon={FileText}>
                  Reports
                </NavLink>

                <div className="nav__overlay-divider" />
                <button
                  type="button"
                  className="nav__overlay-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={18} strokeWidth={2} />
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
