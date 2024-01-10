import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const login = () => {
    const { email, password } = user;

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    axios
      .post("http://localhost:9002/login", user)
      .then((res) => {
        if (res.data.token) {
          alert("Login successful");
          onLogin();
          navigate("/home");
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((err) => {
        alert("Error logging in");
      });
  };

  return (
    <>
      <div className="container">
        <h1>Login</h1>

        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="login-input"
        />

        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="login-input"
        />

        <Link to="/forgot-password">Forgot Password</Link>

        <button onClick={login} className="btn">
          Login
        </button>
        <h2>or</h2>
        <button onClick={() => navigate("/register")} className="btn">
          Register
        </button>
      </div>
    </>
  );
}
