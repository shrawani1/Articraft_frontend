import React, { useState } from "react";
import Modal from "react-modal";
import { registerUserApi } from "../apis/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./RegisterModal.css"; // Ensure you style the modal appropriately

// Set the app element for accessibility
Modal.setAppElement("#root");

const RegisterModal = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const validate = () => {
    const errors = {};
    if (!firstName.trim()) errors.firstName = "First name is required!";
    if (!lastName.trim()) errors.lastName = "Last name is required!";
    if (!email.trim()) errors.email = "Email is required!";
    if (!phone.trim()) errors.phone = "Phone number is required!";
    if (!password.trim()) errors.password = "Password is required!";
    if (!confirmPassword.trim())
      errors.confirmPassword = "Confirm password is required!";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) return;
  
    const data = { firstName, lastName, email, phone, password };
  
    try {
      const res = await registerUserApi(data);
  
      if (!res?.data?.success) {
        toast.error(res?.data?.message || "Registration failed. Please try again."); // Show error toast
      } else {
        toast.success(res.data.message); // Show success toast
        navigate("/login"); // Redirect after successful registration
        onClose(); // Close the modal
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage); // Show error toast for unexpected errors
    }
  };
  

  const handleLoginRedirect = () => {
    onClose(); // Close the modal
    navigate("/login");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Register Modal"
      className="register-modal-container"
      overlayClassName="modal-overlay"
    >
      <div className="register-modal">
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <h1 className="register-title">Let’s create an account!</h1>
        <p className="register-subtitle">Sign up to explore more</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
            type="text"
            className="register-input"
            placeholder="First Name"
          />
          {errors.firstName && <p className="error-msg">{errors.firstName}</p>}

          <input
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
            type="text"
            className="register-input"
            placeholder="Last Name"
          />
          {errors.lastName && <p className="error-msg">{errors.lastName}</p>}

          <input
            name="email"
            value={email}
            onChange={handleInputChange}
            type="email"
            className="register-input"
            placeholder="Email"
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}

          <input
            name="phone"
            value={phone}
            onChange={handleInputChange}
            type="text"
            className="register-input"
            placeholder="Phone"
          />
          {errors.phone && <p className="error-msg">{errors.phone}</p>}

          <input
            name="password"
            value={password}
            onChange={handleInputChange}
            type="password"
            className="register-input"
            placeholder="Password"
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}

          <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            type="password"
            className="register-input"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}

          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>
        <p className="login-redirect">
          Already have an account?{" "}
          <span onClick={handleLoginRedirect} className="login-link">
            Login
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default RegisterModal;
