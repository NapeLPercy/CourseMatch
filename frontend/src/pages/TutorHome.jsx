import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, BookOpen, Users } from "lucide-react";
import "../styles/TutorHome.css";

// Mock tutor data (replace with API later)
const FEATURED_TUTORS = [
  {
    id: 1,
    name: "Dr. Thabo Mkhize",
    experience: "8 years",
    subjects: "Mathematics, Physical Sciences",
    rating: 4.9,
    description: "Specialized in matric preparation with proven track record of distinction passes."
  },
  {
    id: 2,
    name: "Sarah Johnson",
    experience: "5 years",
    subjects: "English, Life Sciences",
    rating: 4.8,
    description: "Patient educator focused on building confidence and study techniques."
  },
  {
    id: 3,
    name: "Mpho Ledwaba",
    experience: "10 years",
    subjects: "Accounting, Economics",
    rating: 5.0,
    description: "Former university lecturer with expertise in commerce subjects."
  },
  {
    id: 4,
    name: "James Chen",
    experience: "6 years",
    subjects: "Physical Sciences, Mathematics",
    rating: 4.7,
    description: "Engineering graduate passionate about making complex concepts simple."
  },
  {
    id: 5,
    name: "Lindiwe Ntuli",
    experience: "7 years",
    subjects: "History, Geography",
    rating: 4.9,
    description: "Engaging lessons that bring subjects to life through storytelling."
  },
  {
    id: 6,
    name: "David van der Merwe",
    experience: "12 years",
    subjects: "Mathematics, IT",
    rating: 5.0,
    description: "Tech-savvy tutor using modern tools to enhance learning outcomes."
  }
];

function TutorCard({ tutor }) {
  return (
    <div className="tutor-card">
      <div className="tutor-card__header">
        <div className="tutor-card__avatar">
          {tutor.name.charAt(0)}
        </div>
        <div className="tutor-card__info">
          <h3 className="tutor-card__name">{tutor.name}</h3>
          <p className="tutor-card__experience">{tutor.experience} experience</p>
        </div>
      </div>

      <div className="tutor-card__subjects">
        <BookOpen size={14} strokeWidth={2} />
        <span>{tutor.subjects}</span>
      </div>

      <p className="tutor-card__description">{tutor.description}</p>

      <div className="tutor-card__footer">
        <div className="tutor-card__rating">
          <Star size={14} strokeWidth={2} fill="currentColor" />
          <span>{tutor.rating}</span>
        </div>
        <button className="tutor-card__btn">
          View Profile
          <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default function TutorHome() {
  const navigate = useNavigate();

  return (
    <div className="tutors-landing">
      {/* HERO SECTION */}
      <section className="tl-hero">
        <div className="tl-hero__overlay" />
        <div className="tl-hero__content">
        
          
          <h1 className="tl-hero__title">
            Find the Right Tutor<br />
            for Any Subject
          </h1>
          
          <p className="tl-hero__subtitle">
            Personalised learning support to help you improve faster and reach your academic goals
          </p>

          <div className="tl-hero__actions">
            <button 
              className="tl-hero__btn tl-hero__btn--primary"
              onClick={() => navigate("/tutors/request")}
            >
              Get a Tutor
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
            <button 
              className="tl-hero__btn tl-hero__btn--secondary"
              onClick={() => navigate("/tutors/browse")}
            >
              Browse Tutors
            </button>
          </div>

          <div className="tl-hero__stats">
            <div className="tl-hero__stat">
              <strong>500+</strong>
              <span>Qualified Tutors</span>
            </div>
            <div className="tl-hero__stat-divider" />
            <div className="tl-hero__stat">
              <strong>10,000+</strong>
              <span>Sessions Completed</span>
            </div>
            <div className="tl-hero__stat-divider" />
            <div className="tl-hero__stat">
              <strong>4.8★</strong>
              <span>Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEW SECTION */}
      <section className="tl-preview">
        <div className="tl-preview__container">
          <div className="tl-preview__header">
            <h2 className="tl-preview__title">Top Tutors</h2>
            <p className="tl-preview__subtitle">
              Meet some of our highest-rated educators ready to help you succeed
            </p>
          </div>

          <div className="tl-preview__grid">
            {FEATURED_TUTORS.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>

          <div className="tl-preview__cta">
            <button 
              className="tl-preview__btn"
              onClick={() => navigate("/tutors/browse")}
            >
              View More Tutors
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}