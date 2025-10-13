import React, { useState } from "react";
import "./post.css";
import ManagePost from "./manage-post";

function Post({ onEdit }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    imageFile: "",
    imageTitle: "",
    imageCategory: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: files[0], // ✅ store file object
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = new FormData();
      data.append("imageFile", formData.imageFile); // ✅ image
      data.append("imageTitle", formData.imageTitle);
      data.append("imageCategory", formData.imageCategory);
      data.append("description", formData.description);

      const res = await fetch("http://localhost:5000/post", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Server error: " + res.status);

      const result = await res.json();

      setSuccess(result.message);

      setTimeout(() => {
        setFormData({
          imageFile: "",
          imageTitle: "",
          imageCategory: "",
          description: "",
        });
        setSuccess(null);
        setError(null);
      }, 4000);

      console.log("📂 Uploaded File Path:", result.filePath);
    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="tobeDisplayed-container">
        <h4>Manage Posts</h4>

        <div className="post-contents">
          <form onSubmit={handleForm} className="form">
            {/* Feedback messages */}
            {success && <p className="success-msg">{success}</p>}
            {error && <p className="error-msg">{error}</p>}
            <h3>Create a New Post</h3>

            {/* File Upload */}
            <div className="form-group">
              <label htmlFor="imageFile">Upload Image</label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>

            {/* Title */}
            <div className="form-group">
              <label htmlFor="imageTitle">Title</label>
              <input
                type="text"
                id="imageTitle"
                name="imageTitle"
                value={formData.imageTitle}
                onChange={handleChange}
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="imageCategory">Category</label>
              <select
                id="imageCategory"
                name="imageCategory"
                value={formData.imageCategory}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                <option value="gallery">Gallery</option>
                <option value="hero">Hero Section</option>
                <option value="aboutUs">About Us</option>
                <option value="partners">Partners</option>
                <option value="Team">Team</option>
              </select>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Write something about this post..."
              />
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Submit Post"}
            </button>
          </form>
        </div>
      </div>
      <ManagePost onEdit={onEdit} />
    </>
  );
}

export default Post;
