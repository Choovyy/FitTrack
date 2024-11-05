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
          .login-navbar {
            background-color: #333;
            padding: 10px 0;
            color: white;
          }

          .login-navList {
            list-style: none;
            display: flex;
            justify-content: center;
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

          .login-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 50px;
            padding: 20px;
            max-width: 400px;
            margin: auto;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .login-heading {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333;
          }

          .login-form {
            width: 100%;
            display: flex;
            flex-direction: column;
          }

          .login-formGroup {
            margin-bottom: 15px;
          }

          .login-label {
            font-size: 14px;
            margin-bottom: 5px;
            color: #333;
          }

          .login-inputField {
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-top: 5px;
          }

          .login-submitBtn {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            margin-top: 10px;
            transition: background-color 0.3s;
          }

          .login-submitBtn:hover {
            background-color: #45a049;
          }

          .login-message {
            color: #e74c3c;
            margin-top: 10px;
          }

          .login-registerLink {
            margin-top: 20px;
            font-size: 14px;
          }

          .login-linkButton {
            background: none;
            border: none;
            color: #3498db;
            text-decoration: underline;
            cursor: pointer;
            font-size: 14px;
          }
        `}
      </style>

      <nav className="login-navbar">
        <ul className="login-navList">
          <li className="login-navItem">
            <Link to="/" className="navLink">Dashboard</Link>
          </li>
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
