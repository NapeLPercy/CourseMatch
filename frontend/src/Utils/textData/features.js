import {
  Sparkles,
  Calculator,
  GraduationCap,
  Banknote,
  Microscope,
  Scale,
  Bot,
} from "lucide-react";

export const FEATURES = [
  {
    id: 1, icon: Calculator, color: "green",
    title: "APS Calculator",
    description: "Calculate your Admission Point Score instantly using university-specific APS rules and subject requirements.",
    preview: {
      type: "aps",
      universities: [
        { university: "University of Pretoria", aps: 39 },
        { university: "University of Johannesburg", aps: 37 },
      ],
    },
  },
  {
    id: 2, icon: GraduationCap, color: "orange",
    title: "Qualification Eligibility Checker",
    description: "Instantly see which qualifications you qualify for.",
    preview: {
      type: "eligibility",
      qualification: {
        name: "BSc Computer Science", code: "021301",
        minAPS: 35, nqf: 7, duration: "3 Years",
        prerequisites: ["Mathematics 70%", "English 60%", "Physical Sciences"],
      },
    },
  },
  {
    id: 3, icon: Sparkles, color: "purple",
    title: "AI Course Recommendations",
    description: "Receive personalized course recommendations.",
    preview: {
      type: "recommendation",
      qualification: {
        name: "BSc Computer Science", code: "021301", fitScore: 94,
        reason: "Strong Mathematics performance, analytical thinking, and interest in technology.",
      },
    },
  },
  {
    id: 4, icon: Microscope, color: "red",
    title: "Career Deep Dive",
    description: "Explore career descriptions and industry insights.",
    preview: {
      type: "deepDive",
      qualification: {
        name: "BSc Computer Science",
        description: "Learn software development, artificial intelligence, algorithms, databases, networking, and cloud technologies.",
      },
    },
  },
  {
    id: 5, icon: Scale, color: "blue",
    title: "Qualification Comparison",
    description: "Compare two qualifications side-by-side.",
    preview: {
      type: "comparison",
      left:  { name: "BSc Computer Science",      score: 94 },
      right: { name: "BSc Information Technology", score: 86 },
      winner: "left",
    },
  },
  {
    id: 6, icon: Bot, color: "green",
    title: "CourseMate",
    description: "Your AI study assistant.",
    preview: {
      type: "chat",
      messages: [
        { sender: "user",      text: "Which engineering courses can I study?" },
        { sender: "assistant", text: "Based on your APS, you qualify for Civil, Mechanical, and Industrial Engineering." },
      ],
    },
  },
  {
    id: 7, icon: Banknote, color: "teal",
    title: "NSFAS Eligibility Checker",
    description: "Find out whether you may qualify for NSFAS funding.",
    preview: {
      type: "nsfas",
      cards: [
        { status: "eligible",    title: "Eligible",     description: "You meet the basic NSFAS requirements." },
        { status: "notEligible", title: "Not Eligible", description: "Your household income exceeds the NSFAS threshold." },
      ],
      disclaimer: "This is an estimate only. Final eligibility is determined by NSFAS.",
    },
  },
];