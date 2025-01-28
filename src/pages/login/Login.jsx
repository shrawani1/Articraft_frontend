import React, { useState } from "react";
import LoginModal from "../../components/LoginModal"; // Adjust the import path if necessary

const Login = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(true); // Always open the modal on this page

    const handleClose = () => {
        // Optionally redirect after closing
        setIsLoginOpen(false);
        // window.location.href = "/";
    };

    return (
        <div>
            <LoginModal isOpen={isLoginOpen} onClose={handleClose} />
        </div>
    );
};

export default Login;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loginUserApi } from "../../apis/Api";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email.trim() || !password.trim()) {
//       toast.error("Both email and password are required.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const data = { email, password };
//       const res = await loginUserApi(data);

//       if (res.data.success) {
//         toast.success("Login successful!");
//         localStorage.setItem("user", JSON.stringify(res.data.userData));
//         localStorage.setItem("token", res.data.token);

//         // Redirect user based on role
//         if (res.data.userData.isAdmin) {
//           navigate("/admindashboard");
//         } else {
//           navigate("/dashboard");
//         }
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error("Login failed. Please check your credentials.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCreateAccount = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="login-page">
//       <div className="login-box">
//         <h1 className="login-title">Welcome Back!</h1>
//         <p className="login-subtitle">Hello there, login to continue</p>
//         <form onSubmit={handleLogin} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="login-input"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="login-input"
//             />
//           </div>
//           <button
//             type="submit"
//             className="login-button"
//             disabled={isSubmitting} // Disable button during submission
//           >
//             {isSubmitting ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p className="login-footer">
//           New User?{" "}
//           <span
//             className="create-account"
//             onClick={handleCreateAccount}
//             role="button"
//           >
//             Create account
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
