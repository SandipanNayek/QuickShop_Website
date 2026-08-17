import { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import "./RecentlyViewed.css";

function RecentlyViewed() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const recent =
      JSON.parse(localStorage.getItem("recentProducts")) || [];

    setProducts(recent);
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="recently-viewed">

      <div className="recent-header">
        <span></span>
        <p>Just For You</p>
      </div>

      <h2>Recently Viewed</h2>

      <div className="recent-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}

export default RecentlyViewed;