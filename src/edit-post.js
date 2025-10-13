import React, { useState, useEffect } from "react";
import "./project.css";

function EditPost({ post, onEdit }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    imageFile: post?.imageFile || "",
    imageTitle: post?.imageTitle || "",
    imageCategory: post?.imageCategory || "",
    description: post?.description || "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        imageFile: post.imageFile,
        imageTitle: post.imageTitle,
        imageCategory: post.imageCategory,
        description: post.description,
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = new FormData();
      data.append("imageTitle", formData.imageTitle);
      data.append("imageCategory", formData.imageCategory);
      data.append("description", formData.description);

      // 👇 Only append new file if selected
      if (formData.imageFile instanceof File) {
        data.append("imageFile", formData.imageFile);
      }

      const res = await fetch(`http://localhost:5000/post/${post.id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) throw new Error("Server error: " + res.status);

      const result = await res.json();

      setSuccess("Post updated successfully!");

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
      if (onEdit) onEdit(result);
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

          <h2 className="form-title">Edit Post</h2>

          <div className="form-group">
            <label htmlFor="imageFile">Post Image</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  imageFile: e.target.files[0],
                }))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageTitle">Post Title</label>
            <textarea
              id="imageTitle"
              name="imageTitle"
              value={formData.imageTitle}
              onChange={handleChange}
              required
            />
          </div>

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
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Editing Post..." : "Edit Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
