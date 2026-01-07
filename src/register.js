import React, { useState } from "react";
import "./login.css";

function Signup({ closeModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          password, // send plain password → let server hash it
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || "User created successfully!");
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setconPassword("");
      } else {
        const errData = await response.json();
        setError(errData.error || "There was an error creating the user!");
      }
    } catch (error) {
      setError("Server error, try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup" onClick={closeModal}>
        <div className="signup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={closeModal}>
            CLOSE
          </button>
          <h5>Sign Up</h5>
          {success && <p className="success-msg">{success}</p>}
          {error && <p className="error-msg">{error}</p>}
          <form className="signup-form" onSubmit={handleRegister}>
            <div className="form-details">
              <label htmlFor="email">Full Names</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Phone Number</label>
              <input
                type="int"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
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
              <label htmlFor="password">Confirm Password </label>
              <input
                type="password"
                id="password"
                value={confirmPassword}
                onChange={(e) => setconPassword(e.target.value)}
              />

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Signing Up..." : "SignUp New User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signup;
