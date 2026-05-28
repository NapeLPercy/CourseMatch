const { v4: uuidv4 } = require("uuid");
const EmailModel = require("../models/EmailLog");
const { sendEmail } = require("./sendEmailService");

const sendEmailMessage = async (data) => {
  const {
    to,
    subject,
    message,
    link,
    linkText,
    imageUrl,
  } = data;

  let html = `
    <div style="font-family: Arial, sans-serif;">
      <p>${message}</p>
  `;

  // CONDITIONAL LINK
  if (link) {
    html += `
      <div style="margin: 20px 0;">
        <a
          href="${link}"
          style="
            background: #2563eb;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
          "
        >
          ${linkText || "Open Link"}
        </a>
      </div>
    `;
  }

  // CONDITIONAL IMAGE
  if (imageUrl) {
    html += `
      <div style="margin-top: 20px;">
        <img
          src="${imageUrl}"
          alt="Email image"
          style="
            max-width: 100%;
            border-radius: 10px;
          "
        />
      </div>
    `;
  }

  html += `</div>`;

  // SEND EMAIL
  await sendEmail({
    to,
    subject,
    html,
  });

  // SAVE LOG (WITHOUT IMAGE URL)
  await EmailModel.createEmailLog({
    id: uuidv4(),
    recipientEmail: to,
    subject,
    message: html,
    status: "SENT",
  });

  return true;
};

module.exports = { sendEmailMessage };