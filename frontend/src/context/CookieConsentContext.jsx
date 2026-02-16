import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loadMetaPixel } from "../Utils/cookies/metaPixels";
import { loadGA } from "../Utils/cookies/googleAnalytics";

const STORAGE_KEY = "cookie_consent_v1";
const GA_ID = "G-P2PPEL5EB2";
const META_PIXELS_ID = "1667665897733463";
/**
 * consent.status:
 * - "unknown"   -> no choice yet (show modal)
 * - "accepted"  -> user saved/accepted something
 * - "rejected"  -> user rejected all optional cookies
 *
 * consent.categories:
 * essential: always true
 * analytics/marketing/remarketing: user-controlled
 */
const defaultConsent = {
  status: "unknown",
  categories: {
    essential: true,
    analytics: false,
    marketing: false,
    remarketing: false,
  },
  updatedAt: null,
};

const CookieConsentContext = createContext(null);

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(defaultConsent);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from storage on first mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Basic safety merge (in case you add fields later)
        setConsent({
          ...defaultConsent,
          ...parsed,
          categories: {
            ...defaultConsent.categories,
            ...(parsed.categories || {}),
          },
        });
        setIsModalOpen(false);
      } else {
        setTimeout(() => {
          setIsModalOpen(true);
        }, 5000);
      }
    } catch (e) {
      // If storage is corrupted, reset and show modal
      console.warn("Consent storage error:", e);
      localStorage.removeItem(STORAGE_KEY);
      setConsent(defaultConsent);
      setIsModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper: persist
  const persist = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
  };

  // Simulated “enable tracking”
  const runTrackingIfAllowed = (next) => {
    const { analytics, marketing, remarketing } = next.categories;
    if (analytics) {
      loadGA(GA_ID);
    }

    if (marketing || remarketing) {
      loadMetaPixel(META_PIXELS_ID);
    }
  };

  const acceptAll = () => {
    const next = {
      status: "accepted",
      categories: {
        essential: true,
        analytics: true,
        marketing: true,
        remarketing: true,
      },
      updatedAt: new Date().toISOString(),
    };
    persist(next);
    setIsModalOpen(false);
    runTrackingIfAllowed(next);
  };

  const rejectAll = () => {
    const next = {
      status: "rejected",
      categories: {
        essential: true,
        analytics: false,
        marketing: false,
        remarketing: false,
      },
      updatedAt: new Date().toISOString(),
    };
    persist(next);
    setIsModalOpen(false);
    console.log("[Cookies] User rejected all optional cookies.");
  };

  const savePreferences = (categories) => {
    const next = {
      status: "accepted",
      categories: {
        essential: true,
        analytics: !!categories.analytics,
        marketing: !!categories.marketing,
        remarketing: !!categories.remarketing,
      },
      updatedAt: new Date().toISOString(),
    };
    persist(next);
    setIsModalOpen(false);
    runTrackingIfAllowed(next);
  };

  const setCategory = (key, value) => {
    if (key === "essential") return; // locked
    setConsent((prev) => ({
      ...prev,
      categories: { ...prev.categories, [key]: !!value, essential: true },
    }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const isFromLink = false;
  
  const value = useMemo(
    () => ({
      consent,
      isModalOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      setCategory,
      openModal,
      closeModal,
    }),
    [consent, isModalOpen],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx)
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider",
    );
  return ctx;
}
