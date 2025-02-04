
import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../apis/Api";
import "./LoginModal.css";


Modal.setAppElement("#root");

const LoginModal = ({ isOpen, onClose, setIsRegisterOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const validate = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required!");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address!");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required!");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long!");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true); 
    try {
      const response = await loginUserApi({ email, password });
      if (response.data.success) {
        toast.success("Login successful!");

        // Store user data and token
        localStorage.setItem("user", JSON.stringify(response.data.userData));
        localStorage.setItem("token", response.data.token);

        onClose(); // Close the modal

        // Redirect based on role
        const user = response.data.userData;
        if (user.isAdmin) {
          navigate("/admindashboard"); // Redirect admin to admin dashboard
        } else {
          navigate("/dashboard"); // Redirect regular user to user dashboard
        }
      } else {
        toast.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleRegisterRedirect = () => {
    onClose(); // Close the login modal
    if (typeof setIsRegisterOpen === "function") {
      setIsRegisterOpen(true); // Open the register modal
    } else {
      navigate("/register"); // Redirect to register page
    }
  };

  const handleCloseModal = () => {
    
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Login Modal"
      className="login-modal-container"
      overlayClassName="modal-overlay"
    >
      <div className="login-modal">
        <button className="close-modal" onClick={handleCloseModal}>
          &times;
        </button>
        <h2 className="modal-heading">Welcome Back!</h2>
        <p className="modal-subheading">Hello there, login to continue</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={emailError ? "input-error" : ""}
              disabled={isLoading}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={passwordError ? "input-error" : ""}
              disabled={isLoading}
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="create-account-footer">
          <p>
            New User?{" "}
            <button className="link-btn" onClick={handleRegisterRedirect}>
              Create Account
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
