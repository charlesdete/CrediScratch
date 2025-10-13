import React, { useState, useEffect } from "react";
import "./dashboard.css";

function DisplayBoard() {
  const [posts, setPosts] = useState([]);
  const [teams, setTeams] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchPost = () => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts", err));
  };

  const fetchTeam = () => {
    fetch("http://localhost:5000/team")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Error fetching team", err));
  };

  const fetchVolunteer = () => {
    fetch("http://localhost:5000/volunteer")
      .then((res) => res.json())
      .then((data) => setVolunteers(data))
      .catch((err) => console.error("Error fetching volunteers", err));
  };

  const fetchProject = () => {
    fetch("http://localhost:5000/project")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects", err));
  };

  useEffect(() => {
    fetchProject();
    fetchPost();
    fetchTeam();
    fetchVolunteer();
  }, []);

  return (
    <>
      <div className="display-content">
        <div className="display-title">
          <h3>Quick Access</h3>
        </div>
        <div className="display-cards">
          <div
            className="displayCard"
            style={{ background: "rgb(25, 95, 225)" }}
          >
            <div className="displayCard-content">
              <h4 className="figures">{posts.length}</h4>
              <h2 className="figuresTitle">Posts</h2>
            </div>
          </div>
          <div className="displayCard" style={{ backgroundColor: "darkgreen" }}>
            <div className="displayCard-content">
              <h4 className="figures">{teams.length}</h4>
              <h2 className="figuresTitle">Team</h2>
            </div>
          </div>
          <div
            className="displayCard"
            style={{ backgroundColor: "darkorange" }}
          >
            <div className="displayCard-content">
              <h4 className="figures">{volunteers.length}</h4>
              <h2 className="figuresTitle">Volunteers</h2>
            </div>
          </div>
          <div
            className="displayCard"
            style={{ backgroundColor: "darkorchid" }}
          >
            <div className="displayCard-content">
              <h4 className="figures">{projects.length}</h4>
              <h2 className="figuresTitle">Projects</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayBoard;
