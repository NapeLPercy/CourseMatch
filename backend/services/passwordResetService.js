const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const accountModel = require("../models/Account");
const bcrypt = require("bcryptjs");
const { raw } = require("express");
const { Console } = require("console");

// helper
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// 1 Request reset (check + insert)
const requestPasswordReset = async (email) => {
  try {
    const account = await accountModel.checkAccountByEmail(email);

    console.log(account, "data is back");
    // Always return same response (security)
    if (!account || account.length === 0) {
      return {
        success: true,
        message: "If an account exists, a reset link has been sent.",
      };
    }

    const accountId = account[0].id;

    // generate token (SERVICE responsibility)
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashToken(rawToken);
    
    const data = {
      id: uuidv4(),
      account_id: accountId,
      token_hash: tokenHash,
      expires_at: new Date(Date.now() + 1000 * 60 * 20), // 20 mins
    };
    
    // optional: delete old tokens
    await accountModel.deleteByAccountId(accountId);

    // insert new token
    await accountModel.createResetToken(data);

    // send email
    const link = process.env.UI_URL + "/reset-password?token=" + rawToken;
    return {
      success: true,
      message: "If an account exists, a reset link has been sent.",
      link: link,
    };
  } catch (err) {
    throw err;
  }
};

// Reset password (validate + delete)
const resetPassword = async (rawToken, newPassword) => {
  try {
    const tokenHash = hashToken(rawToken);

    const tokenRecord = await accountModel.getByTokenHash(tokenHash);

    console.log(tokenHash, "hash token final");

    if (!tokenRecord) {
      return {
        success: false,
        message: "Invalid or expired token",
      };
    }

    // check expiry
    if (new Date(tokenRecord.expires_at) < new Date()) {
      await accountModel.deleteByTokenHash(tokenHash);

      return {
        success: false,
        message: "Token expired",
      };
    }

    const accountId = tokenRecord.account_id;

    // update password
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await accountModel.updatePassword(accountId, hashedPassword);

    // delete token after use
    await accountModel.deleteByTokenHash(tokenHash);

    return {
      success: true,
      message: "Password reset successful",
    };
  } catch (err) {
    throw err;
  }
};
module.exports = { requestPasswordReset, resetPassword };
