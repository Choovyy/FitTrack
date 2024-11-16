import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style/Register.css";
import boyIcon from "./assets/boyicon.png";
import logo from "./assets/FitTrack Logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/users", formData);

      if (response.status === 201) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(
        error.response
          ? error.response.data
          : "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-left-panel">
        <img src={logo} alt="FitTrack Logo" className="register-logo" />
        <h1 className="register-title">
          Track your progress <span>with us</span>
        </h1>
        <img src={boyIcon} alt="Boy Icon" className="register-image" />
      </div>
      <div className="register-right-panel">
        <form className="register-form" onSubmit={handleRegister}>
          <h2 className="register-heading">REGISTER</h2>
          <div className="form-group">
            <label htmlFor="name" className="register-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="register-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="register-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="register-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="register-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="register-input"
            />
          </div>
          <button type="submit" className="Rregister-button">
            Register
          </button>
          <div className="register-footer">
            <p>Already have an account? <Link to="/login" className="Rregister-link">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
