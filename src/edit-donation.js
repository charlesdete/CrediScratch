import React, { useState, useEffect } from "react";
import "./donate.css";

function EditDonation({ donation, onEdit }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: donation?.name || "",
    email: donation?.email || "",
    phone: donation?.phone || "",
    amount: donation?.amount || "",
    donationType: donation?.donationType || "",
    purpose: donation?.purpose || "",
    paymentMethod: donation?.paymentMethod || "",
    message: donation?.message || "",
  });

  useEffect(() => {
    if (donation) {
      setFormData({
        name: donation.name,
        email: donation.email,
        phone: donation.phone,
        amount: donation.amount,
        donationType: donation.donationType,
        purpose: donation.purpose,
        paymentMethod: donation.paymentMethod,
        message: donation.message,
      });
    }
  }, [donation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("amount", formData.amount);
      data.append("donationType", formData.donationType);
      data.append("purpose", formData.purpose);
      data.append("paymentMethod", formData.paymentMethod);
      data.append("message", formData.message);

      const res = await fetch(
        `http://localhost:5000/donations/${donation.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Server error: " + res.status);

      const result = await res.json();

      setSuccess("Donation updated successfully!");

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          amount: "",
          donationType: "",
          purpose: "",
          paymentMethod: "",
          message: "",
        });
        setSuccess(null);
        setError(null);
      }, 5000);
      if (onEdit) onEdit(result);
    } catch (err) {
      setError(" " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tobedisplayed">
      <div className="project-container">
        <form className="project-form" onSubmit={handleSubmit}>
          {success && (
            <p
              className="success-msg"
              style={{ background: "#a0dda3", color: "green" }}
            >
              {success}
            </p>
          )}
          {error && (
            <p
              className="error-msg"
              style={{ background: "#eb8d99", color: "red" }}
            >
              {error}
            </p>
          )}
          <h2 className="form-title">Edit Donation</h2>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Donation Amount (KES) *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
              placeholder="1000"
            />
          </div>
          <div className="form-group">
            <label htmlFor="donationType">Donation Type *</label>
            <select
              id="donationType"
              name="donationType"
              value={formData.donationType}
              onChange={handleChange}
              required
            >
              <option value="">Select donation type</option>
              <option value="one-time">One-time Donation</option>
              <option value="monthly">Monthly Donation</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="purpose">Donation Purpose *</label>
            <select
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            >
              <option value="">Select purpose</option>
              <option value="general">General Support</option>
              <option value="education">Education Programs</option>
              <option value="governance">Governance & Leadership</option>
              <option value="environment">Environmental Protection</option>
              <option value="gender-equity">Gender Equity</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method *</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select payment method</option>
              <option value="mpesa">M-Pesa</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="card">Credit/Debit Card</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Additional Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Any special instructions or message..."
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <div className="info-box">
              <h3>What happens next?</h3>
              <ul>
                <li>• We'll send you payment instructions via email</li>
                <li>• You'll receive a donation receipt for tax purposes</li>
                <li>• Updates on how your donation is making an impact</li>
              </ul>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Editting Donation..." : "Edit Donation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDonation;
