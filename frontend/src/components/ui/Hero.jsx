import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Hero.css";

/* ── Responsive image hook ── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

export default function Hero({ data }) {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("lh--mounted"));
  }, []);

  if (!data) return null;

  const { left, right } = data;

  function handleAction(action) {
    if (action.navigate) navigate(action.navigate);
    if (action.scrollTo) {
      document.getElementById(action.scrollTo)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (action.onClick) action.onClick();
  }

  const imageSrc =
    isMobile && right?.image?.mobile
      ? right.image.mobile
      : right?.image?.desktop;

  return (
    <section ref={sectionRef} className="lh" aria-label="Hero">
      {/* Ambient blobs */}
      <div className="lh__geo lh__geo--1" aria-hidden="true" />
      <div className="lh__geo lh__geo--2" aria-hidden="true" />
      <div className="lh__geo lh__geo--3" aria-hidden="true" />
      <div className="lh__mesh" aria-hidden="true" />

      <div className="lh__container">
        {/* ── Left ── */}
        <div className="lh__left">
          {/* Badge */}
          {left?.badge && (
            <div className="lh__badge">
              {left.badge.showDot && <span className="lh__badge-dot" />}
              {left.badge.text}
            </div>
          )}

          {/* Title */}
          {left?.title && <h1 className="lh__title">{left.title}</h1>}

          {/* Subtitle */}
          {left?.subtitle && <p className="lh__subtitle">{left.subtitle}</p>}

          {/* Actions — always side by side */}
          {left?.actions?.length > 0 && (
            <div className="lh__actions">
              {left.actions.map((action, i) => (
                <button
                  key={i}
                  className={`lh__btn lh__btn--${action.variant || "primary"}`}
                  onClick={() => handleAction(action)}
                  type="button"
                >
                  {action.text}
                </button>
              ))}
            </div>
          )}

          {/* Pills */}
          {left?.pills?.length > 0 && (
            <div className="lh__pills">
              {left.pills.map((pill, i) => (
                <>
                  {i > 0 && (
                    <span
                      key={`div-${i}`}
                      className="lh__pill-divider"
                      aria-hidden="true"
                    />
                  )}
                  <span key={pill} className="lh__pill">
                    <svg
                      className="lh__pill-icon"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M5 8.5l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {pill}
                  </span>
                </>
              ))}
            </div>
          )}
        </div>

        {/* ── Right ── */}
        <div className="lh__right">
          <div
            className="lh__visual-blob lh__visual-blob--1"
            aria-hidden="true"
          />
          <div
            className="lh__visual-blob lh__visual-blob--2"
            aria-hidden="true"
          />

          {/* Steps */}
          {right?.steps?.length > 0 && (
            <div className="lh__steps">
              {right.steps.map((step, i) => (
                <div key={i} className="lh__step">
                  <div className="lh__step-num">{i + 1}</div>
                  <span className="lh__step-text">{step}</span>
                </div>
              ))}
            </div>
          )}

          {/* Image */}
          {imageSrc && (
            <img
              key={imageSrc}
              src={imageSrc}
              alt={right?.image?.alt || "Hero image"}
              className="lh__img"
              loading="eager"
            />
          )}

          {/* Floating chips 
          <div className="lh__chip lh__chip--top">
            <span className="lh__chip-dot" />
            <span>92% match found</span>
          </div>

          <div className="lh__chip lh__chip--bottom">
            <span className="lh__chip-icon">🎓</span>
            <div className="lh__chip-text">
              <span className="lh__chip-label">Top match</span>
              <span className="lh__chip-value">BSc Computer Science</span>
            </div>
          </div>*/}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="lh__scroll" aria-hidden="true">
        <span className="lh__scroll-line" />
      </div>
    </section>
  );
}


