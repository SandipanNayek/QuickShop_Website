import "./Navbar.css";
import {
  FaHome,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

function Navbar({ searchTerm, setSearchTerm }) {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { user } = useAuth();

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <nav className="navbar">
      <h2 className="logo">QuickShop</h2>

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button>Search</button>
      </div>

      <div className="nav-icons">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "icon active" : "icon"
          }
        >
          <FaHome />
        </NavLink>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "icon active" : "icon"
          }
        >
          <FaHeart />

          {wishlist.length > 0 && (
            <span className="count">
              {wishlist.length}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "icon active" : "icon"
          }
        >
          <FaShoppingCart />

          {cart.length > 0 && (
            <span className="count">
              {cart.length}
            </span>
          )}
        </NavLink>

        <NavLink
          to={user ? "/profile" : "/login"}
          className={({ isActive }) =>
            isActive ? "icon active" : "icon"
          }
        >
          <FaUser />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;