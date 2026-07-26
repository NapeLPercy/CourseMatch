import { useCookieConsent } from "../../context/CookieConsentContext";

export default function CookieSettingsLink() {
  const { openModal } = useCookieConsent();

  return (
    <a
      onClick={openModal}
      style={{ cursor: "pointer" }}
    className="ft__link"
    >
      Cookie Settings
    </a>
  );
}
