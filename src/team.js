import React from "react";
import "./team.css";
import TeamMember from "./team-members";
function Team() {
  return (
    <>
      <div className="Team-container">
        <div className="Team-content">
          <div className="Team-title">
            <h5 className="h5Title">Our Team</h5>
          </div>
        </div>
        <TeamMember />
      </div>
    </>
  );
}
export default Team;
