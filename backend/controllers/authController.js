const db = require("../config/db");
const dotenv = require("dotenv");
dotenv.config();
const {
  checkAccount,
  addAccount,
  login,
  generateToken,
  validatePassword,
  getAdminAccounts,
} = require("../services/accountService");
const {
  requestPasswordReset,
  resetPassword,
} = require("../services/passwordResetService");

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

// 1 Send reset link
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const result = await requestPasswordReset(email);

    // Always success
    return res.status(200).json({
      success: true,
      message: result.message,
      link: result?.link,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 2 Reset password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({
      success: false,
      message: "Token and new password are required",
    });
  }

  try {
    const result = await resetPassword(token, password);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAdminAccounts = async (req, res) => {
  try {
    const result = await getAdminAccounts();

    return res
      .status(200)
      .json({ result, success: true, message: "Accounts successfully fetched"});
  } catch (err) {
    console.error("Admin accounts error:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
