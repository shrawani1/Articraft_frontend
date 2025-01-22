// import React, { useEffect, useState } from "react";
// import ProductCard from "../../components/ProductCard";
// import { productPagination, productCount } from "../../apis/Api";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Dashboard.css';
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// const Dashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const limit = 10; // Number of products per page

//   useEffect(() => {
//     fetchProductCount();
//     fetchProducts(page, searchQuery, sortOrder);
//   }, [page, searchQuery, sortOrder]);

//   const fetchProducts = (page, searchQuery, sortOrder) => {
//     productPagination(page, limit, searchQuery, sortOrder)
//       .then((res) => {
//         setProducts(res.data.products); 
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const fetchProductCount = () => {
//     productCount()
//       .then((res) => {
//         setTotalPages(Math.ceil(res.data.productCount / limit));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handlePagination = (pageNum) => {
//     setPage(pageNum);
//   };

//   const handleSearch = () => {
//     setPage(1);
//     fetchProducts(1, searchQuery, sortOrder);
//   };

//   const handleSort = (order) => {
//     setSortOrder(order);
//     setPage(1);
//     fetchProducts(1, searchQuery, order);
//   };

//   return (
//     <div className="dashboard-container">
//       <Navbar />

      // {/* Carousel */}
      // <div id="carouselExampleCaptions" className="carousel slide mt-4" data-bs-ride="carousel">
      //   <div className="carousel-indicators">
      //     <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      //     <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      //     <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      //   </div>
      //   <div className="carousel-inner">
      //     <div className="carousel-item active">
      //       <img src="https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Appliance 1" />
      //       <div className="carousel-caption d-none d-md-block">
      //         <h5>Big Sale on Appliances</h5>
      //         <p>Don't miss out on our special discounts.</p>
      //       </div>
      //     </div>
      //     <div className="carousel-item">
      //       <img src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Appliance 2" />
      //       <div className="carousel-caption d-none d-md-block">
      //         <h5>Best Prices Guaranteed</h5>
      //         <p>Get the best deals on top appliances.</p>
      //       </div>
      //     </div>
      //     <div className="carousel-item">
      //       <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Appliance 3" />
      //       <div className="carousel-caption d-none d-md-block">
      //         <h5>Top Quality Appliances</h5>
      //         <p>Shop now for the latest and greatest in home appliances.</p>
      //       </div>
      //     </div>
      //   </div>
      //   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      //     <span className="visually-hidden">Previous</span>
      //   </button>
      //   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
      //     <span className="visually-hidden">Next</span>
      //   </button>
      // </div>

//       {/* Search Bar 
//       <div className="search-container mt-4">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="form-control"
//         />
//         <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
//       </div> */}

//       {/* Product Cards */}
//       <h2 className="mt-4 text-primary">Available Products</h2>
//       <div className="row row-cols-1 row-cols-md-5 g-3">
//         {products.map((singleProduct) => (
//           <div className="col" key={singleProduct._id}> {/* Ensure the key is unique */}
//             <ProductCard productInformation={singleProduct} color={'green'} />
//           </div>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="pagination-container mt-4">
//         <nav>
//           <ul className="pagination">
//             <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => handlePagination(1)}>First</button>
//             </li>
//             <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => handlePagination(page - 1)}>Previous</button>
//             </li>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
//                 <button className="page-link" onClick={() => handlePagination(i + 1)}>{i + 1}</button>
//               </li>
//             ))}
//             <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => handlePagination(page + 1)}>Next</button>
//             </li>
//             <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => handlePagination(totalPages)}>Last</button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Sort Buttons */}
//       <div className="sort-container mt-4">
//         <button onClick={() => handleSort('asc')} className={`btn btn-outline-primary ${sortOrder === 'asc' ? 'active' : ''}`}>Price: Low to High</button>
//         <button onClick={() => handleSort('desc')} className={`btn btn-outline-primary ${sortOrder === 'desc' ? 'active' : ''}`}>Price: High to Low</button>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { productPagination, productCount } from "../../apis/Api";
import Footer from "../../components/Footer";

import "./Dashboard.css";




const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortOrder, setSortOrder] = useState("asc");
  const limit = 10; // Number of products per page

  useEffect(() => {
    fetchProductCount();
    fetchProducts(page, searchQuery, sortOrder);
  }, [page, searchQuery, sortOrder]);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const fetchProducts = (page, searchQuery, sortOrder) => {
    productPagination(page, limit, searchQuery, sortOrder)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchProductCount = () => {
    productCount()
      .then((res) => {
        setTotalPages(Math.ceil(res.data.productCount / limit));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
   
      <div className="container-fluid">
        {/* Carousel */}
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/assets/images/Homepage1.png"
                className="d-block w-100"
                alt="First Slide"
              />
              <div className="carousel-overlay">
                <h3 className="carousel-text-title">Shop Our</h3>
                <h1 className="carousel-text-main">New Arrivals</h1>
                <button className="carousel-btn">Shop Now</button>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/assets/images/Homepage2.png"
                className="d-block w-100"
                alt="Second Slide"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/images/Homepage3.png"
                className="d-block w-100"
                alt="Third Slide"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Collection Heading */}
        <h2 className="mt-2 collection-heading">Our Collection</h2>

        {/* Products Section */}
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.length > 0 ? (
            products.map((singleProduct) => (
              <div className="col" key={singleProduct._id}>
                <ProductCard productInformation={singleProduct} color={"green"} />
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-container mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(1)}
                >
                  First
                </button>
              </li>
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </li>
              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(totalPages)}
                >
                  Last
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
