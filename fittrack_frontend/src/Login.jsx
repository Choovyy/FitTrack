import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style/Login.css";
import boyIcon from "./assets/boyicon.png";
import logo from "./assets/FitTrack Logo.png";

// Import Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset any previous messages
    toast.dismiss();

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.message) {
        const message = response.data.message; // Extract message from response

        // Check if message includes UserID
        const userIDMatch = message.match(/your UserID is: (\d+)/);
        if (userIDMatch) {
          const userID = userIDMatch[1]; // Extract UserID from message
          sessionStorage.setItem("userID", userID); // Store the userID in sessionStorage
          toast.success(message); // Show success toast

          // Wait for the toast duration before redirecting
          setTimeout(() => {
            navigate("/dashboard"); // Navigate to dashboard after toast disappears
          }, 3000); // 5 seconds delay
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response ? error.response.data.message : "Login failed. Please try again."
      ); // Show error toast on failure
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
        </form>
        <div className="Rregister-link">
          Don’t have an account?{" "}
          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>
      </div>

      {/* ToastContainer to display toasts */}
      <ToastContainer
        position="top-right"
        autoClose={2000} // Auto close the toast after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
