import React, { useState } from "react";
import "./volunteer.css";

function Volunteer({ closeModal }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here (API call, etc.)
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          skills,
          availability,
          message,
        }),
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || "Volunteer added successfully!");
        setFullName("");
        setEmail("");
        setPhone("");
        setSkills("");
        setAvailability("");
        setMessage("");

        // Delay closing so user sees the message
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        const errData = await response.json();
        setError(errData.error || "There was an error adding the volunteer!");
      }
    } catch (error) {
      setError(" Server error. Please try later.");
    }

    setLoading(false);
    // Close modal after submission if you want
  };

  return (
    <div className="modal">
      
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          CLOSE
        </button>

        <h2>Volunteer Form</h2>

        <form className="volunteer-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+254 700 000 000"
          />

          <label htmlFor="skills">Skills</label>
          <textarea
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="List your relevant skills..."
            rows="3"
          ></textarea>

          <label htmlFor="availability">Availability</label>
          <select
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            required
          >
            <option value="">Select availability</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>

          <label htmlFor="message">Message (Optional)</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us why you want to volunteer..."
            rows="3"
          ></textarea>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Volunteer Form"}
          </button>

          {success && <p className="success-msg">{success}</p>}
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Volunteer;
