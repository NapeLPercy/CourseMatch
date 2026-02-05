const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const subjectsRoutes = require("./routes/subjectRoutes");
const uniRoutes = require("./routes/uniRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const autoRoutes = require("./routes/automationRoutes");
const qualificationRoutes = require("./routes/qualificationRoutes");

dotenv.config();
const app = express();
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/university", uniRoutes);
app.use("/api/chat", chatbotRoutes);
app.use("/api/match-courses",autoRoutes);
app.use("/api/qualification", qualificationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
