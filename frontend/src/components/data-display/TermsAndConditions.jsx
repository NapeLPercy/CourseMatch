import { FileText, Shield, Check } from "lucide-react";
import { TERMS } from "../../Utils/textData/termsAndConditions";
import "../../styles/TermsAndConditions.css";

export default function TermsAndConditions() {
  return (
    <div className="tc">
      {/* Header */}
      <div className="tc__header">
        <div className="tc__header-icon">
          <FileText size={28} strokeWidth={1.6} />
        </div>
        <div className="tc__header-text">
          <h1 className="tc__title">Terms and Conditions</h1>
          <p className="tc__subtitle">
            <Shield size={14} strokeWidth={2} />
            Last updated:16 February 2026
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="tc__content">
        {TERMS.map((section, index) => (
          <div key={index} className="tc__section">
            <h2 className="tc__section-title">{section.title}</h2>
            <ul className="tc__list">
              {section.content.map((item, i) => (
                <li key={i} className="tc__list-item">
                  <Check size={16} strokeWidth={2.5} className="tc__list-icon" />
                  <span className="tc__list-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="tc__footer">
        <div className="tc__footer-line" />
        <p className="tc__footer-text">
          By using CourseMatch, you acknowledge that you have read, understood, and agree
          to be bound by these Terms and Conditions.
        </p>
      </div>
    </div>
  );
}