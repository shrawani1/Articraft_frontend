// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const CategoriesPage = () => {
//     const { category } = useParams(); // Get category from URL params
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProductsByCategory = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/products/category/${category}`);
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || "Failed to fetch products");
//                 }
//                 const data = await response.json();
//                 setProducts(data.products);
//             } catch (err) {
//                 console.error(err.message);
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProductsByCategory();
//     }, [category]);

//     if (loading) return <p>Loading products...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <h1>Products in {category}</h1>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//                 {products.map((product) => (
//                     <div
//                         key={product._id}
//                         style={{
//                             border: "1px solid #ddd",
//                             padding: "10px",
//                             borderRadius: "5px",
//                             width: "200px",
//                         }}
//                     >
//                         <img
//                             src={`http://localhost:5000/products/${product.productImage}`}
//                             alt={product.productName}
//                             style={{ width: "100%", height: "150px", objectFit: "cover" }}
//                         />
//                         <h3>{product.productName}</h3>
//                         <p>Price: ${product.productPrice}</p>
//                         <p>{product.productDescription}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CategoriesPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/category/${category}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching products by category:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-page">
      <h1>Products in {category}</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`http://localhost:5000/products/${product.productImage}`}
                alt={product.productName}
                className="product-image"
              />
              <h3>{product.productName}</h3>
              <p>Price: Rs {product.productPrice}</p>
              <p>Category: {product.productCategory}</p>
              <p>{product.productDescription}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

