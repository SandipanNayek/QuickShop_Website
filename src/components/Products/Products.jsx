import "./Products.css";
import ProductCard from "./ProductCard";
import { products } from "./products";

function Products({ searchTerm }) {

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sportsProducts = filteredProducts.filter(
    (product) => product.category === "Sports"
  );

  const electronicsProducts = filteredProducts.filter(
    (product) => product.category === "Electronics"
  );

  const clothesProducts = filteredProducts.filter(
    (product) => product.category === "Clothes"
  );

  const renderSection = (title, items) => {
    if (items.length === 0) return null;

    return (
      <div className="product-section">

        <h2 className="section-title">{title}</h2>

        <div className="products-grid">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    );
  };

  return (
    <section className="products">

      <div className="products-header">

        <div className="products-title">

          <div className="products-tag">
            <span></span>
            <p>Our Products</p>
          </div>

          <h2>
            {searchTerm
              ? `Search Results (${filteredProducts.length})`
              : "Explore Our Products"}
          </h2>

        </div>

      </div>

      {searchTerm ? (

        <div className="products-grid">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <h2>No products found.</h2>
          )}

        </div>

      ) : (

        <>
          {renderSection("⚽ Sports", sportsProducts)}

          {renderSection("💻 Electronics", electronicsProducts)}

          {renderSection("👕 Clothes", clothesProducts)}
        </>

      )}

    </section>
  );
}

export default Products;