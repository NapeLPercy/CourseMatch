const { v4: uuidv4 } = require("uuid");
const EmailModel = require("../models/EmailLog");
const { sendEmail } = require("./sendEmailService");

const sendEmailMessage = async (data) => {
  const { to, subject, message, link, linkText, imageUrl } = data;

  const formattedMessage = message.replace(/\n/g, "<br>");

  let html = `
  <div
    style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
      color: #333;
    "
  >
`;

  // HERO IMAGE FIRST
  if (imageUrl) {
    html += `
    <div style="margin-bottom: 24px;">
      <img
        src="${imageUrl}"
        alt="CourseMatch"
        style="
          width: 100%;
          display: block;
          border-radius: 12px;
        "
      />
    </div>
  `;
  }

  // MESSAGE SECOND
  html += `
  <div style="font-size: 16px;">
    ${formattedMessage}
  </div>
`;

  // BUTTON LAST
  if (link) {
    html += `
    <div style="margin-top: 32px;">
      <a
        href="${link}"
        style="
          background: #2563eb;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
          font-weight: 600;
        "
      >
        ${linkText || "Open Link"}
      </a>
    </div>
  `;
  }

  html += `
  </div>
`;

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
