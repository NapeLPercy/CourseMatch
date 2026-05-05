const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const subjectsRoutes = require("./routes/subjectRoutes");
const uniRoutes = require("./routes/uniRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const autoRoutes = require("./routes/automationRoutes");
const qualificationRoutes = require("./routes/qualificationRoutes");
const studentRoutes = require("./routes/studentRoutes");
const aiRoutes = require("./routes/aiRoutes");
const adminDashboardRoutes = require("./routes/dashboardRoutes");
const parentRoutes = require("./routes/parentRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
const guestRoutes = require("./routes/guestRoutes");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://coursematch-ui.onrender.com", 
"https://www.coursematchapp.co.za", 
"https://coursematchapp.co.za", 
  "http://192.168.43.69:3000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);
app.use("/uploads", express.static("uploads"));
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
app.use("/api/match-courses", autoRoutes);
app.use("/api/qualification", qualificationRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recommendation", aiRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/blogs", blogRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
