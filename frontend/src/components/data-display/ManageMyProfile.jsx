import React, { useState } from "react";
import { User, Plus, List } from "lucide-react";
import AddMyProfile from "../forms/AddMyProfile";
import ViewMyProfile from "./ViewMyProfile";
import "../../styles/ManageMyProfile.css";

export default function ManageMyProfile() {
  const [activeTab, setActiveTab] = useState("add"); // "add" | "view"

  return (
    <div className="mp">
      {/* Page header */}
      <header className="mp__header">
        <div className="mp__header-icon">
          <User size={28} strokeWidth={1.6} />
        </div>
        <div className="mp__header-text">
          <h1 className="mp__title">Manage Your Profile for AI recommendations</h1>
          <p className="mp__subtitle">
            Add new your personal profile or view and edit existing one.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="mp__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "add"}
          className={`mp__tab ${activeTab === "add" ? "mp__tab--active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>Add Profile</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "view"}
          className={`mp__tab ${activeTab === "view" ? "mp__tab--active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          <List size={16} strokeWidth={2.2} />
          <span>View/Edit Profiles</span>
        </button>
      </nav>

      {/* Tab content */}
      <div className="mp__content">
        {activeTab === "add" && <AddMyProfile />}
        {activeTab === "view" && <ViewMyProfile />}
      </div>
    </div>
  );
}