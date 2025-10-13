import React, { useState, useEffect } from "react";
import "./project.css";
import DeleteImg from "./images/delete.png";
import EditImg from "./images/edit.png";

function ManageProject({ onEdit }) {
  const [projects, setProjects] = useState([]);

  const fetchProjects = () => {
    fetch("http://localhost:5000/project")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/project/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Row deleted successfully:", result);

      // ✅ update local state so UI updates without refresh
      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  return (
    <div className="manage-container">
      <h4 className="manage-project-title">Manage Project</h4>
      <div className="manage-project-contents">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={project.id || index} className="project-list">
              <div className="project-details">
                <h2 className="project-id">{index + 1}</h2>
                <h3 className="project-lead">{project.leadMember}</h3>
                <h2 className="project-name">{project.projectName}</h2>
                <p className="project-description">{project.projectDetails}</p>
                <small className="project-start">
                  {new Date(project.startDate).toLocaleDateString()}
                </small>
                <button
                  className="deletebtn"
                  onClick={() => deleteProject(project.id)}
                >
                  <img src={DeleteImg} alt="Delete" />
                </button>
                <button
                  className="editbtn"
                  onClick={() => onEdit && onEdit(project)}
                >
                  <img src={EditImg} alt="Edit" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
    </div>
  );
}

export default ManageProject;
