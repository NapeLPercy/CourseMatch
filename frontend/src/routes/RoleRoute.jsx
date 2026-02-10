import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRoute({ allowedRoles = [] }) {
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
}
