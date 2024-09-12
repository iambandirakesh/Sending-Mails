const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} = require("../mailtrap/emails.js");
const mailVerificationModel = require("../models/mailVerification.model");
const crypto = require("crypto");
//Routes for register
router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: false,
        message: "User already Exists",
      });
    }

    // hash the password
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

    const newUser = await User(req.body);
    await newUser.save();

    res.status(200).send({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        message: "You are not register Please register first",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Sorry Invalid password",
      });
    }

    const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "User logged in",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/sent-verify-email", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    await sendVerificationEmail(email, verificationToken);
    await mailVerificationModel.create({
      email: email,
      verificationToken: verificationToken,
    });
    res.status(200).send({
      success: true,
      message: "Email Verification code Sent",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});
router.post("/verify-email", async (req, res) => {
  try {
    const { email, userVerificationToken } = req.body;
    const verificationToken = await mailVerificationModel.findOne({
      email: email,
    });
    console.log(verificationToken);
    if (verificationToken.verificationToken === userVerificationToken) {
      res.status(200).send({
        success: true,
        message: "Email Verified",
      });
    } else {
      res.status(401).send({
        success: false,
        message: "Invalid Verification Token",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});
router.post("/reset-password", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User does not exist",
      });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await user.save();
    await sendPasswordResetEmail(user.email, resetToken);
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});
router.post("/reset-success", async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
    });
    console.log(user);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid or expired token",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { resetPasswordToken: resetToken },
      {
        $set: {
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpiresAt: null,
        },
      }
    );
    console.log("Updated");
    await sendResetSuccessEmail(user.email);
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err,
    });
  }
});
router.post("/welcome-email", async (req, res) => {
  try {
    const { email, name } = req.body;
    await sendWelcomeEmail(email, name);
    res.status(200).send({
      success: true,
      message: "Email Sent",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});
module.exports = router;
