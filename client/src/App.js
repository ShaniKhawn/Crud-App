import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import AddCustomers from "./components/crud/add/add";
import Home from "./components/crud/Home/Home";
import NavBar from "./components/crud/NavBar/NavBar";
import EditCustomers from "./components/crud/edit/edit";
import ForgotPassword from "./components/forgot-password/forgot-password";
import ResetPassword from "./components/forgot-password/reset-password";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/home"
            element={
              <div>
                <NavBar />
                <Home />
              </div>
            }
          />

          <Route
            exact
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/add" element={<AddCustomers />} />
          <Route exact path="/edit/:id" element={<EditCustomers />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
