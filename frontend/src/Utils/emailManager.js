import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const assertEmailJsConfig = () => {
  const missing = [];

  if (!EMAILJS_SERVICE_ID) missing.push("EMAILJS_SERVICE_ID");
  if (!EMAILJS_TEMPLATE_ID) missing.push("EMAILJS_TEMPLATE_ID");
  if (!EMAILJS_PUBLIC_KEY) missing.push("EMAILJS_PUBLIC_KEY");

  if (missing.length > 0) {
    throw new Error(
      `Missing EmailJS environment variable(s): ${missing.join(", ")}`,
    );
  }
};

export const sendEmail = async (templateParams) => {
  assertEmailJsConfig();

  if (!templateParams || typeof templateParams !== "object") {
    throw new Error("templateParams must be a non-null object.");
  }

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY,
  );
};

