import React, { useState } from "react";
import { GraduationCap, Plus, Edit3 } from "lucide-react";
import "../../styles/ManageQualifications.css";
import AddBlogPost from "../forms/AddBlogPost";
import AdminViewBlogs from "./AdminViewBlog";
export default function ManageBlogs() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="mc">
      {/* Page header */}
      <header className="mc__header">
        <div className="mc__header-icon">
          <GraduationCap size={28} strokeWidth={1.6} />
        </div>
        <div className="mc__header-text">
          <h1 className="mc__title">Manage Blogs</h1>
          <p className="mc__subtitle">
            Add new blogs or edit and delete existing ones.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="mc__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "add"}
          className={`mc__tab ${activeTab === "add" ? "mc__tab--active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>Add Blog</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "edit"}
          className={`mc__tab ${activeTab === "edit" ? "mc__tab--active" : ""}`}
          onClick={() => setActiveTab("edit")}
        >
          <Edit3 size={16} strokeWidth={2.2} />
          <span>Edit/Delete Blogs</span>
        </button>
      </nav>

      {/* Tab content */}
      <div className="mc__content">
        {activeTab === "add" && <AddBlogPost />}

        {activeTab === "edit" && <AdminViewBlogs />}
      </div>
    </div>
  );
}
