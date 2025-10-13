import React, { useEffect, useState } from "react";
import "./about.css";

function AboutContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/posts/aboutUs") // 👈 get posts where category = about
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch About posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading About content...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="AboutContent">
      {posts.length === 0 ? (
        <p>No About content available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="AboutSubContent">
            <div className="AboutImage">
              <img
                src={`http://localhost:5000${post.imageFile}`} // serve uploaded image
                alt={post.imageTitle}
              />
            </div>
            <div className="content">
              <h5>LEARN MORE</h5>
              <h3>{post.description}</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AboutContent;
