import React, { useState, useEffect } from "react";
import "./gallery.css";

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [newSlide, setNewSlide] = useState([]);

  // Fetch partner posts from backend
  useEffect(() => {
    fetch("http://localhost:5000/posts/gallery")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // debug

        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item) => ({
            src: `http://localhost:5000${
              item.imageFile.startsWith("/")
                ? item.imageFile
                : "/" + item.imageFile
            }`,
            alt: item.imageTitle || "gallery image",
            description: item.description || "",
          }));
          setNewSlide(formatted);
        } else {
          setNewSlide([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setNewSlide([]);
      });
  }, []);

  const handleClick = (direction) => {
    if (newSlide.length === 0) return;

    let newIndex = activeIndex + (direction === "next" ? 1 : -1);
    if (newIndex < 0) newIndex = newSlide.length - 1;
    if (newIndex >= newSlide.length) newIndex = 0;
    setActiveIndex(newIndex);
  };

  return (
    <section className="gallery-section">
      <div className="gallery-contents">
        <div className="gallery-head">
          <h5 className="gallery-title">Our Gallery</h5>
          <p className="gallery-story">
            Our Gallery showcases the heart of CReDI’s work by capturing the
            people, places, and moments that define our mission. From vibrant
            community events to grassroots initiatives, the gallery reflects the
            resilience and creativity of the communities we serve. It’s more
            than just photos—it’s a story of inclusion, empowerment, and
            positive change in action.
          </p>
        </div>
        <div className="carousel" data-carousel>
          <button
            className="carousel-button prev"
            onClick={() => handleClick("prev")}
          >
            &#8656;
          </button>

          <ul data-slides>
            {newSlide.map((slide, index) => (
              <li
                key={index}
                className={`slide ${index === activeIndex ? "active" : ""}`}
              >
                <img src={slide.src} alt={slide.alt} className="slideImg" />
              </li>
            ))}
          </ul>
          <button
            className="carousel-button next"
            onClick={() => handleClick("next")}
          >
            &#8658;
          </button>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
