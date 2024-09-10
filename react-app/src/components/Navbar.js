import { Link ,useNavigate} from 'react-router-dom';
import React, {useState } from 'react';
import './Navbar.css'; // Optional: You can add custom styles in this CSS file.
import {logoutUser } from '../services/AuthService'; // Import your auth functions


  
const Navbar = () => {
    const navigate = useNavigate();
    const [setUsername] = useState('');
  
    // useEffect(() => {
    //   // Get the username from localStorage
    //   const storedUsername = getUsername();
    //   if (storedUsername) {
    //     setUsername(storedUsername);
    //   }
    // }, []);
  
    const handleLogout = () => {
      logoutUser();
      navigate('/login'); // Redirect to login page on logout
    };
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Device Management
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/Device">Devices</Link>
        </li>
        <li>
          <Link to="/OrderPage">Orders</Link>
        </li>
        <li>
          <Link to="/AddDevice">Add Device</Link>
        </li>
        <li>
        <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
