import React from "react";
import { useCookieConsent } from "../../context/CookieConsentContext";

export default function CookieSettingsLink() {
  const { openModal } = useCookieConsent();

  return (
    <a
      onClick={openModal}
      style={{ cursor: "pointer" }}
      className="footer__link"
    >
      Cookie Settings
    </a>
  );
}
