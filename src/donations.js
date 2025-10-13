import React, { useState, useEffect } from "react";
import "./donations.css";
import DeleteImg from "./images/delete.png";
import EditImg from "./images/edit.png";
import AddImg from "./images/add.png";
function DonationsDash({ onEdit }) {
  const [donations, setDonations] = useState([]);

  const fetchDonations = () => {
    fetch("http://localhost:5000/donations")
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => console.error("Error fetching projects:", err));
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const deleteDonation = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/donations/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Row deleted successfully:", result);

      // ✅ update local state so UI updates without refresh
      setDonations((prevDonation) => prevDonation.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };
  return (
    <>
      <div className="tobeDisplayed-container">
        <h4>Donations</h4>

        <div className="manage-container">
          <div className="manage-donation-header">
            <h4 className="manage-donation-title">Manage Donation</h4>
          </div>
          <div className="manage-donation-contents">
            {donations.length > 0 ? (
              donations.map((donation, index) => (
                <div key={donation.id || index} className="Donation-list">
                  <div className="Donation-details">
                    <h2 className="Donation-id">{donation.id}</h2>
                    <h3 className="Donation-name">{donation.name}</h3>
                    <h2 className="Donation-type">{donation.donation_type}</h2>
                    <p className="Donation-phone-number">{donation.phone}</p>
                    <small className="Donation-createdAt">
                      {new Date(donation.created_at).toLocaleDateString()}
                    </small>
                    <button
                      className="deletebtn"
                      onClick={() => deleteDonation(donation.id)}
                    >
                      <img src={DeleteImg} alt="Delete" />
                    </button>
                    <button
                      className="editbtn"
                      onClick={() => onEdit(donation)}
                    >
                      <img src={EditImg} alt="Edit" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No donations available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default DonationsDash;
