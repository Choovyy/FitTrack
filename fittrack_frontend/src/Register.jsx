import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style/Register.css";
import boyIcon from "./assets/boyicon.png";
import logo from "./assets/FitTrack Logo.png";

// Import Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Reset any previous toasts
    toast.dismiss();
  
    try {
      // Make POST request to register the user
      const response = await axios.post("http://localhost:8080/api/users", formData);
      
      // Check if registration was successful
      if (response.status === 201 && response.data.message) {
        // Extract the userID from the response
        const userIDMatch = response.data.message.match(/ID: (\d+)/);
        if (userIDMatch) {
          const userID = userIDMatch[1]; // Get the userID from the message
          localStorage.setItem("userID", userID); // Store the userID in localStorage
          
          // Show success toast
          toast.success(`Registration successful! Your UserID is: ${userID}. Redirecting to login...`);
  
          // Wait for the toast duration before redirecting
          setTimeout(() => {
            navigate("/login"); // Redirect to login after toast disappears
          }, 3000); // 5 seconds to match the toast duration
        } else {
          toast.error("Registration failed. Invalid response from server.");
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
  
      if (error.response && error.response.status === 409) {
        // Handle email conflict
        toast.error("Email already exists. Please try a different email.");
      } else {
        toast.error(
          error.response ? error.response.data : "Registration failed. Please try again."
        );
      }
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
            <p>
              Already have an account?{" "}
              <Link to="/login" className="Rregister-link">
                Login
              </Link>
            </p>
          </div>
        </form>
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

export default Register;
