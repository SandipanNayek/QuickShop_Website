import "../styles/Checkout.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setBilling({
      ...billing,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (
      !billing.firstName.trim() ||
      !billing.lastName.trim() ||
      !billing.address.trim() ||
      !billing.city.trim() ||
      !billing.phone.trim() ||
      !billing.email.trim()
    ) {
      toast.error("Please fill all required billing details.");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      userEmail: currentUser?.email,
      items: cart,
      total: totalPrice,
      status: "Ordered",
      date: new Date().toLocaleDateString(),
      createdAt: Date.now(),
    };

    orders.unshift(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    toast.success("Order placed successfully 🎉");

    clearCart();

    navigate("/success");
  };

  return (
    <section className="checkout">

      <div className="checkout-left">

        <h2>Billing Details</h2>

        <form id="checkout-form" onSubmit={handleOrder}>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={billing.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={billing.lastName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name (Optional)"
            value={billing.company}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={billing.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="Town / City"
            value={billing.city}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={billing.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={billing.email}
            onChange={handleChange}
            required
          />

        </form>

      </div>

      <div className="checkout-right">

        <h2>Your Order</h2>

        {cart.map((item) => (
          <div className="order-item" key={item.id}>
            <span>
              {item.title} × {item.quantity}
            </span>

            <span>
              ${item.price * item.quantity}
            </span>
          </div>
        ))}

        <hr />

        <div className="order-item">
          <strong>Subtotal</strong>
          <strong>${totalPrice}</strong>
        </div>

        <div className="order-item">
          <strong>Shipping</strong>
          <strong>Free</strong>
        </div>

        <div className="order-item total">
          <strong>Total</strong>
          <strong>${totalPrice}</strong>
        </div>

        <h3>Payment Method</h3>

        <label>
          <input type="radio" name="payment" defaultChecked />
          Cash On Delivery
        </label>

        <label>
          <input type="radio" name="payment" />
          Credit / Debit Card
        </label>

        <label>
          <input type="radio" name="payment" />
          UPI
        </label>

        <button
          type="submit"
          form="checkout-form"
          className="place-order-btn"
        >
          Place Order
        </button>

      </div>

    </section>
  );
}

export default Checkout;