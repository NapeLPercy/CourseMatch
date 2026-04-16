import React, { useMemo, useState } from "react";
import { useCookieConsent } from "../../context/CookieConsentContext";
import { Cookie, ShieldCheck, ChevronDown, Lock } from "lucide-react";
import "../../styles/CookieModal.css";

export default function CookieModal() {
  const {
    consent,
    isModalOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    setCategory,
    closeModal,
  } = useCookieConsent();

  const [expanded, setExpanded] = useState(false);

  const categories = useMemo(
    () => [
      {
        key: "essential",
        title: "Essential",
        desc: "Required for the site to work — login, security, basic settings. Always on.",
        locked: true,
      },
      {
        key: "analytics",
        title: "Analytics",
        desc: "Helps us understand usage so we can improve the app (e.g. Google Analytics).",
      },
      {
        key: "marketing",
        title: "Marketing",
        desc: "Used to show relevant marketing content and measure campaigns.",
      },
      {
        key: "remarketing",
        title: "Remarketing",
        desc: "Shows ads to people who visited before (e.g. Meta Pixel remarketing).",
      },
    ],
    []
  );

  if (!isModalOpen) return null;

  return (
    <div className={`cm ${expanded ? "cm--expanded" : ""}`} role="dialog" aria-modal="true" aria-label="Cookie preferences">

      {/* ── Compact row — always visible ── */}
      <div className="cm__bar">
        <div className="cm__bar-left">
          <div className="cm__icon">
            <Cookie size={18} strokeWidth={1.8} />
          </div>
          <p className="cm__bar-text">
            We use cookies to improve your experience.{" "}
            <button
              className="cm__bar-link"
              onClick={() => setExpanded((e) => !e)}
            >
              Manage preferences
              <ChevronDown
                size={13}
                strokeWidth={2.5}
                className={`cm__chevron ${expanded ? "cm__chevron--up" : ""}`}
              />
            </button>
          </p>

          
        </div>

        <div className="cm__bar-actions">
          <button className="cm__btn cm__btn--ghost" onClick={rejectAll}>
            Reject all
          </button>
          <button className="cm__btn cm__btn--primary" onClick={acceptAll}>
            Accept all
          </button>
        </div>
      </div>

      {/* ── Expanded panel — preferences ── */}
      <div className={`cm__panel ${expanded ? "cm__panel--open" : ""}`}>
        <div className="cm__panel-inner">
          <p className="cm__panel-label">
            Choose which cookies you allow. Essential is always on.
          </p>

          <div className="cm__categories">
            {categories.map((c) => {
              const checked = !!consent.categories[c.key];
              return (
                <div key={c.key} className="cm__category">
                  <div className="cm__category-info">
                    <div className="cm__category-title">
                      {c.title}
                      {c.locked && (
                        <span className="cm__badge">
                          <Lock size={9} strokeWidth={2.5} />
                          Required
                        </span>
                      )}
                    </div>
                    <div className="cm__category-desc">{c.desc}</div>
                  </div>

                  <label className="cm__toggle">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!!c.locked}
                      onChange={(e) => setCategory(c.key, e.target.checked)}
                      className="cm__toggle-input"
                    />
                    <span className="cm__toggle-slider" />
                  </label>
                </div>
              );
            })}
          </div>

          <div className="cm__panel-footer">
            <span className="cm__panel-note">
              <ShieldCheck size={13} strokeWidth={2} />
              Change your choices anytime in Cookie Settings.
            </span>
            <button
              className="cm__btn cm__btn--primary"
              onClick={() => {
                savePreferences(consent.categories);
                setExpanded(false);
              }}
            >
              Save preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}