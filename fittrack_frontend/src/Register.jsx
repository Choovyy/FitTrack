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
    /* General Styles */
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      color: #333;
    }

    /* Navbar Styling (if used for the Registration Page) */
    .register-navList {
      list-style: none;
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;
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

    /* Registration Container */
    .register-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
      padding: 20px;
      width: 100%;
      max-width: 400px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    /* Heading */
    .register-heading {
      font-size: 26px;
      margin-bottom: 20px;
      color: #333;
      text-align: center;
    }

    /* Form Styling */
    .register-form {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .register-formGroup {
      margin-bottom: 20px;
    }

    .register-label {
      font-size: 14px;
      margin-bottom: 8px;
      color: #555;
    }

    .register-inputField {
      padding: 12px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
      margin-top: 5px;
      width: 100%;
    }

    .register-inputField:focus {
      border-color: #4CAF50;
      outline: none;
    }

    /* Submit Button */
    .register-submitBtn {
      background-color: #4CAF50;
      color: white;
      padding: 12px;
      font-size: 16px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .register-submitBtn:hover {
      background-color: #45a049;
    }

    /* Message Display (Success/Error) */
    .register-message {
      color: #e74c3c;
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
    }

    .register-message.success {
      color: #2ecc71;
    }

    /* Login Link */
    .register-loginLink {
      margin-top: 20px;
      font-size: 14px;
      text-align: center;
    }

    .register-linkButton {
  background: none;
  border: none;
  color: #3498db;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  padding: 6px 12px; /* Added padding to make it more clickable */
  border-radius: 4px; /* Slight rounded corners for a modern look */
  transition: all 0.3s ease; /* Smooth transition for hover and focus effects */
}

.register-linkButton:hover {
  color: #2980b9; /* Darken the color on hover */
  text-decoration: none; /* Remove underline on hover to emphasize the change */
  background-color: rgba(52, 152, 219, 0.1); /* Subtle background change on hover */
}

.register-linkButton:focus {
  outline: none; /* Remove default focus outline */
  border: 2px solid #3498db; /* Add a border for better visibility when focused */
  background-color: rgba(52, 152, 219, 0.15); /* Light background change when focused */
}

.register-linkButton:active {
  background-color: rgba(52, 152, 219, 0.2); /* Slightly darker background when clicked */
}

    /* Responsive Design */
    @media (max-width: 600px) {
      .register-container {
        padding: 15px;
        width: 90%;
        max-width: 360px;
      }

      .register-heading {
        font-size: 22px;
      }

      .register-inputField {
        font-size: 14px;
      }

      .register-submitBtn {
        font-size: 14px;
      }

      .register-message {
        font-size: 12px;
      }
    }
  `}
</style>


      <nav className="register-navbar">
        <ul className="register-navList">
          
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
