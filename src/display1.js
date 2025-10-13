import React, { useState } from "react";
import "./dashboard.css";
import AddImg from "./images/add.png";
function Display1() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="display1-container">
      <div className="display1Title">
        <h4 className="">Team Collaboration</h4>
        <button className="add-button">
          <img className="addIcon" src={AddImg} alt="" />
          Add Member
        </button>
      </div>
      <div className="display1-contents">
        <div className="display1-content">
          <div className="teamWorkCount">1</div>
          <div className="team-member-details">
            <h3 className="team-member-name">Full names</h3>
            <h2 className="team-work">Working on...work...</h2>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="remember"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            {/* <label htmlFor="remember">Completed</label> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display1;
