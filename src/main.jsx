import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import {AuthProvider} from "./context/AuthContext";

import App from "./App";
import "./index.css";

import { WishlistProvider } from "./context/WishlistContext";

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
          <Toaster position="top-right" richColors />
        </CartProvider>
      </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  
);