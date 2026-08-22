import "./Navbar.css";

import {
  FaHome,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaMoon,
  FaSun,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { products } from "../Products/products";

function Navbar({ searchTerm, setSearchTerm }) {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { user } = useAuth();

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const result = products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(result.slice(0, 5));
  };

  const selectSuggestion = (title) => {
    setSearchTerm(title);
    setSuggestions([]);
  };

  return (
    <nav className="navbar">

      <h2 className="logo">QuickShop</h2>

      <div className="search-wrapper">

        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={handleSearch}
            onBlur={() => setTimeout(() => setSuggestions([]), 200)}
          />

          <button>Search</button>
        </div>

        {suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((product) => (
              <div
                key={product.id}
                className="suggestion-item"
                onMouseDown={() => selectSuggestion(product.title)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                />

                <div className="suggestion-info">
                  <h4>{product.title}</h4>
                  <p>${product.price}</p>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      <div className="nav-icons">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "icon active" : "icon"
          }
          title="Home"
        >
          <FaHome />
        </NavLink>


        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Theme"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "icon active" : "icon"
          }
          title="Wishlist"
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
          title="Cart"
        >
          <FaShoppingCart />

          {cart.length > 0 && (
            <span className="count">
              {cart.length}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "icon active" : "icon"
          }
          title="About"
        >
          <FaInfoCircle />
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "icon active" : "icon"
          }
          title="Contact"
        >
          <FaPhoneAlt />
        </NavLink>

        <NavLink
          to={user ? "/profile" : "/login"}
          className={({ isActive }) =>
            isActive ? "icon active" : "icon"
          }
          title={user ? "Profile" : "Login"}
        >
          <FaUser />
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;