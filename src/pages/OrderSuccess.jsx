import "../styles/OrderSuccess.css";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function OrderSuccess() {
  const orderId = Math.floor(Math.random() * 1000000);

  return (
    <section className="success">

      <FaCheckCircle className="success-icon" />

      <h1>Order Placed Successfully!</h1>

      <p>
        Thank you for shopping with QuickShop.
      </p>

      <h3>Order ID : #{orderId}</h3>

      <Link to="/" className="continue-btn">
        Continue Shopping
      </Link>

    </section>
  );
}

export default OrderSuccess;