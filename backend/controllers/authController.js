const db = require("../config/db");
const dotenv = require("dotenv");
dotenv.config();
const {
  checkAccount,
  addAccount,
  login,
  generateToken,
  validatePassword,
} = require("../services/accountService");

/* 1 Check if account exist
2 register email */
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await checkAccount(email);
    console.log(results, "After check email");

    if (results.length > 0) {
      return res.json({ success: false, message: "Email already registered" });
    }

    await addAccount(email, password);

    return res
      .status(201)
      .json({ success: true, message: "Successfuly registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* 1 Check if account exist
2 Validate password
3 Generate token */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const results = await login(email);

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const account = results[0];
    const isMatch = await validatePassword(password, account.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(account);

    const userData = {
      userId: account.user_id,
      role: account.role,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
