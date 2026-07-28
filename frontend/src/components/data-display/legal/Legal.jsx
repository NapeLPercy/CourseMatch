import { FileText, Shield, CheckCircle2 } from "lucide-react";
import "../../../styles/TermsAndConditions.css";

export default function Legal({data}) {
  return (
    <div className="tc">
      {/* ── Header ── */}
      <div className="tc__header">
        <div className="tc__header-icon">
          <FileText size={26} strokeWidth={1.6} color="#fff" />
        </div>
        <div className="tc__header-text">
          <h1 className="tc__title">{data.title}</h1>
          <p className="tc__subtitle">
            <Shield size={13} strokeWidth={2} />
            Last updated: {data.lastUpdate}
          </p>
        </div>
      </div>

      {/* ── Intro blurb ── */}
      <p className="tc__intro">{data.intro}</p>

      {/* ── Single-page content ── */}
      <div className="tc__content">
        {data.legalData.map((section, si) => (
          <div key={si} className="tc__section">
            {/* Section number + title */}
            <div className="tc__section-heading">
              <span className="tc__section-num">
                {String(si + 1).padStart(2, "0")}
              </span>
              <h2 className="tc__section-title">{section.title}</h2>
            </div>

            {/* Points */}
            <ul className="tc__list">
              {section.content.map((item, i) => (
                <li key={i} className="tc__list-item">
                  <CheckCircle2
                    size={15}
                    strokeWidth={2.5}
                    className="tc__tick"
                    aria-hidden="true"
                  />
                  <span className="tc__list-text">{item}</span>
                </li>
              ))}
            </ul>

            {/* Divider between sections — not after last */}
            {si < data.legalData.length - 1 && <div className="tc__divider" />}
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="tc__footer">
        <CheckCircle2 size={18} strokeWidth={2} className="tc__footer-icon" />
        <p className="tc__footer-text">{data.disclaimer}</p>
      </div>
    </div>
  );
}
