const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");

const emailVerificationModel = require("../models/EmailVerificationModel");
const accountModel = require("../models/Account");

// Helper to hash raw token
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

module.exports = {
  // Create token and save it to DB
  createVerificationToken: async (conn,accountId) => {
    try {
      // Remove previous verification tokens for this account
      await emailVerificationModel.deleteByAccountId(accountId);
      // Generate token
      const rawToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = hashToken(rawToken);

      // Build record
      const data = {
        id: uuidv4(),
        account_id: accountId,
        token_hash: tokenHash,
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      };

      // Save token
      await emailVerificationModel.createVerificationToken(conn,data);

      //Return raw token so it can be sent via email
      const link = process.env.UI_URL + "/verify-account?token=" + rawToken;
      return {
        success: true,
        token: rawToken,
        link
      };
    } catch (err) {
      throw err;
    }
  },

  // Validate token from email link
  verifyEmail: async (rawToken) => {
    try {
      // Hash token from URL
      const tokenHash = hashToken(rawToken);

      // Look up token in DB
      const tokenRecord =
        await emailVerificationModel.getByTokenHash(tokenHash);

      if (!tokenRecord) {
        return {
          success: false,
          message: "Invalid verification link.",
        };
      }

      // Check expiry
      if (new Date(tokenRecord.expires_at) < new Date()) {
        await emailVerificationModel.deleteByTokenHash(tokenHash);

        return {
          success: false,
          message: "Verification link has expired.",
        };
      }

      // Activate account
      await accountModel.updateAccountStatus(tokenRecord.account_id, "ACTIVE");

      // Delete token after successful verification
      await emailVerificationModel.deleteByTokenHash(tokenHash);

      return {
        success: true,
        message: "Email verified successfully.",
      };
    } catch (err) {
      throw err;
    }
  },
};
