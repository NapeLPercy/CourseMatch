import "../../styles/Footer.css"; // <-- your custom css
import CookieSettingsLink from "../data-display/CookieSettingLink";
import { useState } from "react";
import{ Link} from "react-router-dom"
import { ArrowRight } from "lucide-react";


/* ── Social icons as inline SVGs (no extra lib needed) ── */
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.492a.5.5 0 0 0 .614.638l5.786-1.517A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.187-1.448l-.37-.22-3.837 1.006 1.028-3.735-.242-.384A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

const LEGAL_LINKS = [
  { label: "Terms of Use",    href: "/terms-and-conditions" },
  { label: "Privacy Policy",  href: "/privacy-policy" },
  { label: "Cookie Policy",   href: "/cookie-policy" },
  { label: "POPIA",           href: "/popia" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail]   = useState("");
  const [subbed, setSubbed] = useState(false);

  function handleSubscribe() {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // wire to your subscribe API here
    setSubbed(true);
    setEmail("");
  }

  return (
    <footer className="ft">
      <div className="ft__inner">

        {/* ══════════════════════════════
            TOP — brand | subscribe
        ══════════════════════════════ */}
        <div className="ft__top">

          {/* Brand block */}
          <div className="ft__brand">
            <span className="ft__logo">
              Course<span className="ft__logo-accent">Match</span>
            </span>
            <p className="ft__tagline">
              Helping South African students find their path — one subject at a time.
            </p>

            {/* Social icons */}
            <div className="ft__socials">
              <a
                href="https://web.facebook.com/profile.php?id=61572570570851"
                target="_blank"
                rel="noopener noreferrer"
                className="ft__social"
                aria-label="Find us on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://wa.me/27682748821"
                target="_blank"
                rel="noopener noreferrer"
                className="ft__social ft__social--wa"
                aria-label="Chat with us on WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Subscribe block */}
          <div className="ft__subscribe">
            <p className="ft__sub-heading">Stay in the loop</p>
            <p className="ft__sub-desc">
              Get updates on new features, universities, and course tips.
            </p>
            {subbed ? (
              <p className="ft__sub-thanks">✓ You're subscribed!</p>
            ) : (
              <div className="ft__sub-row">
                <input
                  className="ft__sub-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  aria-label="Email address"
                />
                <button
                  className="ft__sub-btn"
                  onClick={handleSubscribe}
                  type="button"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* ── Full-width divider ── */}
        <div className="ft__divider" />

        {/* ══════════════════════════════
            BOTTOM — legal | copyright
        ══════════════════════════════ */}
        <div className="ft__bottom">

          {/* Legal links */}
          <nav className="ft__legal" aria-label="Legal">
            {LEGAL_LINKS.map((l, i) => (
              <>
                {i > 0 && <span key={`d-${i}`} className="ft__dot" aria-hidden="true" />}
                <Link key={l.href} to={l.href} className="ft__link">{l.label}</Link>
              </>
            ))}
            <span className="ft__dot" aria-hidden="true" />
            <CookieSettingsLink className="ft__link" />
          </nav>

          {/* Copyright + disclaimer */}
          <div className="ft__copy-wrap">
            <span className="ft__copy">
              © {year} CourseMatch. All rights reserved.
            </span>
            <span className="ft__disclaimer">
              Developed by <strong>Lekoloane Nape Percy</strong>.
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}