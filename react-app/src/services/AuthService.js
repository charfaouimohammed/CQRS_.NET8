import axios from 'axios';

// Function to send login request and handle token
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('https://localhost:7182/api/Users/login', {
      username,
      password,
    });

    // Extract the token from the response
    const { token } = response.data;

    // Return the token for further handling
    return token;
  } catch (error) {
    // Throw an error with a user-friendly message
    const errorMessage =
      error.response?.data?.message || 'Invalid credentials. Please try again.';
    throw new Error(errorMessage);
  }
};
 
export const getUsername=()=>localStorage.getItem('username');

// Function to get the token from localStorage
export const getToken = () => localStorage.getItem('token');

// Function to remove the token (for logout)
export const logoutUser = () => localStorage.removeItem('token');