import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import AIChat from "./components/AIChat/AIChat";

import { useState } from "react";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Routes>

        <Route
          path="/"
          element={<Home searchTerm={searchTerm} />}
        />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/success" element={<OrderSuccess />} />

        <Route path='/orders' element={<Orders/>}/>

        <Route
        path="/product/:id"
        element={<ProductDetails />}
       />

      </Routes>
      <AIChat />
    </>
  );
}

export default App;