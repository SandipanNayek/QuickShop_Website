import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import "./ProductCard.css";
import { useCart } from "../../context/CartContext";
function ProductCard({ product }) {
  const { addToCart } = useCart();
  const {
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  return (
    <div className="product-card">

      <div className="product-image">

        <span className="discount">
          {product.discount}
        </span>

        <div className="product-icons">

          <button
            onClick={() =>
              isInWishlist(product.id)
                ? removeFromWishlist(product)
                : addToWishlist(product)
            }
          >
            <FaHeart
              color={
                isInWishlist(product.id)
                  ? "#DB4444"
                  : "#555"
              }
            />
          </button>

          <button>
            <FaEye />
          </button>

        </div>

        <img
          src={product.image}
          alt={product.name}
        />

        <button
          className="cart-btn"
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>

      </div>

      <div className="product-info">

        <h3>{product.name}</h3>

        <div className="price">

          <span className="new-price">
            ${product.price}
          </span>

          <span className="old-price">
            ${product.oldPrice}
          </span>

        </div>

        <div className="rating">

          {[...Array(product.rating)].map((_, index) => (
            <FaStar
              key={index}
              className="star"
            />
          ))}

          <span>({product.reviews})</span>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;