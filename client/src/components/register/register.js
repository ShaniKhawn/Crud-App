import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./register.css";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;

    if (!name || !email || !password) {
      alert("Invalid input. Please check your details.");
      return;
    }

    if(password !== reEnterPassword){
      alert("password doesn't match");
      return;
    }

    axios.post("http://localhost:9002/register", user)
      .then(res => {
        alert(res.data.message);
        navigate("/login");
      })
      .catch(err => {
        alert("Error registering user");
      });
  };

  return (
    <div>
        <div className="container">
            {/* {console.log("User", user)} */}
            <h1>Register</h1>

            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange} className="register-input"/>
            <input type="text" name="email" value={user.email} placeholder="Enter your email number" onChange={handleChange} className="register-input"/>
            <input type="password" name="password" value={user.password} placeholder="Your password" onChange={handleChange} className="register-input"/>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter password" onChange={handleChange} className="register-input"/>

            <button onClick={register} className="btn">Register</button>
            <h2>or</h2>
            <button onClick={() => navigate('/login')} className="btn">Login</button>
        </div>
    </div>
  )
}
