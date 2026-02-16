import "../../styles/Footer.css"; // <-- your custom css
import CookieSettingsLink from "../data-display/CookieSettingLink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <span className="footer__logo">
            Course<span className="footer__logo-accent">Match</span>
          </span>
          <span className="footer__tagline">Helping students find their path.</span>
        </div>

        {/* Links */}
        <nav className="footer__links" aria-label="Footer navigation">
          <a href="/terms-and-conditions" className="footer__link">Terms &amp; Conditions</a>
          <span className="footer__divider" aria-hidden="true" />
          
          <CookieSettingsLink/>
        </nav>

        {/* Credit */}
        <div className="footer__credit">
          <span className="footer__copy">&copy; {year} CourseMatch. All rights reserved.</span>
          <span className="footer__created">
            Created by <span className="footer__creator">Lekoloane Nape Percy</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
