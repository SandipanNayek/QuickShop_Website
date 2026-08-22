import "../styles/Checkout.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");

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

  const placeOrder = async () => {
    try {
      const currentUser =
        JSON.parse(localStorage.getItem("currentUser")) || {};

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: currentUser.email,
            customerName:
              billing.firstName + " " + billing.lastName,
            phone: billing.phone,
            address: billing.address,
            city: billing.city,
            items: cart,
            total: totalPrice,
            paymentMethod,
            paymentStatus:
              paymentMethod === "cod"
                ? "Pending"
                : "Paid",
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error("Unable to save order.");
        return;
      }

      clearCart();

      toast.success("🎉 Order placed successfully!");

      navigate("/success");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    }
  };

  const openRazorpay = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalPrice,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error("Unable to create payment.");
        return;
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "QuickShop",
        description: "Order Payment",
        order_id: data.order.id,

        prefill: {
          name:
            billing.firstName +
            " " +
            billing.lastName,
          email: billing.email,
          contact: billing.phone,
        },

        theme: {
          color: "#ff6b35",
        },

        handler: async function (response) {
          console.log(response);

          toast.success("✅ Payment Successful!");

          await placeOrder();
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment Cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function () {
        toast.error("Payment Failed!");
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const handleOrder = async (e) => {
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
      toast.error(
        "Please fill all required billing details."
      );
      return;
    }

    if (paymentMethod === "cod") {
      await placeOrder();
    } else {
      await openRazorpay();
    }
  };

  return (
    <section className="checkout">

      <div className="checkout-left">

        <h2>Billing Details</h2>

        <form
          id="checkout-form"
          onSubmit={handleOrder}
        >
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
          <div
            className="order-item"
            key={item.id}
          >
            <span>
              {item.title} × {item.quantity}
            </span>

            <span>
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

        <hr />

        <div className="order-item">
          <strong>Subtotal</strong>
          <strong>₹{totalPrice}</strong>
        </div>

        <div className="order-item">
          <strong>Shipping</strong>
          <strong>Free</strong>
        </div>

        <div className="order-item total">
          <strong>Total</strong>
          <strong>₹{totalPrice}</strong>
        </div>

        <h3>Payment Method</h3>

        <label>
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Cash On Delivery
        </label>

        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Credit / Debit Card
        </label>

        <label>
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
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