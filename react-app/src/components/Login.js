// src/components/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService'; // Import the login function from the service
import './Login.css'; // Import CSS for styling
 import logo from '../assec/logoV.png'; // Import your logo

const Login = () => {
  // State variables for form inputs and feedback
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle

  const navigate = useNavigate(); // Hook for navigation

  /**
   * Handles the form submission for logging in.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation to ensure fields are not empty
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Username and password are required.');
      return;
    }

    setIsLoading(true); // Start loading
    setErrorMessage(''); // Clear previous error messages

    try {
      // Call the login service to authenticate the user
      const token = await loginUser(username, password);

      // Store token in localStorage (consider more secure storage methods in production)
      localStorage.setItem('token', token);

      // Redirect to the Device page after successful login
      navigate('/device');
    } catch (error) {
      // Display error message if login fails
      setErrorMessage(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="main_body">
    
      <div className="login-container">
        {/* Logo */}
        <img src={logo} alt="Company Logo" className="logo" />

        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              aria-label="Username"
            />
          </div>

          {/* Password Field with Visibility Toggle */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                aria-label="Password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Submit Button */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
