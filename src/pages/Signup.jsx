import "../styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

     const result = signup({
        id: Date.now(),
        name,
        phone,
        email,
        password,
        });

        if (!result.success) {
        toast.error(result.message);
        return;
        }

        toast.success("Account Created Successfully 🎉");
        navigate("/");
  };

  return (
    <section className="auth">

      <div className="auth-box">

        <h1>Create Account</h1>

        <p>Create your QuickShop account</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="switch">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </section>
  );
}

export default Signup;