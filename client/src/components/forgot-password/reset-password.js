import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    axios
      .post("http://localhost:9002/login/reset-password", {
        resetToken: token,
        newPassword,
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert("Error resetting password");
      });
  };

  return (
    <div className="container">
      <h1>Reset Password</h1>
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={handleNewPasswordChange}
        placeholder="Enter new password"
        className="login-input"
      />
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="Confirm new password"
        className="login-input"
      />
      <button onClick={handleResetPassword} className="btn">
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
