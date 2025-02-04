import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setIsLoginOpen }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [user, setUser] = useState(null); // Manage user state
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State to control logout modal
  
  // Predefined categories
  const [categories] = useState([
    "Accessories",
    "Gifts",
    "Bags",
    "Jewellery",
    "Arts"
  ]);

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Reset user state
    navigate("/login");
  };

  const handleSearch = () => {
    navigate(`/dashboard?search=${searchQuery}`);
  };

  const handleLogin = () => {
    if (typeof setIsLoginOpen !== "function") {
      console.error("setIsLoginOpen is not defined or not a function");
      return;
    }
    setIsLoginOpen(true); // Open the modal
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (category) {
      navigate(`/category/${category}`);
      // Reset the dropdown by setting its value back to the default
      event.target.value = '';
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <div
            className="navbar-logo-link"
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              className="navbar-logo-circle"
            />
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Tap to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="navbar-links-right">
          <Link className={`nav-link ${isActive("/dashboard") ? "active" : ""}`} to="/dashboard">
            Home
          </Link>
          {user && (
            <Link className={`nav-link ${isActive("/profile") ? "active" : ""}`} to="/profile">
              Profile
            </Link>
          )}
          <Link className={`nav-link ${isActive("/favourites") ? "active" : ""}`} to="/favourites">
            Favourites
          </Link>
          <select className="nav-link dropdown" onChange={handleCategoryChange} defaultValue="">
            <option value="" disabled>Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <Link className={`nav-link ${isActive("/my_cart") ? "active" : ""}`} to="/my_cart">
            Cart
          </Link>
          <Link className={`dropdown-item ${isActive("/orderlist") ? "active" : ""}`} to="/orderlist">
            My Orders
          </Link>
          {user ? (
            <>
              <button className="logout-button" onClick={() => setShowLogoutConfirm(true)}>
                Logout
              </button>
              {showLogoutConfirm && (
                <div className="logout-modal-overlay">
                  <div className="logout-modal">
                    <p>Are you sure you want to log out?</p>
                    <div className="logout-modal-actions">
                      <button className="logout-confirm-btn" onClick={handleLogout}>
                        Yes
                      </button>
                      <button className="logout-cancel-btn" onClick={() => setShowLogoutConfirm(false)}>
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button className="logout-button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
