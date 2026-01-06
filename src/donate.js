import React, { useState } from "react";
import "./donate.css";

function Donation({ closeModal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          amount,
          donationType,
          purpose,
          paymentMethod,
          message,
        }),
      });

      // simulate a 1.5s wait so user sees "Processing..."
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response.ok) {
        setSuccess(" Donation submitted successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setAmount("");
        setDonationType("");
        setPurpose("");
        setPaymentMethod("");
        setMessage("");

        // Delay closing so user sees the message
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        setError(" Failed to submit donation. Try again.");
      }
    } catch (err) {
      setError(" Server error. Please try later.");
    }

    setLoading(false);
  };

  return (
    <div className="modal">
     
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          CLOSE
        </button>

        <h2>Donation Form</h2>

        <form className="donation-form" onSubmit={handleSubmit}>
          <div className="form-details">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254 700 000 000"
            />

            <label htmlFor="amount">Donation Amount (KES) *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              placeholder="1000"
              required
            />

            <label htmlFor="donationType">Donation Type *</label>
            <select
              id="donationType"
              name="donationType"
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
              required
            >
              <option value="">Select donation type</option>
              <option value="one-time">One-time Donation</option>
              <option value="monthly">Monthly Donation</option>
            </select>

            <label htmlFor="purpose">Donation Purpose *</label>
            <select
              id="purpose"
              name="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            >
              <option value="">Select purpose</option>
              <option value="general">General Support</option>
              <option value="education">Education Programs</option>
              <option value="governance">Governance & Leadership</option>
              <option value="environment">Environmental Protection</option>
              <option value="gender-equity">Gender Equity</option>
            </select>

            <label htmlFor="paymentMethod">Payment Method *</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select payment method</option>
              <option value="mpesa">M-Pesa</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="card">Credit/Debit Card</option>
            </select>

            <label htmlFor="message">Additional Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any special instructions or message..."
              rows="3"
            ></textarea>

            <div className="info-box">
              <h3>What happens next?</h3>
              <ul>
                <li>• We'll send you payment instructions via email</li>
                <li>• You'll receive a donation receipt for tax purposes</li>
                <li>• Updates on how your donation is making an impact</li>
              </ul>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Processing..." : "Submit Donation"}
            </button>

            {success && <p className="success-msg">{success}</p>}
            {error && <p className="error-msg">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Donation;
