import React from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <nav className="NavBar-Wrapper">
      <div>
        <h3 className="NavBar-Title">CRUD App</h3>
      </div>
      <div className="NavBar-Links">
        {/* <Link to="/home" className="NavBar-Link">Home</Link> */}
        <Link to="/add" className="NavBar-Link">
          Add Customer
        </Link>
     
      <button className="logout" onClick={() => navigate("/")}>
        Logout
      </button>
      </div>
    </nav>
  );
};

export default Home;
