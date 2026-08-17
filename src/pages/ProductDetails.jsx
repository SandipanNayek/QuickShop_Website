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
      <h2
        style={{
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        Product Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "60px auto",
        padding: "40px",
        display: "flex",
        gap: "60px",
        alignItems: "center",
      }}
    >
      {/* Image */}

      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "420px",
          borderRadius: "15px",
          objectFit: "cover",
        }}
      />

      {/* Details */}

      <div>

        <h1
          style={{
            fontSize: "40px",
            marginBottom: "20px",
          }}
        >
          {product.title}
        </h1>

        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              color: "#DB4444",
            }}
          >
            ${product.price}
          </h2>

          <del
            style={{
              color: "#777",
            }}
          >
            ${product.oldPrice}
          </del>
        </div>

        <p
          style={{
            marginBottom: "20px",
            fontSize: "18px",
          }}
        >
          Category : <b>{product.category}</b>
        </p>

        <p
          style={{
            marginBottom: "30px",
            color: "#ffb400",
            fontSize: "20px",
          }}
        >
          {[...Array(product.rating)].map((_, i) => (
            <FaStar key={i} />
          ))}

          <span
            style={{
              color: "#555",
              marginLeft: "10px",
            }}
          >
            ({product.reviews} Reviews)
          </span>
        </p>

        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "14px 35px",
            border: "none",
            background: "#DB4444",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "17px",
            marginRight: "15px",
          }}
        >
          Add To Cart
        </button>

        <button
          onClick={() =>
            isInWishlist(product.id)
              ? removeFromWishlist(product.id)
              : addToWishlist(product)
          }
          style={{
            padding: "14px 35px",
            border: "2px solid #DB4444",
            background: "white",
            color: "#DB4444",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "17px",
          }}
        >
          {isInWishlist(product.id)
            ? "Remove Wishlist"
            : "Add Wishlist"}
        </button>

      </div>
    </div>
  );
}

export default ProductDetails;