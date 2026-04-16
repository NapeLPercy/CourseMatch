import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// helper to map role → dashboard
function getDashboardRoute(role) {
  switch (role) {
    case "STUDENT":
      return "/student/dashboard";
    case "PARENT":
      return "/parent/dashboard";
    case "TUTOR":
      return "/tutor/dashboard";
    case "GUEST":
      return "/welcome"; // fallback if no role
  }
}

export default function RoleRoute({ allowedRoles = [] }) {
  const { user, authLoading } = useAuth();

  if (authLoading) return null;

  if (!user) return <Navigate to="/" replace />;

  const role = String(user.role || "").toUpperCase();

  // NEW: handle users with no role (onboarding)
  if (!role) {
    return <Navigate to="/not-authorized" replace />;
  }

  const ok = allowedRoles.map((r) => String(r).toUpperCase()).includes(role);

  // NEW: instead of "not-authorized", redirect smartly
  if (!ok) {
    return <Navigate to={getDashboardRoute(role)} replace />;
  }

  return <Outlet />;
}

/*export default function RoleRoute({ allowedRoles = [] }) {
  const { user, authLoading } = useAuth();

  if (authLoading) return null;

  if (!user) return <Navigate to="/login" replace />;

  // normalize role (your DB might return "ADMIN" or "admin")
  const role = String(user.role || "").toUpperCase();

  const ok = allowedRoles.map(r => String(r).toUpperCase()).includes(role);

  if (!ok) {
    return <Navigate to="/not-authorized" replace />; // or "/not-authorized"
  }

  return <Outlet />;
}*/
