import React, { useState } from "react";
import "./login.css";

function SignIn({ closeModal }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST", // no extra space!
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user)); // includes role now
        window.location.href = "/dashboard";
      } else {
        const errData = await response.json();
        setError(errData.error || "Invalid login credentials!");
      }
    } catch (error) {
      setError("Server error, try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signin-modal">
        <div className="login-content">
          <button className="close-modal" onClick={closeModal}>
            CLOSE
          </button>
          <h5>Sign In</h5>
          {success && <p className="success-msg">{success}</p>}
          {error && <p className="error-msg">{error}</p>}
          <form className="signin-form" onSubmit={handleLogin}>
            <div className="form-details">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  name="remember"
                  onChange={(e) => setRemember(1)}
                />
                <label htmlFor="remember">Remember Me</label>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Signing In User" : "Sign In User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default SignIn;
