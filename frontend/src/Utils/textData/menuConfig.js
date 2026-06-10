import {
  Home,
  Mail,
  LogIn,
  TrendingUpDown,
  BookOpen,
  User,
  Building2,
  FileText,
  GraduationCap,
  Users,
  UserPlus,
  Eye,
  Award,Search,
  Calendar,
  MessageSquare,
  BarChart3,
  ClipboardList,
  Wallet,
  Calculator,
  ToolCase,
  Star,
  Scale,
} from "lucide-react";

export const NAV_CONFIG = {
  guest: {
    main: [
      {
        path: "/",
        label: "Home",
        icon: Home,
      },
      {
        label: "Courses",
        icon: GraduationCap,
        dropdown: [
          {
            path: "/bachelor-degree-courses",
            label: "Bachelor Degrees",
            icon: GraduationCap,
          },
          {
            path: "/diploma-courses",
            label: "Diploma Courses",
            icon: BookOpen,
          },
          {
            path: "/higher-certificate-courses",
            label: "Higher Certificates",
            icon: Award,
          },
          {
            path: "/extended-programmes",
            label: "Extended Programmes",
            icon: FileText,
          },
          {
            path: "/courses-without-maths",
            label: "Courses Without Maths",
            icon: Calculator,
          },
        ],
      },
      {
        label: "Tools",
        icon: ToolCase,
        dropdown: [
          {
            path: "/aps-calculator",
            label: "APS Calculator",
            icon: Calculator,
          },
          {
            path: "/nsfas-eligibility-checker",
            label: "NSFAS Eligibility Checker",
            icon: Wallet,
          },
        ],
      },

      { path: "/features", label: "Features", icon: Star },
      { path: "/blogs", label: "Blog", icon: FileText },

      {
        path: "/contact-us",
        label: "Contact",
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
            path: "/student/add/subjects",
            label: "Add Subjects",
            icon: FileText,
          },
          {
            path: "/student/view/subjects",
            label: "View Subjects",
            icon: BookOpen,
          },
        ],
      },

      {
        label: "Courses",
        icon: GraduationCap,
        dropdown: [
          {
            path: "/view-courses",
            label: "Find Courses",
            icon: GraduationCap,
          },
          {
            path: "/student/ai-recommended-courses",
            label: "My Courses",
            icon: ClipboardList,
          },

          {
            path: "/student/course-comparisons",
            label: "Compare Courses",
            icon: Scale,
          },
        ],
      },
      {
        label: "Explore Courses",
        icon: Search,
        dropdown: [
          {
            path: "/bachelor-degree-courses",
            label: "Bachelor Degrees",
            icon: GraduationCap,
          },
          {
            path: "/diploma-courses",
            label: "Diploma Courses",
            icon: BookOpen,
          },
          {
            path: "/higher-certificate-courses",
            label: "Higher Certificates",
            icon: Award,
          },
          {
            path: "/extended-programmes",
            label: "Extended Programmes",
            icon: FileText,
          },
          {
            path: "/courses-without-maths",
            label: "Courses Without Maths",
            icon: Calculator,
          },
        ],
      },

      {
        label: "Personality",
        icon: User,
        dropdown: [
          {
            path: "/student/add/personality",
            label: "Add Personality",
            icon: UserPlus,
          },
          {
            path: "/student/view/personality",
            label: "View Personality",
            icon: Eye,
          },
        ],
      },

      {
        label: "Tools",
        icon: ToolCase,
        dropdown: [
          {
            path: "/aps-calculator",
            label: "APS Calculator",
            icon: Calculator,
          },
          {
            path: "/nsfas-eligibility-checker",
            label: "NSFAS Eligibility Checker",
            icon: Wallet,
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
        label: "Dashboard",
        icon: TrendingUpDown,
      },
      {
        path: "/admin/manage-qualifications",
        label: "Qualifications",
        icon: GraduationCap,
      },
      {
        path: "/admin/manage-universities",
        label: "Universities",
        icon: Building2,
      },
      {
        path: "/admin/manage-accounts",
        label: "Accounts",
        icon: Users,
      },

      {
        path: "/admin/manage-blogs",
        label: "Blogs",
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
