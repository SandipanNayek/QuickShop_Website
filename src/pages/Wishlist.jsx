import "../styles/Wishlist.css";
import ProductCard from "../components/Products/ProductCard";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <section className="wishlist">

      <div className="wishlist-header">

        <div className="wishlist-title">
          <span></span>

          <h2>
            My Wishlist
            <span className="wishlist-count">
              ({wishlist.length})
            </span>
          </h2>
        </div>

        <button className="move-all-btn">
          Move All To Bag
        </button>

      </div>

      {wishlist.length === 0 ? (

        <div className="empty-wishlist">

          <h2>Your Wishlist is Empty ❤️</h2>

          <p>
            Add products by clicking the heart icon.
          </p>

        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      )}

    </section>
  );
}

export default Wishlist;