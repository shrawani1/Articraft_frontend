
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProducts } from '../apis/Api';


const CategoryProduct = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        const allProducts = res.data.products;
        const filteredProducts = allProducts.filter(
          (product) => product.productCategory === category
        );
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [category]);

  return (
    <div className="category-products container py-4">
      <h1>Products in "{category}"</h1>
      {products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-3">
              <div className="card h-100">
                <img
                  src={`http://localhost:5000/products/${product.productImage}`}
                  className="card-img-top"
                  alt={product.productName}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">${product.productPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available in this category.</p>
      )}
    </div>
  );
};

export default CategoryProduct;
