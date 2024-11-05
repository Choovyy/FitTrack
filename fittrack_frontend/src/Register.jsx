import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/users', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setMessage('Registration successful! You can now log in.');
        // Optionally, redirect to login after a short delay
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        setMessage(error.response.data); // Show server error message
      } else {
        setMessage('Registration failed. Please try again.'); // Generic error message
      }
    }
  };

  return (
    <>
      <style>
        {`
          .register-navbar {
            background-color: #333;
            padding: 10px 0;
            color: white;
          }

          .register-navList {
            list-style: none;
            display: flex;
            justify-content: center;
          }

          .register-navItem {
            margin: 0 15px;
          }

          .register-navLink {
            color: white;
            text-decoration: none;
            font-size: 18px;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          .register-navLink:hover {
            background-color: #555;
          }

          .register-container {
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

          .register-heading {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333;
          }

          .register-form {
            width: 100%;
            display: flex;
            flex-direction: column;
          }

          .register-formGroup {
            margin-bottom: 15px;
          }

          .register-label {
            font-size: 14px;
            margin-bottom: 5px;
            color: #333;
          }

          .register-inputField {
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-top: 5px;
          }

          .register-submitBtn {
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

          .register-submitBtn:hover {
            background-color: #45a049;
          }

          .register-message {
            color: #e74c3c;
            margin-top: 10px;
          }

          .register-loginLink {
            margin-top: 20px;
            font-size: 14px;
          }

          .register-linkButton {
            background: none;
            border: none;
            color: #3498db;
            text-decoration: underline;
            cursor: pointer;
            font-size: 14px;
          }
        `}
      </style>

      <nav className="register-navbar">
        <ul className="register-navList">
          <li className="register-navItem">
            <a href="/" className="register-navLink">Dashboard</a>
          </li>
        </ul>
      </nav>

      <div className="register-container">
        <h2 className="register-heading">Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="register-formGroup">
            <label htmlFor="name" className="register-label">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="register-inputField"
            />
          </div>
          <div className="register-formGroup">
            <label htmlFor="email" className="register-label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-inputField"
            />
          </div>
          <div className="register-formGroup">
            <label htmlFor="password" className="register-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="register-inputField"
            />
          </div>
          <button type="submit" className="register-submitBtn">Register</button>
        </form>

        {message && <p className="register-message">{message}</p>}

        <p className="register-loginLink">
          Already have an account? 
          <button onClick={() => navigate('/login')} className="register-linkButton">Login</button>
        </p>
      </div>
    </>
  );
};

export default Register;
