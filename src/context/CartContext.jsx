import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();

  const [cart, setCart] = useState([]);

  // Load cart for logged-in user
  useEffect(() => {
    if (user) {
      const saved =
        JSON.parse(
          localStorage.getItem(`cart_${user.email}`)
        ) || [];

      setCart(saved);
    } else {
      setCart([]);
    }
  }, [user]);

  // Save cart
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `cart_${user.email}`,
        JSON.stringify(cart)
      );
    }
  }, [cart, user]);

  const addToCart = (product) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    setCart((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      if (exists) {
        toast.success(
          `${product.name || product.title} quantity updated 🛒`
        );

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      toast.success(
        `${product.name || product.title} added to Cart 🛒`
      );

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );

    toast.success("Removed from Cart");
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart Cleared");
  };

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);