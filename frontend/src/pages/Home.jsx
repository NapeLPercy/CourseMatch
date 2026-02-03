
//import "./Home.css";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Contact from "./Contact";
// Home Component
export default function Home() {
  return (
    <>
    <Hero/>
    <HowItWorks/>
    <Contact/>
    </>
  );
}

/*<div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">Course Match</h1>
        <p className="hero-subtitle">Find Your Perfect University Course</p>
        <p className="hero-description">
          Match your matric marks with university courses you qualify for, powered by AI insights
        </p>
      </header>

      <section className="features-section">
        <h2 className="section-title">How It Works</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">1</div>
            <h3 className="feature-title">Submit Matric Marks</h3>
            <p className="feature-description">
              Enter your matric subject marks and overall performance to see which courses you qualify for
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-number">2</div>
            <h3 className="feature-title">View Matching Courses</h3>
            <p className="feature-description">
              Browse through universities and courses that match your academic achievements
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-number">3</div>
            <h3 className="feature-title">Create Personal Profile</h3>
            <p className="feature-description">
              Share your strengths, goals, and interests for AI-powered personalized course recommendations
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Ready to Find Your Path?</h2>
        <p className="cta-description">
          Get started today and discover the courses that align with your academic achievements and personal aspirations
        </p>
        <button className="cta-button">Get Started</button>
      </section>
    </div> */