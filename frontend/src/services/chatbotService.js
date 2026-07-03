import { api } from "./api";

export async function sendChatbotMessage(sender, message) {
  return api.post(
    `${process.env.REACT_APP_RASA_CHATBOT}/webhooks/rest/webhook`,
    {
      sender,
      message,
    },
  );
}
