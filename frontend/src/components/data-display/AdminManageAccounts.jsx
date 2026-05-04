import React, { useState } from "react";
import { Users, Plus, List, X } from "lucide-react";
import AdminAddUniversity from "../forms/AdminAddUniversity";
import AdminUserList from "./AdminViewUsers";
import "../../styles/AdminManageUniversities.css";

export default function AdminManageAccounts() {
  const [activeTab, setActiveTab] = useState("add"); // "add" | "view"

  return (
    <div className="mu">
      {/* Page header */}
      <header className="mu__header">
        <div className="mu__header-icon">
          <Users size={28} strokeWidth={1.6} />
        </div>
        <div className="mu__header-text">
          <h1 className="mu__title">Manage Users</h1>
          <p className="mu__subtitle">
            Add new users or manage existing ones.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="mu__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "add"}
          className={`mu__tab ${activeTab === "add" ? "mu__tab--active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>Add Users</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "view"}
          className={`mu__tab ${activeTab === "view" ? "mu__tab--active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          <List size={16} strokeWidth={2.2} />
          <span>View/Edit Users</span>
        </button>
      </nav>

      {/* Tab content */}
      <div className="mu__content">
        {activeTab === "add" && <AdminAddUniversity />}
        {activeTab === "view" && <AdminUserList />}
      </div>
    </div>
  );
}