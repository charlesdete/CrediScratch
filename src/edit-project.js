import React, { useState, useEffect } from "react";
import "./project.css";

function EditProject({ project, onEdit }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    projectName: project?.projectName || "",
    projectDetails: project?.projectDetails || "",
    startDate: project?.startDate || "",
    leadMember: project?.leadMember || "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        projectName: project.projectName,
        projectDetails: project.projectDetails,
        startDate: project.startDate,
        leadMember: project.leadMember,
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    fetch(`http://localhost:5000/project/${project.id}`, {
      method: "PUT", //  update instead of POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccess("Project updated successfully!");
        if (onEdit) onEdit(data); //  inform parent
      })
      .catch((err) => setError("Error: " + err.message))
      .finally(() => setLoading(false));
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

          <h2 className="form-title">Edit Project</h2>

          <div className="form-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectDetails">Project Details</label>
            <textarea
              id="projectDetails"
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="leadMember">Lead Member</label>
            <input
              type="text"
              id="leadMember"
              name="leadMember"
              value={formData.leadMember}
              onChange={handleChange}
              required
            />
          </div>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Editing Project..." : "Edit Project"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProject;
