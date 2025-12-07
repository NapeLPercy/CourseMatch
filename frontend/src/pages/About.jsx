// About Component
import "./About.css";
export default function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1 className="about-title">About Course Match</h1>
        <p className="about-subtitle">Empowering Students to Make Informed Decisions</p>
      </header>

      <section className="about-content">
        <div className="about-section">
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-text">
            Course Match is dedicated to helping South African students navigate the complex world of university admissions. 
            We believe every student deserves to find their perfect academic path based on both their achievements and their passions.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">What We Do</h2>
          <p className="about-text">
            Our platform combines academic qualification matching with AI-powered personalization. By analyzing your matric marks 
            alongside your personal strengths, interests, and career goals, we provide tailored course recommendations that go 
            beyond just meeting entry requirements.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">AI-Powered Matching</h2>
          <p className="about-text">
            Our intelligent system considers multiple factors including:
          </p>
          <ul className="about-list">
            <li>Your academic strengths and subject preferences</li>
            <li>Personal goals and career aspirations</li>
            <li>Learning environment preferences</li>
            <li>Hobbies and interests that align with different fields</li>
            <li>Long-term career objectives</li>
          </ul>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">Why Choose Us</h2>
          <p className="about-text">
            We understand that choosing a university course is about more than just grades. It's about finding where you'll 
            thrive, grow, and build the future you envision. Course Match bridges the gap between qualification and aspiration.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <h2 className="contact-title">Have Questions?</h2>
        <p className="contact-text">We're here to help you on your journey to higher education.</p>
        <button className="contact-button">Contact Us</button>
      </section>
    </div>
  );
}