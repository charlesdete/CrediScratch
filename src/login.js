import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";
import "./login.css";
import CryptoJS from "crypto-js";

function SignIn({ closeModal }) {
  const navigate = useNavigate();  

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errData = await response.json();
      setError(errData.error || "Invalid login credentials!");
      return;
    }

    const data = await response.json();

    const SECRET_KEY = "my-secret-key";

    const encrypted = CryptoJS.AES.encrypt(
  JSON.stringify(data.user),   // 👈 ONLY user object
  SECRET_KEY
).toString();


    localStorage.setItem("user", encrypted);

    if (closeModal) closeModal();

    navigate("/dashboard", { replace: true });
    setSuccess("User logged in");
  } catch (err) {
    setError("Server error, try again!");
  } finally {
    setLoading(false);
  }
};


  return (
  <div className="signin-modal" onClick={closeModal}>
      <div
        className="login-content"
        onClick={(e) => e.stopPropagation()} // prevent modal close on clicking inside the modal
      >
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
      <h5>Sign In</h5>
      {success && <p className="success-msg">{success}</p>}
      {error && <p className="error-msg">{error}</p>}
      <form className="signin-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember">Remember Me</label>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  </div>



);


}

export default SignIn;