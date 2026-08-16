import "../styles/Profile.css";
import {
  FaUserCircle,
  FaHeart,
  FaShoppingCart,
  FaBoxOpen,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { toast } from "sonner";

function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "Kolkata, India",
        profileImage: user.profileImage || "",
      });

      setPreviewImage(user.profileImage || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);

      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const result = updateProfile(formData);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Profile updated successfully 🎉");
  };

  return (
    <section className="profile">

      <div className="profile-header">
        <h1>My Account</h1>
        <p>Manage your account information</p>
      </div>

      <div className="profile-container">

        {/* Sidebar */}

        <div className="profile-sidebar">

          <div className="profile-image-wrapper">

            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="profile-avatar-img"
              />
            ) : (
              <FaUserCircle className="profile-avatar" />
            )}

            <label className="upload-btn">
              Change Photo

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>

          </div>

          <h2>{formData.name}</h2>

          <p>{formData.email}</p>

          <button>Edit Profile</button>

          <div className="profile-menu">

            <Link to="/wishlist">
              <FaHeart />
              Wishlist
            </Link>

            <Link to="/cart">
              <FaShoppingCart />
              Cart
            </Link>

            <Link to="/orders">
              <FaBoxOpen />
              My Orders
            </Link>

            <Link to="/settings">
              <FaCog />
              Settings
            </Link>

            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>

        </div>

        

        <div className="profile-content">

          <h2>Personal Information</h2>

          <div className="profile-form">

            <div className="input-box">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <label>Email</label>

              <input
                type="email"
                value={formData.email}
                readOnly
              />
            </div>

            <div className="input-box">
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <label>Address</label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

      </div>

      

      <div className="orders">

        <h2>Recent Orders</h2>

        <table>

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>#1001</td>
              <td className="delivered">Delivered</td>
              <td>$299</td>
            </tr>

            <tr>
              <td>#1002</td>
              <td className="shipped">Shipped</td>
              <td>$899</td>
            </tr>

            <tr>
              <td>#1003</td>
              <td className="processing">Processing</td>
              <td>$149</td>
            </tr>

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default Profile;