import React, { useState, useEffect } from "react";
import "./project.css";

function EditTeam({ team, onEdit }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    memberName: "",
    memberEmail: "",
    memberPosition: "",
    memberFile: null, // null = no change yet
  });

  useEffect(() => {
    if (team) {
      setFormData({
        memberName: team.memberName,
        memberEmail: team.memberEmail,
        memberPosition: team.memberPosition,
        memberFile: team.memberFile || null,
      });
    }
  }, [team]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "memberFile") {
      setFormData((prev) => ({
        ...prev,
        memberFile: files[0], // only store file object when new one selected
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = new FormData();
      data.append("memberName", formData.memberName);
      data.append("memberEmail", formData.memberEmail);
      data.append("memberPosition", formData.memberPosition);

      // 👇 append only if a new file was chosen
      if (formData.memberFile instanceof File) {
        data.append("memberFile", formData.memberFile);
      }

      const res = await fetch(`http://localhost:5000/team/${team.id}`, {
        method: "PUT",
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Server error");

      setSuccess(" Team member updated successfully!");
      if (onEdit) onEdit(result);

      setTimeout(() => {
        setSuccess(null);
      }, 4000);
    } catch (err) {
      setError(" " + err.message);
    } finally {
      setLoading(false);
    }
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

          <h2 className="form-title">Edit Team Member</h2>

          <div className="form-group">
            <label htmlFor="memberName">Member’s Name</label>
            <input
              type="text"
              id="memberName"
              name="memberName"
              value={formData.memberName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="memberEmail">Member’s Email</label>
            <input
              type="email"
              id="memberEmail"
              name="memberEmail"
              value={formData.memberEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="memberPosition">Member’s Position</label>
            <input
              type="text"
              id="memberPosition"
              name="memberPosition"
              value={formData.memberPosition}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="memberFile">Member’s Photo</label>
            <input
              type="file"
              id="memberFile"
              name="memberFile"
              accept="image/*"
              onChange={handleChange}
            />
            {typeof formData.memberFile === "string" && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={`http://localhost:5000${formData.memberFile}`}
                  alt="Current member"
                  width="100"
                  style={{ borderRadius: "8px" }}
                />
              </div>
            )}
          </div>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Editing team member..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTeam;
