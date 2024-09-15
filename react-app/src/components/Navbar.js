import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Add custom styles here
import { logoutUser } from '../services/AuthService';
import LogoutIcon from '@mui/icons-material/Logout'; // Import Logout Icon
import PersonIcon from '@mui/icons-material/Person'; // Import Person Icon for the username


const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('User');
  const [userId, setUserId] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Manage burger menu state

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    logoutUser();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logoV.png" alt="Logo" style={{ height: '200px' }} />
        <button className="burger-menu" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to="/Device" onClick={() => setIsOpen(false)}>Devices List</Link>
        </li>
        <li>
          <Link to={`/OrderPage?userId=${userId}`} onClick={() => setIsOpen(false)}>Orders List</Link>
        </li>
        <li>
          <Link to="/AddDevice" onClick={() => setIsOpen(false)}>Add Device</Link>
        </li>
        <li className="navbar-username">
          <PersonIcon id="usericon" fontSize="medium"/> {/* User Icon */}
          <span className="username-text">{username}</span> {/* Username displayed */}
        </li>
        <li className="logout" id="logoutbtn">
          {/* Use Logout Icon for logout */}
          <button
            onClick={handleLogout}
            
          >
            <LogoutIcon fontSize="medium" /> {/* Logout icon */}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
