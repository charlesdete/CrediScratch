import React, { useState } from "react";
import "./section3.css";
import contactImg from "./images/Contact.png";

function Section3() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }), // ✅ matches backend
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || "Message successfully sent!");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        const errData = await response.json();
        setError(errData.error || "There was an error adding the message!");
      }
    } catch (error) {
      setError("Server error. Please try later.");
    } finally {
      setLoading(false); // ✅ fix: stop loading after request
    }
  };


  return (
    <>
      <div className="section3">
        <div className="sec3-img">
          <img src={contactImg} alt="" />
        </div>

        <form className="sec3-form" onSubmit={handleSubmit}>
          {success && <p className="success-msg">{success}</p>}
          {error && <p className="error-msg">{error}</p>}
          <div className="form-details">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Sending message..." : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Section3;
