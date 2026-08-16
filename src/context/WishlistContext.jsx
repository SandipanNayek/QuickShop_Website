import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  
  useEffect(() => {
    if (user) {
      const saved =
        JSON.parse(
          localStorage.getItem(`wishlist_${user.email}`)
        ) || [];

      setWishlist(saved);
    } else {
      setWishlist([]);
    }
  }, [user]);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `wishlist_${user.email}`,
        JSON.stringify(wishlist)
      );
    }
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    setWishlist((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      if (exists) {
        toast.info(
          `${product.name || product.title} is already in your wishlist ❤️`
        );
        return prev;
      }

      toast.success(
        `${product.name || product.title} added to wishlist ❤️`
      );

      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );

    toast.success("Removed from Wishlist");
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () =>
  useContext(WishlistContext);