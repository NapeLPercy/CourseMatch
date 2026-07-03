import ChatBot from "react-chatbotify";
import { sendChatbotMessage } from "../../services/chatbotService";

export default function ChatWidget() {
  const flow = {
    start: {
      message: "Hi! I'm the CourseMatch assistant. How can I help?",
      path: "main",
    },
    main: {
      message: async ({ userInput }) => {
        const response = await sendChatbotMessage("Student user", userInput);

        const data = response.data;

        return data[0]?.text || "Sorry, something went wrong.";
      },
      path: "main",
    },
  };

  return (
    <ChatBot
      options={{
        theme: {
          embedded: false, // floating bot mode
          primaryColor: "#0056ff",
        },
        header: {
          title: "CourseMatch Assistant",
        },
      }}
      flow={flow}
    />
  );
}
