import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message before each request

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data; // Token received
        localStorage.setItem('token', token); // Store token
        setMessage('Login successful!');
        navigate('/home'); // Redirect after successful login
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.response ? error.response.data : 'Login failed. Please try again.');
    }
  };

  return (
    <>
     <style>
        {`
          /* General Styles */
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
          }

          /* Navbar Styling (If used for the Login Page) */
          .login-navList {
            list-style: none;
            display: flex;
            justify-content: center;
            margin: 0;
            padding: 0;
          }

          .login-navItem {
            margin: 0 15px;
          }

          .login-navLink {
            color: white;
            text-decoration: none;
            font-size: 18px;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          .login-navLink:hover {
            background-color: #555;
          }

          /* Login Container */
          .login-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 50px auto;
            padding: 20px;
            width: 100%;
            max-width: 400px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          /* Heading */
          .login-heading {
            font-size: 26px;
            margin-bottom: 20px;
            color: #333;
            text-align: center;
          }

          /* Form Styling */
          .login-form {
            width: 100%;
            display: flex;
            flex-direction: column;
          }

          .login-formGroup {
            margin-bottom: 20px;
          }

          .login-label {
            font-size: 14px;
            margin-bottom: 8px;
            color: #555;
          }

          .login-inputField {
            padding: 12px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-top: 5px;
            width: 100%;
          }

          .login-inputField:focus {
            border-color: #4CAF50;
            outline: none;
          }

          /* Submit Button */
          .login-submitBtn {
            background-color: #4CAF50;
            color: white;
            padding: 12px;
            font-size: 16px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .login-submitBtn:hover {
            background-color: #45a049;
          }

          /* Message Display (Success/Error) */
          .login-message {
            color: #e74c3c;
            margin-top: 10px;
            font-size: 14px;
            text-align: center;
          }

          .login-message.success {
            color: #2ecc71;
          }

          /* Register Link */
          .login-registerLink {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
          }

          .login-linkButton {
  background: none;
  border: none;
  color: #3498db;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  padding: 6px 12px; /* Add some padding for a more clickable feel */
  border-radius: 4px; /* Slight rounded corners for a more modern look */
  transition: all 0.3s ease; /* Smooth transition for hover and focus effects */
}

.login-linkButton:hover {
  color: #2980b9; /* Darken the color on hover */
  text-decoration: none; /* Remove the underline on hover */
  background-color: rgba(52, 152, 219, 0.1); /* Light background on hover for emphasis */
}

.login-linkButton:focus {
  outline: none; /* Remove the default outline for a custom focus style */
  border: 2px solid #3498db; /* Add a blue border when focused */
  background-color: rgba(52, 152, 219, 0.15); /* Subtle background change on focus */
}

.login-linkButton:active {
  background-color: rgba(52, 152, 219, 0.2); /* Darker background on click for active state */
}


          /* Responsive Design */
          @media (max-width: 600px) {
            .login-container {
              padding: 15px;
              width: 90%;
              max-width: 360px;
            }

            .login-heading {
              font-size: 22px;
            }

            .login-inputField {
              font-size: 14px;
            }

            .login-submitBtn {
              font-size: 14px;
            }

            .login-message {
              font-size: 12px;
            }
          }
        `}
      </style>

      <nav className="login-navbar">
        <ul className="login-navList">
        </ul>
      </nav>

      <div className="login-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-formGroup">
            <label htmlFor="email" className="login-label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-inputField"
            />
          </div>
          <div className="login-formGroup">
            <label htmlFor="password" className="login-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-inputField"
            />
          </div>
          <button type="submit" className="login-submitBtn">Login</button>
        </form>

        {message && <p className="login-message">{message}</p>}

        <p className="login-registerLink">
          Don't have an account? 
          <button onClick={() => navigate('/register')} className="login-linkButton">Register</button>
        </p>
      </div>
    </>
  );
};

export default Login;
