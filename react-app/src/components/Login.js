import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService'; // Import the login function from the service
import './Login.css'; // Import CSS for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Correctly define the navigate function

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Basic validation to ensure fields are not empty
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Username and password are required.');
      return;
    }

    try {
      // Call the login service
      const token = await loginUser(username, password);

      // Check if token is received, else throw error
      if (!token) {
        throw new Error('Failed to retrieve token. Please try again.');
      }

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Redirect to the Device page after successful login
      navigate('/device');
    } catch (error) {
      // Display error message if login fails
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {/* Sign Up Link */}
      <p className="signup-text">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;