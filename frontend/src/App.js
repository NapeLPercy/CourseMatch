import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserProvider } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";
import { SubjectProvider } from "./context/SubjectContext";

import Login from "./pages/Login";
import Account from "./pages/Account";
import Home from "./pages/Home";
import About from "./pages/About";

import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

import AddSubjects from "./components/forms/AddSubject";
import UserProfileForm from "./components/forms/UserProfileForm";

//subjects
import ViewSubjectsPage from "./components/data-display/ViewSubjectsPage";
import Dashboard from "./components/data-display/Dashboard";
import ViewCourses from "./components/data-display/ViewCourses";
import UniversityCourses from "./components/data-display/UnivesityCourses";

//auth
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

import Chat from "./components/layout/Chat";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import AdminAddQualification from "./components/forms/AddCourse";
import ManageQualifications from "./components/data-display/ManageQualifications";
import AdminViewQualification from "./components/data-display/AdminViewQualification";
import AdminDashboard from "./components/data-display/AdminDashboard";
import AdminManageUniversities from "./components/data-display/AdminManageUniversities";
function App() {
  return (
    <UserProvider>
      <CourseProvider>
        <SubjectProvider>
          <Router>
            <Routes>
              {/*Nav, Footer included screen pages */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/add-subjects" element={<AddSubjects />} />
                <Route path="/add-profile" element={<UserProfileForm />} />
                <Route path="/my-subjects" element={<ViewSubjectsPage />} />
                <Route path="/my-dashboard" element={<Dashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/view-courses" element={<ViewCourses />} />

                <Route
                  path="/view-courses/:courseSlug"
                  element={<UniversityCourses />}
                />

                <Route path="/contact-us" element={<Contact />} />
              </Route>

              {/*Full screen pages */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Account />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<NotFound />} />

                <Route
                  path="/admin/manage-qualifications"
                  element={<ManageQualifications />}
                />

                <Route
                  path="/admin/manage-universities"
                  element={<AdminManageUniversities />}
                />
              </Route>
            </Routes>
          </Router>
        </SubjectProvider>
      </CourseProvider>
    </UserProvider>
  );
}

export default App;
