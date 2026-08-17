import { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "./products";
import "./Products.css";

function Products({ searchTerm = "" }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Sports", "Electronics", "Clothes"];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    return matchSearch && matchCategory;
  });

  return (
    <section className="products">

      <div className="products-header">
        <h2>Explore Our Products</h2>

        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "active-category"
                  : ""
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}

export default Products;