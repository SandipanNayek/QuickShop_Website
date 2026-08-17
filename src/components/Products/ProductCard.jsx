import { Link } from "react-router-dom";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  return (
    <div className="product-card">

      {/* Product Image */}

      <div className="product-image">

        {product.discount && (
          <span className="discount">
            {product.discount}
          </span>
        )}

        <div className="product-icons">

          <button
            onClick={(e) => {
              e.stopPropagation();

              isInWishlist(product.id)
                ? removeFromWishlist(product.id)
                : addToWishlist(product);
            }}
          >
            <FaHeart
              color={
                isInWishlist(product.id)
                  ? "#DB4444"
                  : "#555"
              }
            />
          </button>

          <Link to={`/product/${product.id}`}>
            <button>
              <FaEye />
            </button>
          </Link>

        </div>

        <Link
          to={`/product/${product.id}`}
          className="product-link"
        >
          <img
            src={product.image}
            alt={product.title}
          />
        </Link>

        <button
          className="cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Add To Cart
        </button>

      </div>

      {/* Product Info */}

      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >
        <div className="product-info">

          <h3>{product.title}</h3>

          <div className="price">

            <span className="new-price">
              ${product.price}
            </span>

            <span className="old-price">
              ${product.oldPrice}
            </span>

          </div>

          <div className="rating">

            {[...Array(product.rating)].map((_, i) => (
              <FaStar
                key={i}
                className="star"
              />
            ))}

            <span>({product.reviews})</span>

          </div>

        </div>
      </Link>

    </div>
  );
}

export default ProductCard;