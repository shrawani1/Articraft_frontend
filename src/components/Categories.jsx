
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../apis/Api'; 


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
              
              <Link to={`/categories/${encodeURIComponent(category)}`}>
                {category}
              </Link>
              
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
