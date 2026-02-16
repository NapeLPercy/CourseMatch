import React, { useMemo, useState } from "react";
import { useCookieConsent } from "../../context/CookieConsentContext";
import { Cookie, X, ShieldCheck } from "lucide-react";
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

  const [showMore, setShowMore] = useState(false);

  const categories = useMemo(
    () => [
      {
        key: "essential",
        title: "Essential",
        desc: "Required for the site to work (login, security, basic settings). Always on.",
        locked: true,
      },
      {
        key: "analytics",
        title: "Analytics",
        desc: "Helps us understand usage so we can improve the app (e.g., Google Analytics).",
      },
      {
        key: "marketing",
        title: "Marketing",
        desc: "Used to show relevant marketing content and measure campaigns.",
      },
      {
        key: "remarketing",
        title: "Remarketing",
        desc: "Helps show ads to people who visited before (e.g., Meta Pixel remarketing).",
      },
    ],
    []
  );

  if (!isModalOpen) return null;

  return (
    <div className="cm__backdrop" role="dialog" aria-modal="true">
      <div className="cm__modal">
        <div className="cm__header">
          <div className="cm__header-left">
            <div className="cm__icon">
              <Cookie size={24} strokeWidth={1.8} />
            </div>
            <h3 className="cm__title">We use cookies</h3>
          </div>
          <button onClick={closeModal} className="cm__close">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {!showMore ? (
          <>
            <div className="cm__body">
              <p className="cm__text">
                We use <strong>essential cookies</strong> to make this site work. With your
                permission, we may also use optional cookies for analytics, marketing, and
                remarketing.
              </p>
            </div>

            <div className="cm__actions">
              <button className="cm__btn cm__btn--ghost" onClick={rejectAll}>
                Reject all
              </button>
              <button className="cm__btn cm__btn--outline" onClick={() => setShowMore(true)}>
                View more
              </button>
              <button className="cm__btn cm__btn--primary" onClick={acceptAll}>
                Accept all
              </button>
            </div>

            <p className="cm__footer-text">
              <ShieldCheck size={14} strokeWidth={2} />
              You can change your choices anytime in "Cookie Settings".
            </p>
          </>
        ) : (
          <>
            <div className="cm__body">
              <p className="cm__text">
                Choose which cookies you allow. <strong>Essential</strong> is always on.
              </p>
            </div>

            <div className="cm__categories">
              {categories.map((c) => {
                const checked = !!consent.categories[c.key];
                return (
                  <div key={c.key} className="cm__category">
                    <div className="cm__category-info">
                      <div className="cm__category-title">
                        {c.title}{" "}
                        {c.locked && <span className="cm__badge">Required</span>}
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

            <div className="cm__actions">
              <button className="cm__btn cm__btn--ghost" onClick={rejectAll}>
                Reject all
              </button>
              <button className="cm__btn cm__btn--outline" onClick={() => setShowMore(false)}>
                Back
              </button>
              <button className="cm__btn cm__btn--primary" onClick={() => savePreferences(consent.categories)}>
                Save preferences
              </button>
            </div>

            <p className="cm__footer-text">
              <ShieldCheck size={14} strokeWidth={2} />
              Tip: if you enable options, we'll run tracking (for now, just a console log).
            </p>
          </>
        )}
      </div>
    </div>
  );
}