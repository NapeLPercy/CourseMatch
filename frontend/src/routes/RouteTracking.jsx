import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useCookieConsent } from "../context/CookieConsentContext";
import { gaPageView } from "../Utils/cookies/googleAnalytics";
import { metaTrack } from "../Utils/cookies/metaPixels";

export default function RouteTracking() {
  const location = useLocation();
  const { consent } = useCookieConsent();

  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const path = location.pathname + location.search;

    // GA page_view for SPA routes
    if (consent.categories.analytics) {
      gaPageView(path);
    }

    // Meta Pixel page view for SPA routes
    if (consent.categories.marketing || consent.categories.remarketing) {
      metaTrack("PageView");
    }
  }, [
    location,
    consent.categories.analytics,
    consent.categories.marketing,
    consent.categories.remarketing,
  ]);

  return null;
}
