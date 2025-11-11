import React, { useState, useEffect } from "react";
import "./dashboard.css";

function Display1() {
  const [checked, setChecked] = useState(false);
  const [teams, setTeams] = useState({});
  const [projects, setProjects] = useState([]);

  const fetchTeamMembers = () => {
    fetch("http://localhost:5000/team")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Error fetching team members"));
  };

  const fetchProjects = () => {
    fetch("http://localhost:5000/project")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  };
  useEffect(() => {
    fetchTeamMembers();
    fetchProjects();
  }, []);

  return (
    <>
      <div className="display1Wrapper">
        <div className="display1-container">
          <div className="display1Title">
            <h4 className="">Project Collaboration</h4>
          </div>
          <div className="display1-contents">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div className="display1-content">
                  <div className="teamWorkCount">{index + 1}</div>
                  <div className="team-member-details">
                    <h3 className="team-member-name">{project.projectName}</h3>
                    <h2 className="team-work">{project.projectDetails}</h2>
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
              ))
            ) : (
              <p>No project member available</p>
            )}
          </div>
        </div>

        <div className="display1-container">
          <div className="display1Title">
            <h4 className="">Team Members</h4>
          </div>
          <div className="display1-contents">
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <div className="display1-content">
                  <div className="teamWorkCount">{index + 1}</div>

                  <h3 className="team-member-name">{team.memberName}</h3>
                  <h2 className="team-work">{team.memberEmail}</h2>

                  {/* <label htmlFor="remember">Completed</label> */}
                </div>
              ))
            ) : (
              <p>No team member available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Display1;
