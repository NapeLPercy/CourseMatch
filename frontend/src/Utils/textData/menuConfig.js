import {
  Home,
  Info,
  Mail,
  LogIn,
  UserPlus,
  TrendingUpDown,
  BookOpen,
  User,
  Building2,
  FileText,
  HelpCircle,
  Shield,
  GraduationCap,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  ClipboardList,
  Compass,
  Calculator,
} from "lucide-react";

export const NAV_CONFIG = {
  guest: {
    main: [
      {
        path: "/",
        label: "Home",
        icon: Home,
      },

      //{ path: "/tutors/home", label: "Tutors", icon: Users },
      {
        path: "/aps-calculator",
        label: "APS Calculator",
        icon: Calculator,
      },
      { path: "/about", label: "About Us", icon: Info },
      { path: "/blogs", label: "Blog", icon: FileText },
      {
        label: "Resources",
        icon: FileText,
        dropdown: [
          {
            path: "/terms-and-conditions",
            label: "Terms & Conditions",
            icon: Shield,
          },
        ],
      },

      {
        path: "/contact-us",
        label: "Contact Us",
        icon: Mail,
      },
    ],

    actions: {
      login: {
        path: "/login",
        label: "Sign In",
        icon: LogIn,
        variant: "ghost",
      },

      signup: {
        path: "/register",
        label: "Sign Up",
        icon: UserPlus,
        variant: "primary",
      },
    },
  },
  student: {
    main: [
      {
        path: "/student/dashboard",
        label: "Dashboard",
        icon: TrendingUpDown,
      },

      {
        label: "Subjects",
        icon: BookOpen,
        dropdown: [
          {
            path: "/student/view/subjects",
            label: "My Subjects",
            icon: BookOpen,
          },
          {
            path: "/student/add/subjects",
            label: "Add Subjects",
            icon: FileText,
          },
        ],
      },

      {
        label: "Courses",
        icon: GraduationCap,
        dropdown: [
           {
            path: "/view-courses",
            label: "Get AI-Recommendations",
            icon: GraduationCap,
          },
          {
            path: "/student/ai-recommended-courses",
            label: "AI-Recommended Courses",
            // new → needs icon
            icon: ClipboardList,
          },
         
        ],
      },

      {
        path: "/student/manage-my-profile",
        label: "Manage Profile",
        icon: User,
      },
      {
        path: "/aps-calculator",
        label: "APS Calculator",
        icon: Calculator,
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
        icon: TrendingUpDown,
      },

      {
        label: "My Child",
        icon: Users,
        dropdown: [
          { path: "/student/view/subjects", label: "Subjects", icon: BookOpen },
          { path: "/lessons", label: "Lessons", icon: Calendar },
          { path: "/student/progress", label: "Progress", icon: BarChart3 },
        ],
      },

      {
        label: "Course Insights",
        icon: GraduationCap,
        dropdown: [
          {
            path: "/matched-courses",
            label: "Matched Courses",
            icon: ClipboardList,
          },
          { path: "/view-courses", label: "All Courses", icon: GraduationCap },
        ],
      },

      {
        path: "/student/manage-my-profile",
        label: "Manage Profile",
        icon: User,
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
        icon: TrendingUpDown,
      },

      {
        label: "My Students",
        icon: Users,
        dropdown: [
          { path: "/students", label: "All Students", icon: Users },
          { path: "/student/view/subjects", label: "Subjects", icon: BookOpen },
          { path: "/student/progress", label: "Progress", icon: BarChart3 },
        ],
      },

      {
        label: "Lessons",
        icon: Calendar,
        dropdown: [
          { path: "/lessons", label: "Upcoming Lessons", icon: Calendar },
          {
            path: "/schedule-lesson",
            label: "Schedule Lesson",
            icon: Calendar,
          },
        ],
      },

      { path: "/tutor/subjects", label: "Subjects", icon: BookOpen },

      { path: "/messages", label: "Messages", icon: MessageSquare },

      {
        path: "/student/manage-my-profile",
        label: "Manage Profile",
        icon: User,
      },
    ],
    showUser: true,
    isAdmin: false,
  },

  admin: {
    main: [
      {
        path: "/admin/dashboard",
        label: "Admin Dashboard",
        icon: TrendingUpDown,
      },
      {
        path: "/admin/manage-qualifications",
        label: "Manage Qualifications",
        icon: GraduationCap,
      },
      {
        path: "/admin/manage-universities",
        label: "Universities & Faculties",
        icon: Building2,
      },
      {
        path: "/admin/manage-blogs",
        label: "Manage blogs",
        icon: FileText,
      },
      {
        path: "/admin/reports",
        label: "Reports",
        icon: FileText,
      },
    ],
    showUser: true,
    isAdmin: true,
  },
};
