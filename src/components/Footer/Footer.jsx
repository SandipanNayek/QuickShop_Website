import "./Footer.css";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

import qr from "../../assets/qr.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo & Subscribe */}

        <div className="footer-column">

          <h2 className="logo">QuickShop</h2>

          <h3>Subscribe</h3>

          <p>Get 10% off your first order</p>

          <div className="footer-input">

            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>
              <FaPaperPlane />
            </button>

          </div>

        </div>

        

        <div className="footer-column">

          <h3>Support</h3>

          <p>
            <FaMapMarkerAlt />
            <span>
              111 Bijoy Sarani,
              <br />
              India
            </span>
          </p>

          <p>
            <FaEnvelope />
            support@quickshop.com
          </p>

          <p>
            <FaPhoneAlt />
            +91 9876543210
          </p>

        </div>

        {/* Account */}

        <div className="footer-column">

          <h3>Account</h3>

          <a href="#">My Account</a>
          <a href="#">Login / Register</a>
          <a href="#">Cart</a>
          <a href="#">Wishlist</a>
          <a href="#">Shop</a>

        </div>

        {/* Quick Links */}

        <div className="footer-column">

          <h3>Quick Link</h3>

          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Categories</a>
          <a href="#">Contact</a>

        </div>

        {/* Download */}

        <div className="footer-column">

          <h3>Download App</h3>

          <p>Save $3 with App New User Only</p>

          <div className="download-section">

            <img
              src={qr}
              alt="QR Code"
              className="qr-code"
            />

            <div className="store-buttons">

              <div className="store-btn">

                <FaGooglePlay className="store-icon" />

                <div>
                  <span>GET IT ON</span>
                  <h4>Google Play</h4>
                </div>

              </div>

              <div className="store-btn">

                <FaApple className="store-icon" />

                <div>
                  <span>Download on the</span>
                  <h4>App Store</h4>
                </div>

              </div>

            </div>

          </div>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 QuickShop. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;