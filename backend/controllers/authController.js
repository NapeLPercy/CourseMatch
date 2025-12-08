const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const dotenv = require("dotenv");

const { v4: uuidv4 } = require("uuid");
dotenv.config();


exports.register = async (req, res) => {
  const { email, password } = req.body;

  console.log("abut to create an account");
  try {
    // Check if email already exists in account table
    db.query(
      "SELECT id FROM account WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0)
          return res.status(400).json({ error: "Email already registered" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into user table first
        const userId = uuidv4();
        const sqlUser = "INSERT INTO user (id) VALUES (?)";
        db.query(sqlUser, [userId], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          // 4️⃣ Insert into account table, linking to userId
          const accountId = uuidv4();
          const sqlAccount =
            "INSERT INTO account (id, email, password, user_id) VALUES (?, ?, ?, ?)";
          db.query(
            sqlAccount,
            [accountId, email, hashedPassword, userId],
            (err, result) => {
              if (err) return res.status(500).json({ error: err.message });

              res.status(201).json({ message: "User registered successfully" });
            }
          );
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("About to login", email, password);

  try {
    // 1️⃣ Check account existence
    db.query(
      "SELECT id, email, password FROM account WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0)
          return res.status(400).json({ error: "User not found" });

        const account = results[0];

        // 2️⃣ Verify password
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch)
          return res.status(400).json({ error: "Invalid credentials" });

        // 3️⃣ Generate JWT
        const token = jwt.sign(
          { id: account.id, email: account.email },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Fetch student info linked to this account
        const studentSql = "SELECT student_id AS studentId, endorsement FROM student WHERE user_id = ?";
        db.query(studentSql, [account.id], (err, studentResults) => {
          if (err) return res.status(500).json({ error: err.message });

          // If student record found, include it
          const studentData = studentResults.length > 0 ? studentResults[0] : null;

          // Construct final response object
          const userData = {
            id: account.id,
            email: account.email,
            student: studentData,
          };

          res.status(200).json({
            message: "Login successful",
            token,
            user: userData,
          });
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
