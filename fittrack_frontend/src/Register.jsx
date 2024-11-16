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
    setMessage(''); // Clear message

    try {
      const response = await axios.post('http://localhost:8080/api/users', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.response ? error.response.data : 'Registration failed. Please try again.');
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

          /* Registration Container */
          .register-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 50px auto;
            padding: 20px;
            width: 100%;
            max-width: 400px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
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
            background-color: #FFCA28;
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
            padding: 6px 12px;
            border-radius: 4px;
            transition: all 0.3s ease;
          }

          .register-linkButton:hover {
            color: #2980b9;
            text-decoration: none;
            background-color: rgba(52, 152, 219, 0.1);
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

        {message && <p className={`register-message ${message.includes('successful') ? 'success' : ''}`}>{message}</p>}

        <p className="register-loginLink">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="register-linkButton">Login</button>
        </p>
      </div>
    </>
  );
};

export default Register;
