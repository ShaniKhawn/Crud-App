const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/user");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error(error);

    // Log the specific error message from bcrypt
    if (error.message.includes("data and hash arguments required")) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Invalid data provided for password comparison",
        });
    }

    res
      .status(500)
      .json({success:false, message: "Unexpected server error", error: error.message });
  }
};

//forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found with this email" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Save reset token and expiry in the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shanikhawn145@gmail.com",
        pass: "ednw mtrp tpkw mplm",
      },
    });

    const mailOptions = {
      from: "Zeeshan Ahmad",
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             http://localhost:3000/reset-password/${resetToken}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
    res.json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error sending password reset email",
      error: error.message,
    });
  }
};
// reset password
const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    console.log("Received reset request with token:", resetToken);

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Invalid or expired reset token:", resetToken);
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    console.log("Password reset successful");
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error resetting password",
        error: error.message,
      });
  }
};

module.exports = { loginUser, forgotPassword, resetPassword };
