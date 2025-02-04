// src/components/Categories.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../apis/Api'; // adjust the path as needed
// import './Categories.css'; // optional: for custom styling

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch all products and extract unique categories
    getAllProducts()
      .then((res) => {
        const products = res.data.products;
        // Use a Set to extract unique category names
        const uniqueCategories = Array.from(
          new Set(products.map((product) => product.productCategory))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="categories-page container py-4">
      <h1>Available Categories</h1>
      {categories.length > 0 ? (
        <ul className="list-group">
          {categories.map((category, index) => (
            <li key={index} className="list-group-item">
              {/* 
                Option 1: Link to a page that shows products for this category.
                (Make sure you create a corresponding route and component, e.g. CategoryProducts)
              */}
              <Link to={`/categories/${encodeURIComponent(category)}`}>
                {category}
              </Link>
              {/* 
                Option 2: If you just want to display the category name without a link, you can simply render:
                {category}
              */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default Categories;
