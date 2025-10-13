import React, { useState } from "react";
import ManageTeam from "./manage-team";

function TeamMember({ onEdit }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    memberName: "",
    memberEmail: "",
    memberPosition: "",
    memberFile: null, // store File object, not string
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // if this is a file input
    if (name === "memberFile") {
      setFormData((prevData) => ({
        ...prevData,
        memberFile: files[0], // store actual file
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    //  Use FormData for file upload
    const data = new FormData();
    data.append("memberName", formData.memberName);
    data.append("memberEmail", formData.memberEmail);
    data.append("memberPosition", formData.memberPosition);
    data.append("memberFile", formData.memberFile);

    try {
      const response = await fetch("http://localhost:5000/team", {
        method: "POST",
        body: data, // no Content-Type header — FormData sets it automatically
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Server error");
      }

      setSuccess("✅ New team member submitted successfully!");
      console.log("Server Response:", result);

      setTimeout(() => {
        setFormData({
          memberName: "",
          memberEmail: "",
          memberPosition: "",
          memberFile: null,
        });
        setSuccess(null);
        setError(null);
      }, 4000);
    } catch (err) {
      setError("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2>New Team Member</h2>
      </div>

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

            <h2 className="form-title">Add a new team member</h2>

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
              <label htmlFor="memberEmail">Member Email</label>
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
                required
              />
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Adding new team member..." : "Add a new team member"}
            </button>
          </form>
        </div>
      </div>
      <ManageTeam onEdit={onEdit} />
    </>
  );
}

export default TeamMember;
