import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style/Login.css";
import boyIcon from "./assets/boyicon.png";
import logo from "./assets/FitTrack Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setMessage("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        error.response
          ? error.response.data
          : "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-left-panel">
        <img src={logo} alt="FitTrack Logo" className="login-logo" />
        <h1 className="login-title">
          Track your progress <span>with us</span>
        </h1>
        <img src={boyIcon} alt="Boy Icon" className="login-image" />
      </div>
      <div className="login-right-panel">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-heading">LOGIN</h2>
          <div className="form-group">
            <label htmlFor="email" className="login-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="login-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {message && (
            <p
              className={`login-message ${
                message === "Login successful!" ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}
        </form>
        <div className="Rregister-link">
          Don’t have an account?{" "}
          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
