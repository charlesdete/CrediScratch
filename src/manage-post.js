import React, { useState, useEffect } from "react";
import "./project.css";
import DeleteImg from "./images/delete.png";
import EditImg from "./images/edit.png";

function ManagePost({ onEdit }) {
  const [posts, setPosts] = useState([]);

  const fetchPost = () => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const deletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/post/${id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // ✅ remove from UI without refresh
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  return (
    <div className="manage-container">
      <h4 className="manage-project-title">Manage Posts</h4>
      <div className="manage-project-contents">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={post.id} className="project-list">
              <div className="project-details">
                <h2 className="project-id">{index + 1}</h2>
                <h3 className="project-lead">{post.imageTitle}</h3>
                <h2 className="project-name">{post.imageCategory}</h2>
                <p className="project-description">{post.description}</p>
                <small className="project-start">
                  {new Date(post.created_at).toLocaleDateString()}
                </small>
                <button
                  className="deletebtn"
                  onClick={() => deletePost(post.id)}
                >
                  <img src={DeleteImg} alt="Delete" />
                </button>
                <button
                  className="editbtn"
                  onClick={() => onEdit(post)} // 👈 send post to parent
                >
                  <img src={EditImg} alt="Edit" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default ManagePost;
