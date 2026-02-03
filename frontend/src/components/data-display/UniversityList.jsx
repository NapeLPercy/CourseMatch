import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, BookOpen } from "lucide-react";
import "../../styles/UniversityList.css";

/* ─── Data ──────────────────────────────────────────────────── */
const universities = [
  {
    id: "tut",
    name: "Tshwane University of Technology",
    description:
      "A leading institution in technology and innovation, shaping engineers, designers, and business leaders across South Africa.",
    logo: null, // set to an image path/URL when available, e.g. "/logos/tut.png"
    faculties: [
      "Engineering & Built Environment",
      "Information & Communication Technology",
      "Business & Management Sciences",
      "Arts & Humanities",
      "Health Sciences",
      "Agriculture & Environmental Sciences",
    ],
  },
  {
    id: "uj",
    name: "University of Johannesburg",
    description:
      "A comprehensive university at the heart of Gauteng, recognised for applied research and industry partnerships.",
    logo: null,
    faculties: [
      "Sciences",
      "Humanities & Social Sciences",
      "Engineering",
      "Education",
      "Business & Management",
      "Health Sciences",
      "ICT",
    ],
  },
  {
    id: "up",
    name: "University of Pretoria",
    description:
      "One of South Africa's most prestigious research universities, offering world-class programmes across every discipline.",
    logo: null,
    faculties: [
      "Arts",
      "Education",
      "Engineering",
      "Health Sciences",
      "Law",
      "Management",
      "Science",
      "Veterinary Sciences",
    ],
  },
  {
    id: "wits",
    name: "University of the Witwatersrand",
    description:
      "Wits is synonymous with academic excellence and groundbreaking research, rooted in Johannesburg's intellectual tradition.",
    logo: null,
    faculties: [
      "Arts & Humanities",
      "Education",
      "Engineering & Physical Sciences",
      "Health Sciences",
      "Management",
      "Science",
    ],
  },
  {
    id: "unisa",
    name: "UNISA",
    description:
      "Africa's largest distance-learning university, giving every South African flexible access to quality higher education.",
    logo: null,
    faculties: [
      "Arts & Humanities",
      "Education",
      "Law & Management",
      "Science & Technology",
      "Health & Human Sciences",
      "Agriculture & Environmental Sciences",
    ],
  },
  {
    id: "cput",
    name: "Cape Peninsula University of Technology",
    description:
      "CPUT blends hands-on learning with the natural beauty of the Cape, producing skilled professionals for a dynamic economy.",
    logo: null,
    faculties: [
      "Applied Sciences",
      "Business & Management",
      "Education",
      "Engineering & Applied Sciences",
      "Health & Social Sciences",
      "Tourism & Hospitality",
    ],
  },
  {
    id: "cut",
    name: "Central University of Technology",
    description:
      "Based in the Free State, CUT is committed to accessible, career-focused education for every learner.",
    logo: null,
    faculties: [
      "Arts & Social Sciences",
      "Business",
      "Engineering & Computer Sciences",
      "Health Sciences",
      "Education",
    ],
  },
  {
    id: "dut",
    name: "Durban University of Technology",
    description:
      "DUT combines technical excellence with the vibrant culture of KwaZulu-Natal, preparing students for real-world challenges.",
    logo: null,
    faculties: [
      "Applied Sciences",
      "Arts & Sciences",
      "Business & Management",
      "Education",
      "Engineering & ICT",
      "Health Sciences",
    ],
  },
  {
    id: "mut",
    name: "Mangosuthu University of Technology",
    description:
      "MUT serves the communities of uMgungundlovu, offering practical programmes that drive local economic development.",
    logo: null,
    faculties: [
      "Arts & Social Sciences",
      "Business & Economics",
      "Engineering",
      "Health Sciences",
      "Education",
    ],
  },
];

/* ─── Generate initials from uni name for placeholder logo ──── */
function getInitials(name) {
  // Grab first letter of each word, cap at 2
  const words = name.replace(/[^a-zA-Z\s]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0][0].toUpperCase();
  // prefer first + last significant word
  const first = words[0][0];
  const last = words[words.length - 1][0];
  return (first + last).toUpperCase();
}

/* ─── Marquee strip for faculties ───────────────────────────── */
function FacultyMarquee({ faculties }) {
  // Duplicate the list so the loop is seamless
  const doubled = [...faculties, ...faculties];

  return (
    <div className="uni__marquee">
      <div className="uni__marquee-track">
        {doubled.map((f, i) => (
          <span key={i} className="uni__marquee-item">
            <BookOpen size={11} strokeWidth={2} className="uni__marquee-icon" />
            {f}
            <span className="uni__marquee-dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Single university card ────────────────────────────────── */
function UniCard({ uni, index }) {
  const navigate = useNavigate();

  return (
    <div
      className="uni__card"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Logo */}
      <div className="uni__logo-wrap">
        {uni.logo ? (
          <img src={uni.logo} alt={`${uni.name} logo`} className="uni__logo-img" />
        ) : (
          <div className="uni__logo-placeholder">
            <span className="uni__logo-initials">{uni.id.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="uni__body">
        <h3 className="uni__name">{uni.name}</h3>
        <p className="uni__desc">{uni.description}</p>

        {/* Faculty marquee */}
        <FacultyMarquee faculties={uni.faculties} />
      </div>

      {/* CTA */}
      <button
        type="button"
        className="uni__cta"
        onClick={() => navigate(`/view-courses/${uni.id}`)}
        aria-label={`View courses at ${uni.name}`}
      >
        <span className="uni__cta-text">View Courses</span>
        <ArrowRight size={15} strokeWidth={2.2} className="uni__cta-arrow" />
      </button>
    </div>
  );
}

/* ─── Export ────────────────────────────────────────────────── */
export default function UniversityList() {
  return (
    <div className="uni__list">
      {universities.map((uni, i) => (
        <UniCard key={uni.id} uni={uni} index={i} />
      ))}
    </div>
  );
}