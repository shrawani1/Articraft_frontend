// import React, { useState } from "react";
// import Modal from "react-modal";
// import { toast } from "react-toastify";
// import { loginUserApi } from "../apis/Api"; // Replace with the correct path
// import { useNavigate } from "react-router-dom";
// import "./LoginModal.css";

// Modal.setAppElement("#root");

// const LoginModal = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

//   const validate = () => {
//     let isValid = true;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setEmailError("Please enter a valid email address.");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }
//     if (password.trim() === "") {
//       setPasswordError("Password cannot be empty.");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }
//     return isValid;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (isSubmitting) return; // Prevent multiple clicks

//     if (!validate()) return;

//     setIsSubmitting(true); // Block further submissions until resolved

//     try {
//       const response = await loginUserApi({ email, password });

//       if (response.data.success) {
//         toast.dismiss(); // Dismiss any existing toasts
//         toast.success("Welcome back!", {
//           onClose: () => navigate("/dashboard"), // Redirect to dashboard
//         });
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.userData));

//         // Clear form and close modal
//         setEmail("");
//         setPassword("");
//         setEmailError("");
//         setPasswordError("");
//         onClose();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "An unexpected error occurred. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false); // Allow future submissions
//     }
//   };

//   const handleCreateAccount = () => {
//     onClose();
//     navigate("/register");
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Login Modal"
//       className="login-modal-container"
//       overlayClassName="modal-overlay"
//     >
//       <div className="login-modal">
//         <button className="close-modal" onClick={onClose}>
//           &times;
//         </button>
//         <h2 className="modal-heading">Welcome Back!</h2>
//         <p className="modal-subheading">Hello there, login to continue</p>
//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className={emailError ? "input-error" : ""}
//             />
//             {emailError && <p className="error">{emailError}</p>}
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className={passwordError ? "input-error" : ""}
//             />
//             {passwordError && <p className="error">{passwordError}</p>}
//           </div>
//           <button type="submit" className="login-btn" disabled={isSubmitting}>
//             {isSubmitting ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <div className="create-account-footer">
//           <p>
//             New User?{" "}
//             <button className="link-btn" onClick={handleCreateAccount}>
//               Create account
//             </button>
//           </p>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default LoginModal;

// import React, { useState } from "react";
// import Modal from "react-modal";
// import { toast } from "react-toastify";
// import { loginUserApi } from "../apis/Api"; // Replace with the correct path
// import { useNavigate } from "react-router-dom";
// import "./LoginModal.css";

// // Set the app element for accessibility
// Modal.setAppElement("#root");

// const LoginModal = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
//   const navigate = useNavigate();

//   const validate = () => {
//     let isValid = true;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       setEmailError("Please enter a valid email address.");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (password.trim() === "") {
//       setPasswordError("Password cannot be empty.");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     return isValid;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     if (isSubmitting) return; // Prevent multiple submissions
//     if (!validate()) return;
  
//     setIsSubmitting(true); // Block further submissions
  
//     try {
//       toast.dismiss(); // Clear existing toasts
//       const response = await loginUserApi({ email, password });
  
//       if (response.data.success) {
//         toast.success("Login successful!", {
//           onClose: () => {
//             // Save user data
//             localStorage.setItem("token", response.data.token);
//             localStorage.setItem("user", JSON.stringify(response.data.userData));
  
//             // Redirect based on role
//             if (response.data.userData.isAdmin) {
//               navigate("/admindashboard");
//             } else {
//               navigate("/dashboard");
//             }
//           },
//         });
  
//         // Reset form state
//         setEmail("");
//         setPassword("");
//         setEmailError("");
//         setPasswordError("");
//         onClose(); // Close modal
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Login failed. Please check your credentials.");
//     } finally {
//       setIsSubmitting(false); // Allow future submissions
//     }
//   };
  

//   const handleCreateAccount = () => {
//     onClose(); // Close modal
//     navigate("/register"); // Navigate to register page
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Login Modal"
//       className="login-modal-container"
//       overlayClassName="modal-overlay"
//     >
//       <div className="login-modal">
//         <button className="close-modal" onClick={onClose}>
//           &times;
//         </button>
//         <h2 className="modal-heading">Welcome Back!</h2>
//         <p className="modal-subheading">Hello there, login to continue</p>
//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className={emailError ? "input-error" : ""}
//             />
//             {emailError && <p className="error">{emailError}</p>}
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className={passwordError ? "input-error" : ""}
//             />
//             {passwordError && <p className="error">{passwordError}</p>}
//           </div>
//           <button type="submit" className="login-btn" disabled={isSubmitting}>
//             {isSubmitting ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <div className="create-account-footer">
//           <p>
//             New User?{" "}
//             <button className="link-btn" onClick={handleCreateAccount}>
//               Create account
//             </button>
//           </p>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default LoginModal;
import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../apis/Api";
import "./LoginModal.css";

// Set the app element for accessibility
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

    setIsLoading(true); // Start loading state
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
      setIsLoading(false); // Stop loading state
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
    // Clear inputs and errors when the modal is closed
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
