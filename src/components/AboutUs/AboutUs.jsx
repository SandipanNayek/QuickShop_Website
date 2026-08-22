import "./AboutUs.css";
import { useState, useEffect } from "react";

function AboutUs() {
  const [products, setProducts] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [support, setSupport] = useState(0);
  const [security, setSecurity] = useState(0);

  useEffect(() => {
    const animate = (setValue, end, duration = 2000) => {
      let start = 0;
      const increment = end / (duration / 20);

      const timer = setInterval(() => {
        start += increment;

        if (start >= end) {
          setValue(end);
          clearInterval(timer);
        } else {
          setValue(Math.floor(start));
        }
      }, 20);
    };

    animate(setProducts, 18);
    animate(setCustomers, 1000);
    animate(setSupport, 24);
    animate(setSecurity, 100);
  }, []);

  return (
    <section className="about">
      <div className="about-container">

        <div className="about-content">

          <span className="about-tag">About QuickShop</span>

          <h1>Your Trusted Online Shopping Destination</h1>

          <p>
            QuickShop is a modern e-commerce platform built to make online
            shopping simple, fast, and enjoyable.
          </p>

          <p>
            Our goal is to provide customers with secure shopping,
            fast delivery, and excellent customer support.
          </p>

          <div className="about-stats">

            <div className="stat-card">
              <h2>{products}+</h2>
              <p>Products</p>
            </div>

            <div className="stat-card">
              <h2>{customers.toLocaleString()}+</h2>
              <p>Happy Customers</p>
            </div>

            <div className="stat-card">
              <h2>{support}/7</h2>
              <p>Customer Support</p>
            </div>

            <div className="stat-card">
              <h2>{security}%</h2>
              <p>Secure Shopping</p>
            </div>

          </div>

        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900"
            alt="QuickShop"
          />
        </div>

      </div>
    </section>
  );
}

export default AboutUs;