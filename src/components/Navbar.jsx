import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/user/${user._id}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setWelcomeMessage(`Welcome back, ${data.firstName}!`);
        } catch (error) {
          console.log('Failed to fetch user data', error);
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearch = () => {
    navigate(`/dashboard?search=${searchQuery}`);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <Link className="navbar-logo-link" to="/">
            <img src="../assets/images/logo.png" alt="Logo" className="navbar-logo" />
            <span className="brand-name">
              <span className="brand-highlight">Happy</span> Feet
            </span>
          </Link>
          <div className="navbar-links-left">
            <Link className="nav-link" to="/dashboard">Home</Link>
            {user && <Link className="nav-link" to="/profile">Profile</Link>}
            <Link to="/Favourites" className="nav-link">Favourites</Link>
            <Link to="/my_cart" className="nav-link">My Cart</Link>
          </div>
        </div>
        <div className="navbar-links-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
            />
            <button onClick={handleSearch} className="btn btn-primary">Search</button>
          </div>
          {user ? (
            <div className="nav-item dropdown">
              <button className="nav-link dropdown-toggle">
                <i className="fas fa-user mr-2"></i>
                {user.firstName}
                <div className="welcome-message">{welcomeMessage}</div>
              </button>
              <div className="dropdown-menu">
                <Link to="/orderlist" className="dropdown-item">My Orders</Link>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
