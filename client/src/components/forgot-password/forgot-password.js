import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = () => {
    axios
      .post("http://localhost:9002/login/forgot-password", { email })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        alert("Error sending password reset email");
      });
  };

  return (
    <div className="container">
      <h1>Forgot Password</h1>
      <input
        type="text"
        name="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        className="login-input"
      />
      <button onClick={handleForgotPassword} className="btn">
        Send Reset Email
      </button>
    </div>
  );
}
