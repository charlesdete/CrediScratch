import React, { useState, useEffect } from "react";
import "./project.css";
import DeleteImg from "./images/delete.png";
import EditImg from "./images/edit.png";

function ManageTeam({ onEdit }) {
  const [teams, setTeams] = useState([]);

  const fetchTeam = () => {
    fetch("http://localhost:5000/team")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Error fetching projects:", err));
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const deleteTeam = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/team/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Row deleted successfully:", result);

      // ✅ update local state so UI updates without refresh
      setTeams((prevTeams) => prevTeams.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  return (
    <div className="manage-container">
      <h4 className="manage-project-title">Manage Team</h4>
      <div className="manage-project-contents">
        {teams.length > 0 ? (
          teams.map((team, index) => (
            <div key={team.id || index} className="project-list">
              <div className="project-details">
                <h2 className="project-id">{index + 1}</h2>
                <h3 className="project-lead">{team.memberName}</h3>
                <h2 className="project-name">{team.memberEmail}</h2>
                <p className="project-description">{team.memberPosition}</p>
                <small className="project-start">
                  {new Date(team.created_at).toLocaleDateString()}
                </small>
                <button
                  className="deletebtn"
                  onClick={() => deleteTeam(team.id)}
                >
                  <img src={DeleteImg} alt="Delete" />
                </button>
                <button
                  className="editbtn"
                  onClick={() => onEdit && onEdit(team)}
                >
                  <img src={EditImg} alt="Edit" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No team member available</p>
        )}
      </div>
    </div>
  );
}

export default ManageTeam;
