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
const studentRoutes = require("./routes/studentRoutes");
const aiRoutes = require("./routes/aiRoutes");
const adminDashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();
const app = express();
/*app.use(cors({
  origin: true,
  credentials: true
}));*/
const allowedOrigins = [
  "http://localhost:3000",
  "https://YOUR-FRONTEND.onrender.com",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allows Postman/Render health checks
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

// health
app.get("/health", (req, res) => {
  res.json({ ok: true });
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/university", uniRoutes);
app.use("/api/chat", chatbotRoutes);
app.use("/api/match-courses",autoRoutes);
app.use("/api/qualification", qualificationRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recommendation",aiRoutes);
app.use("/api/admin", adminDashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
