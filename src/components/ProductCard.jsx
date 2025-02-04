
       
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Image, Form, Input, Radio, Modal } from "antd";
import styled from "styled-components";
import { addToFavoriteApi, getReviewsApi, addToCartApi, createOrderApi } from '../apis/Api';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ productInformation, color }) => {
  const [show, setShow] = useState(false);
  const [buyNowShow, setBuyNowShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const response = await getReviewsApi(productInformation._id);
      setReviews(response.data);
    } catch (error) {
      toast.error('Failed to fetch reviews.');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent card click navigation
    try {
      const total = quantity * productInformation.productPrice;
      await addToCartApi({
        productId: productInformation._id,
        quantity: 1,
        total: total,
      });
      toast.success("Added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add to cart.");
    }
  };

  const addToFavourites = async (e) => {
    e.stopPropagation(); // Prevent card click navigation
    try {
      await addToFavoriteApi({ productId: productInformation._id });
      toast.success("Added to favourites successfully");
    } catch (error) {
      toast.error("Error adding to favourites");
    }
  };

  return (
    <div
      className="card"
      style={{
        width: '18rem',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => navigate(`/view_product/${productInformation._id}`)} // Navigate to product details
    >
      {/* Badge
      <span
        style={{
          backgroundColor: color,
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '0.5rem',
          color: 'white',
          fontSize: '0.9rem',
          borderRadius: '0 0.5rem 0.5rem 0',
        }}
      >
        {productInformation.productCategory}
      </span> */}

      {/* Product Image */}
      <img
        src={`http://localhost:5000/products/${productInformation.productImage}`}
        className="card-img-top"
        alt="Product"
        style={{ height: '12rem', objectFit: 'cover' }}
      />

      {/* Heart Button */}
      <div
        className="heart-button"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid rgba(0, 0, 0, 0.2)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1,
        }}
        onClick={(e) => addToFavourites(e)}
      >
        <HeartOutlined style={{ color: "red", fontSize: "20px" }} />
      </div>

      {/* Card Body */}
      <div
        className="card-body"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'calc(100% - 12rem)',
        }}
      >
        <div className="text-center">
          <h5 className="card-title">{productInformation.productName}</h5>
          <h5 className="card-title text-danger">Rs {productInformation.productPrice}</h5>
        </div>

        <p className="card-text text-center">
          {productInformation.productDescription.slice(0, 30)}...
        </p>


        <button
          onClick={(e) => handleAddToCart(e)}
          className="btn btn-primary mt-2"
        >
          Add to cart
        </button>

        

        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductCard;
