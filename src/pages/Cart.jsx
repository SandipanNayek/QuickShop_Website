import "../styles/Cart.css";
import { useCart } from "../context/CartContext";
import {
  FaTrash,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();
  const navigate = useNavigate()

  return (
    <section className="cart">

      <div className="cart-header">

        <h2>
          Shopping Cart
          <span> ({cart.length})</span>
        </h2>

      </div>

      {cart.length === 0 ? (

        <div className="empty-cart">

          <h2>Your Cart is Empty 🛒</h2>

          <p>Add products from Home Page.</p>

        </div>

      ) : (

        <>
          <div className="cart-items">

            {cart.map((product) => (

              <div
                className="cart-item"
                key={product.id}
              >

                <div className="cart-left">

                  <img
                    src={product.image}
                    alt={product.title || product.name}
                  />

                  <div>

                    <h3>
                      {product.title || product.name}
                    </h3>

                    <p>${product.price}</p>

                  </div>

                </div>

                <div className="cart-right">

                  <div className="quantity">

                    <button
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                    >
                      <FaMinus />
                    </button>

                    <span>{product.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                    >
                      <FaPlus />
                    </button>

                  </div>

                  <h3>
                    $
                    {product.price * product.quantity}
                  </h3>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      removeFromCart(product.id)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h2>Cart Total</h2>

            <div>

              <span>Subtotal</span>

              <span>${totalPrice}</span>

            </div>

            <div>

              <span>Shipping</span>

              <span>Free</span>

            </div>

            <div className="total">

              <span>Total</span>

              <span>${totalPrice}</span>

            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
            </button>

          </div>

        </>

      )}

    </section>
  );
}

export default Cart;