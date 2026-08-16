import { useAuth } from "../context/AuthContext";
import "../styles/Orders.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Orders() {
  const { user } = useAuth();

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const loadOrders = () => {
      const allOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      const updatedOrders = allOrders.map((order) => {
        // Don't change cancelled orders
        if (order.status === "Cancelled") {
          return order;
        }

        if (!order.createdAt) return order;

        const seconds = Math.floor(
          (Date.now() - order.createdAt) / 1000
        );

        let status = "Ordered";

        if (seconds >= 40) {
          status = "Delivered";
        } else if (seconds >= 30) {
          status = "Out for Delivery";
        } else if (seconds >= 20) {
          status = "Shipped";
        } else if (seconds >= 10) {
          status = "Processing";
        }

        return {
          ...order,
          status,
        };
      });

      localStorage.setItem(
        "orders",
        JSON.stringify(updatedOrders)
      );

      setUserOrders(
        updatedOrders.filter(
          (order) => order.userEmail === user?.email
        )
      );
    };

    loadOrders();

    const interval = setInterval(loadOrders, 1000);

    return () => clearInterval(interval);
  }, [user]);

  const cancelOrder = (orderId) => {
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: "Cancelled" }
        : order
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    setUserOrders(
      updatedOrders.filter(
        (order) => order.userEmail === user?.email
      )
    );

    toast.success("Order cancelled successfully.");
  };

  return (
    <section className="orders-page">

      <h1>My Orders</h1>

      {userOrders.length === 0 ? (
        <h3>No orders found.</h3>
      ) : (
        userOrders.map((order) => (
          <div className="order-card" key={order.id}>

            <div className="order-header">
              <h3>Order #{order.id}</h3>
            </div>

            {order.status === "Cancelled" ? (
              <div className="cancelled-order">
                ❌ This order has been cancelled.
              </div>
            ) : (
              <div className="tracking">

                <div className={`step ${["Ordered","Processing","Shipped","Out for Delivery","Delivered"].includes(order.status) ? "active" : ""}`}>
                  📦 Ordered
                </div>

                <div className={`step ${["Processing","Shipped","Out for Delivery","Delivered"].includes(order.status) ? "active" : ""}`}>
                  ⚙️ Processing
                </div>

                <div className={`step ${["Shipped","Out for Delivery","Delivered"].includes(order.status) ? "active" : ""}`}>
                  🚚 Shipped
                </div>

                <div className={`step ${["Out for Delivery","Delivered"].includes(order.status) ? "active" : ""}`}>
                  🛵 Out for Delivery
                </div>

                <div className={`step ${order.status === "Delivered" ? "active" : ""}`}>
                  ✅ Delivered
                </div>

              </div>
            )}

            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ${order.total}</p>

            <h4>Products</h4>

            {order.items.map((item) => (
              <div className="order-product" key={item.id}>

                <img
                  src={item.image}
                  alt={item.title}
                  className="order-product-img"
                />

                <div className="order-product-info">

                  <h4>{item.title}</h4>

                  <p>Quantity: {item.quantity}</p>

                  <p>${item.price * item.quantity}</p>

                  {order.status === "Delivered" && (
                    <p className="delivered-msg">
                      🎉 Your item has been delivered successfully.
                    </p>
                  )}

                </div>

              </div>
            ))}

            {(order.status === "Ordered" ||
              order.status === "Processing") && (
              <div className="order-actions">

                <button
                  className="cancel-btn"
                  onClick={() => {
                          const confirmCancel = window.confirm(
                            "Are you sure you want to cancel this order?"
                          );

                          if (confirmCancel) {
                            cancelOrder(order.id);
                          }
                        }}
                   >
                  ❌ Cancel Order
                </button>

              </div>
            )}

          </div>
        ))
      )}

    </section>
  );
}

export default Orders;