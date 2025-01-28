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

        {/* New Arrivals Section */}
        <h2 className="mt-5 collection-heading">New Arrivals</h2>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.length > 0 ? (
            products.slice(0, 4).map((singleProduct) => (
              <div className="col" key={singleProduct._id}>
                <ProductCard productInformation={singleProduct} color={"blue"} />
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No new arrivals found.</p>
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
