import { useCart } from "../../context/CartContext";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
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

      <div className="product-image">

        {product.discount && (
          <span className="discount">
            {product.discount}
          </span>
        )}

        <div className="product-icons">

          <button
            onClick={() =>
              isInWishlist(product.id)
                ? removeFromWishlist(product.id)
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
          alt={product.title}
        />

        <button
          className="cart-btn"
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>

      </div>

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

          <span>
            ({product.reviews})
          </span>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;