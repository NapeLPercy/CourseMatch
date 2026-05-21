import {
  Sparkles,
  Calculator,
  GraduationCap,
  Banknote,
  Microscope,
} from "lucide-react";

export const FEATURES = [
  {
    id: 1,
    icon: Calculator,
    title: "APS Calculator",
    description:
      "Calculate your Admission Point Score instantly using university-specific APS rules and subject requirements.",
    color: "green",
  },
  {
    id: 2,
    icon: GraduationCap,
    title: "Qualification Eligibility Checker",
    description:
      "Instantly see which qualifications you qualify for based on your APS, endorsement, and subject requirements. Explore alternative pathways through extended programmes, higher certificates, and near-match opportunities.",
    color: "orange",
  },
  {
    id: 3,
    icon: Sparkles,
    title: "AI Course Recommendations",
    description:
      "Receive personalized course recommendations based on your academic profile, interests, personality, strengths, and career goals. Discover the top courses best suited to you from each university.",
    color: "purple",
  },
  {
    id: 4,
    icon: Microscope,
    title: "Career Deep Dive",
    description:
      "Explore career descriptions, salary expectations, required skills, top employers, industry trends, challenges to expect, tips for success, and alternative career paths.",
    color: "red",
  },
  {
    id: 5,
    icon: Banknote,
    title: "NSFAS Eligibility Checker",
    description:
      "Find out whether you may qualify for NSFAS funding and understand the key requirements before applying.",
    color: "teal",
  },
];
