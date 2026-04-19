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

import AddSubjects from "./components/forms/AddSubjects";
import ManageMyProfile from "./components/data-display/ManageMyProfile";

//subjects
import ViewSubjectsPage from "./components/data-display/ViewSubjectsPage";
import StudentDashboard from "./components/data-display/StudentDashboard";
import TutorDashboard from "./components/data-display/TutorDashboard";
import ParentDashboard from "./components/data-display/ParentDashboard";
import StudentViewUniversities from "./components/data-display/StudentViewUniversities";
import UniversityCourses from "./components/data-display/UnivesityCourses";

//auth
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

import Chat from "./components/layout/Chat";
import MainLayout from "./components/layout/MainLayout";
import NavLayout from "./components/layout/NavLayout";
import AuthLayout from "./components/layout/AuthLayout";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import AdminAddQualification from "./components/forms/AdminAddCourse";
import AdminManageQualifications from "./components/data-display/AdminManageQualifications";
import AdminViewQualification from "./components/data-display/AdminViewQualification";
import AdminDashboard from "./components/data-display/AdminDashboard";
import AdminManageUniversities from "./components/data-display/AdminManageUniversities";
import NotAuthorized from "./pages/NotAuthorized";
import RoleRoute from "./routes/RoleRoute";
import StudentMatchedCourses from "./components/data-display/StudentMatchedCourses";
//cookies
import CookieModal from "./components/data-display/CookieModal";
import RouteTracking from "./routes/RouteTracking";
//terms
import TermsAndConditions from "./components/data-display/TermsAndConditions";
import ScrollToTop from "./components/ScrollToTop";
import WelcomeOnboarding from "./components/data-display/WelcomeOnboarding";
import GuestCalculateAPS from "./components/forms/GuestCalculateAPS";
import TutorHome from "./pages/TutorHome";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import ManageBlogs from "./components/data-display/ManageBlogs";
import DeepDive from "./components/data-display/DeepDive";
function App() {
  return (
    <UserProvider>
      <CourseProvider>
        <SubjectProvider>
          <Router>
            <ScrollToTop />
            <CookieModal />
            <RouteTracking />

            <Routes>
              {/* Public pages with nav/footer */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />

                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogPost />} />
              </Route>

              {/* Shows nav only */}
              <Route element={<NavLayout />}>
                {/*GUEST */}

                <Route path="/aps-calculator" element={<GuestCalculateAPS />} />

                {/* Logged-in routes (STUDENT) */}
                <Route element={<RoleRoute allowedRoles={["STUDENT"]} />}>
                  <Route
                    path="/student/add/subjects"
                    element={<AddSubjects />}
                  />
                  <Route
                    path="/student/view/subjects"
                    element={<ViewSubjectsPage />}
                  />
                  <Route
                    path="/student/dashboard"
                    element={<StudentDashboard />}
                  />
                  <Route
                    path="/view-courses"
                    element={<StudentViewUniversities />}
                  />

                  <Route
                    path="/my-courses"
                    element={<StudentMatchedCourses />}
                  />
                  <Route
                    path="/view-courses/:courseSlug"
                    element={<UniversityCourses />}
                  />
                  <Route
                    path="/student/manage-my-profile"
                    element={<ManageMyProfile />}
                  />

                  <Route
                    path="/student/course-deep-dive"
                    element={<DeepDive />}
                  />
                </Route>

                {/* Logged-in routes (PARENT) */}
                <Route element={<RoleRoute allowedRoles={["PARENT"]} />}>
                  <Route
                    path="/parent/dashboard"
                    element={<ParentDashboard />}
                  />
                </Route>

                {/* Logged-in routes (TUTOR) */}
                <Route element={<RoleRoute allowedRoles={["TUTOR"]} />}>
                  <Route path="/tutor/dashboard" element={<TutorDashboard />} />
                </Route>

                {/* Logged-in routes (ADMIN) */}
                <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route
                    path="/admin/manage-qualifications"
                    element={<AdminManageQualifications />}
                  />
                  <Route
                    path="/admin/manage-universities"
                    element={<AdminManageUniversities />}
                  />
                  <Route
                    path="/admin/add-qualification"
                    element={<AdminAddQualification />}
                  />
                  <Route
                    path="/admin/view-qualifications"
                    element={<AdminViewQualification />}
                  />

                  <Route path="/admin/manage-blogs" element={<ManageBlogs />} />
                </Route>
              </Route>

              {/* Logged-in routes (ADMIN) */}
              <Route element={<RoleRoute allowedRoles={["GUEST"]} />}>
                <Route path="/welcome" element={<WelcomeOnboarding />} />
              </Route>

              {/* Full screen auth pages */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Account />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>

              <Route path="*" element={<NotFound />} />
              <Route path="/not-authorized" element={<NotAuthorized />} />
            </Routes>
          </Router>
        </SubjectProvider>
      </CourseProvider>
    </UserProvider>
  );
}

export default App;
