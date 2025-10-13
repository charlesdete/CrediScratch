import React, { useState, useEffect } from "react";
import "./volunteerDash.css";
import DeleteImg from "./images/delete.png";
import EditImg from "./images/edit.png";
import AddImg from "./images/add.png";
function VolunteerDash({ CloseThis }) {
  const [volunteers, setVolunteers] = useState([]);

  const fetchVolunteers = () => {
    fetch("http://localhost:5000/volunteer")
      .then((res) => res.json())
      .then((data) => setVolunteers(data))
      .catch((err) => console.error("Error fetching projects:", err));
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const deleteVolunteer = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/volunteer/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Row deleted successfully:", result);

      // ✅ update local state so UI updates without refresh
      setVolunteers((prevVolunteer) =>
        prevVolunteer.filter((v) => v.id !== id)
      );
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };
  return (
    <>
      <div className="tobeDisplayed-container">
        <h4>volunteers</h4>

        <div className="manage-container">
          <div className="manage-volunteer-header">
            <h4 className="manage-volunteer-title">Manage volunteer</h4>
            <button className="add-button">
              <img className="addIcon" src={AddImg} alt="" />
              Add volunteer
            </button>
          </div>
          <div className="manage-volunteer-contents">
            {volunteers.length > 0 ? (
              volunteers.map((volunteer, index) => (
                <div key={volunteer.id || index} className="volunteer-list">
                  <div className="volunteer-details">
                    <h2 className="volunteer-id">{volunteer.id}</h2>
                    <h3 className="volunteer-lead">{volunteer.full_name}</h3>
                    <h2 className="volunteer-type">{volunteer.email}</h2>
                    <p className="volunteer-phone-number">{volunteer.phone}</p>
                    <small className="volunteer-createdAt">
                      {new Date(volunteer.created_at).toLocaleDateString()}
                    </small>
                    <button
                      className="deletebtn"
                      onClick={() => deleteVolunteer(volunteer.id)}
                    >
                      <img src={DeleteImg} alt="Delete" />
                    </button>
                    <button className="editbtn">
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
export default VolunteerDash;
