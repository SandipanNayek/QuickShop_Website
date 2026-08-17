import "../styles/ProductDetails.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import { products } from "../components/Products/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  useEffect(() => {
    if (!product) return;

    const recent =
      JSON.parse(localStorage.getItem("recentProducts")) || [];

    const updated = [
      product,
      ...recent.filter((item) => item.id !== product.id),
    ].slice(0, 6);

    localStorage.setItem(
      "recentProducts",
      JSON.stringify(updated)
    );
  }, [product]);

  if (!product) {
    return (
      <h2 className="not-found">
        Product Not Found
      </h2>
    );
  }

  return (
    <section className="product-details">

      <div className="product-image-box">
        <img
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="product-info-box">

        <h1>{product.title}</h1>

        <div className="price-row">
          <span className="price">
            ${product.price}
          </span>

          <del>
            ${product.oldPrice}
          </del>
        </div>

        <p className="category">
          Category :
          <strong> {product.category}</strong>
        </p>

        <div className="rating">

          {[...Array(product.rating)].map((_, i) => (
            <FaStar key={i} />
          ))}

          <span>
            ({product.reviews} Reviews)
          </span>

        </div>

        <div className="buttons">

          <button
            className="cart-btn"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>

          <button
            className="wishlist-btn"
            onClick={() =>
              isInWishlist(product.id)
                ? removeFromWishlist(product.id)
                : addToWishlist(product)
            }
          >
            {isInWishlist(product.id)
              ? "Remove Wishlist"
              : "Add Wishlist"}
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;