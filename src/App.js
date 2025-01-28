

import './App.css';
import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NavbarSwitch from './components/NavbarSwitch';
import AdminDashboard from './admin/admin_dashboard/AdminDashboard';
import UpdateProducts from './admin/update_product/updateProducts';
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';
import Profile from './Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/forgot_password/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyCart from './pages/myCart/MyCart';
import ViewProduct from './pages/view_product/ViewProduct';
import AboutUs from './pages/aboutUs/AboutUs';
import Services from './pages/services/Services';
import Team from './pages/team/Team';
import Contact from './pages/contact/Contact';
import { addToCartApi, deleteCartApi, getAllCartApi, updateCartApi } from './apis/Api';
import Cart from './pages/myCart/MyCart';
import Favourites from './pages/favourites/Favourites';
import OrderList from './pages/order_list/OrderList';
import ViewContact from './admin/view_contact/ViewContact';
import LoginModal from './components/LoginModal'; // Import the LoginModal component
import RegisterModal from './components/RegisterModal'; // Import the RegisterModal 
import Help from './pages/help/Help';

function App() {
  const [cart, setCart] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for login modal
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // State for register modal

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getAllCartApi();
      setCart(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    }
  };


  const addToCart = async (product) => {
    try {
      const existingItem = cart.find((item) => item.productId === product._id);
      if (existingItem) {
        await updateCartApi(existingItem._id, {
          quantity: existingItem.quantity + 1,
        });
      } else {
        await addToCartApi({
          productId: product._id,
          quantity: 1,
          total: product.productPrice,
        });
      }
      await fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      await updateCartApi(id, { quantity: newQuantity });
      await fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await deleteCartApi(id);
      await fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <Router>
      {/* Navbar with Login Modal State */}
      <NavbarSwitch
        setIsLoginOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
      />
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    
      />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setIsRegisterOpen={setIsRegisterOpen}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Admin routes */}
        <Route element={<AdminRoutes />}>
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/admin/update/:id' element={<UpdateProducts />} />
          <Route path="/contactus" element={<ViewContact />} />
        </Route>

        {/* User routes */}
        <Route element={<UserRoutes />}>
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/view_product/:id" element={<ViewProduct />} />
          <Route path='/my_cart' element={<MyCart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/services' element={<Services />} />
          <Route path='/team' element={<Team />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/' element={<Dashboard cart={cart} addToCart={addToCart} />} />
          <Route path='/cart' element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/help" element={<Help />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
