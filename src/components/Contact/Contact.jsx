import "./Contact.css";
import { useState } from "react";
import { toast } from "sonner";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        // For deployment use:
        // "https://quickshop-pcbs.onrender.com/api/contact"
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("✅ Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to send message.");
    }

    setLoading(false);
  };

  return (
    <section className="contact">
      <div className="contact-title">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Feel free to contact us anytime.</p>
      </div>

      <div className="contact-container">
        <div className="contact-form">
          <h2>Send Message</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="info">
            <h3>📍 Address</h3>
            <p>
              QuickShop Store
              <br />
              Kolkata, West Bengal
              <br />
              India
            </p>
          </div>

          <div className="info">
            <h3>📞 Phone</h3>
            <p>+91 9876543210</p>
          </div>

          <div className="info">
            <h3>✉ Email</h3>
            <p>support@quickshop.com</p>
          </div>

          <div className="info">
            <h3>🕒 Working Hours</h3>
            <p>Monday - Saturday</p>
            <p>9:00 AM - 8:00 PM</p>
          </div>
        </div>
      </div>

      <div className="map">
        <iframe
          title="QuickShop Location"
          src="https://www.google.com/maps?q=Kolkata&output=embed"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export default Contact;