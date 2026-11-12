import {
  Home,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  FolderOpen,
  UserRound,
  Wrench,
  Users,
  Lightbulb,
  UserCog,
  CalendarDays,
  MessageSquare,
  University,
  FileText,
  UserPlus,
  Newspaper,
  BarChart3,
} from "lucide-react";

export const NAV_CONFIG = {
  guest: {
    main: [
      {
        path: "/",
        label: "Home",
      },
      {
        label: "Course Categories",
        dropdown: [
          {
            path: "/bachelor-degree-courses",
            label: "Bachelor Degrees",
          },
          {
            path: "/diploma-courses",
            label: "Diploma Courses",
          },
          {
            path: "/higher-certificate-courses",
            label: "Higher Certificates",
          },
          {
            path: "/extended-programmes",
            label: "Extended Programmes",
          },
          {
            path: "/courses-without-maths",
            label: "Courses Without Maths",
          },
        ],
      },
      {
        label: "Tools",
        dropdown: [
          {
            path: "/aps-calculator",
            label: "APS Calculators",
          },
          {
            path: "/nsfas-eligibility-checker",
            label: "NSFAS Eligibility Checker",
          },
          {
            path: "/university-prospectuses",
            label: "Prospectus Downloader",
          },
        ],
      },
      { path: "/features", label: "Features" },
      { path: "/blogs", label: "Blog" },
      {
        path: "/contact-us",
        label: "Contact",
      },
    ],
  },

  student: {
    main: [
      {
        path: "/student/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Subjects",
        icon: BookOpen,
        dropdown: [
          {
            path: "/student/add/subjects",
            label: "Add Subjects",
          },
          {
            path: "/student/view/subjects",
            label: "View Subjects",
          },
        ],
      },
      {
        label: "Courses",
        icon: GraduationCap,
        dropdown: [
          {
            path: "/view-courses",
            label: "Find Your Courses",
          },
          {
            path: "/student/view/my-recommeded-courses",
            label: "AI Recommended Courses",
          },
          {
            path: "/student/ai-recommended-courses",
            label: "Qualifications Details",
          },
          {
            path: "/student/course-comparisons",
            label: "Compare Qualifications",
          },
        ],
      },
      {
        label: "Course Categories",
        icon: FolderOpen,
        dropdown: [
          {
            path: "/bachelor-degree-courses",
            label: "Bachelor Degrees",
          },
          {
            path: "/diploma-courses",
            label: "Diploma Courses",
          },
          {
            path: "/higher-certificate-courses",
            label: "Higher Certificates",
          },
          {
            path: "/extended-programmes",
            label: "Extended Programmes",
          },
          {
            path: "/courses-without-maths",
            label: "Courses Without Maths",
          },
        ],
      },
      {
        label: "Personality",
        icon: UserRound,
        dropdown: [
          {
            path: "/student/add/personality",
            label: "Add Personality",
          },
          {
            path: "/student/view/personality",
            label: "View Personality",
          },
        ],
      },
      {
        label: "Tools",
        icon: Wrench,
        dropdown: [
          {
            path: "/aps-calculator",
            label: "APS Calculator",
          },
          {
            path: "/nsfas-eligibility-checker",
            label: "NSFAS Eligibility Checker",
          },
          {
            path: "/university-prospectuses",
            label: "Prospectus Downloader",
          },
        ],
      },
    ],
    showUser: true,
    isAdmin: false,
  },

  parent: {
    main: [
      {
        path: "/parent/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "My Child",
        icon: Users,
        dropdown: [
          { path: "/student/view/subjects", label: "Subjects" },
          { path: "/lessons", label: "Lessons" },
          { path: "/student/progress", label: "Progress" },
        ],
      },
      {
        label: "Course Insights",
        icon: Lightbulb,
        dropdown: [
          {
            path: "/matched-courses",
            label: "Matched Courses",
          },
          { path: "/view-courses", label: "All Courses" },
        ],
      },
      {
        path: "/student/manage-my-profile",
        label: "Manage Profile",
        icon: UserCog,
      },
    ],
    showUser: true,
    isAdmin: false,
  },

  tutor: {
    main: [
      {
        path: "/tutor/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "My Students",
        icon: Users,
        dropdown: [
          { path: "/students", label: "All Students" },
          { path: "/student/view/subjects", label: "Subjects" },
          { path: "/student/progress", label: "Progress" },
        ],
      },
      {
        label: "Lessons",
        icon: CalendarDays,
        dropdown: [
          { path: "/lessons", label: "Upcoming Lessons" },
          {
            path: "/schedule-lesson",
            label: "Schedule Lesson",
          },
        ],
      },
      {
        path: "/tutor/subjects",
        label: "Subjects",
        icon: BookOpen,
      },
      {
        path: "/messages",
        label: "Messages",
        icon: MessageSquare,
      },
      {
        path: "/student/manage-my-profile",
        label: "Manage Profile",
        icon: UserCog,
      },
    ],
    showUser: true,
    isAdmin: false,
  },

  admin: {
    main: [
      {
        path: "/admin/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Qualifications",
        icon: GraduationCap,
        dropdown: [
          {
            path: "/admin/add/qualification",
            label: "Add Qualification",
          },
          {
            path: "/admin/manage/qualifications",
            label: "Manage Qualifications",
          },
        ],
      },
      {
        label: "Universities",
        icon: University,
        dropdown: [
          {
            path: "/admin/add/university",
            label: "Add University",
          },
          {
            path: "/admin/manage/universities",
            label: "Manage Universities",
          },
        ],
      },
      {
        label: "Prospectus",
        icon: FileText,
        dropdown: [
          {
            path: "/admin/add/university-prospectus",
            label: "Add Prospectus",
          },
          {
            path: "/admin/manage/university-prospectuses",
            label: "Manage Prospectus",
          },
        ],
      },
      {
        label: "User Accounts",
        icon: UserPlus,
        dropdown: [
          {
            path: "/admin/add/account",
            label: "Add Account",
          },
          {
            path: "/admin/manage/accounts",
            label: "Manage accounts",
          },
        ],
      },
      {
        label: "Blog Posts",
        icon: Newspaper,
        dropdown: [
          {
            path: "/admin/add/blog-post",
            label: "Add Blog Post",
          },
          {
            path: "/admin/manage/blog-posts",
            label: "Manage Blog Posts",
          },
        ],
      },
      {
        path: "/admin/reports",
        label: "Reports",
        icon: BarChart3,
      },
    ],
    showUser: true,
    isAdmin: true,
  },
};
