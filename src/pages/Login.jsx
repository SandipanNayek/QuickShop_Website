import "../styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const navigate = useNavigate();
  const { login , googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      toast.success("Login Successful");
      navigate("/");
    } else {
      toast.error("Invalid Email or Password");
    }
  };
  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const googleUser = {
      name: result.user.displayName,
      email: result.user.email,
      phone: result.user.phoneNumber || "",
      address: "",
      profileImage: result.user.photoURL || "",
    };

    
    googleLogin(googleUser);

    toast.success("Google Login Successful 🎉");

    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error("Google Login Failed");
  }
};

  return (
    <section className="auth">

      <div className="auth-box">

        <h1>Welcome Back</h1>

        <p>Login to continue shopping</p>

        <form onSubmit={handleSubmit}>

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

          <button type="submit">
            Login
          </button>

          <div className="divider">
          <span>OR</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={22} />
          Continue with Google
        </button>

        </form>

        <p className="switch">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>

      </div>

    </section>
  );
}

export default Login;