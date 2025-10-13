import React, { useState, useEffect } from "react";
import "./partners.css"; // make sure your css file exists

export default function Partners() {
  const [partnerCards, setPartnerCards] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch partner posts from backend
  useEffect(() => {
    fetch("http://localhost:5000/posts/partners")
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
            alt: item.imageTitle || "Partner image",
            description: item.description || "",
          }));
          setPartnerCards(formatted);
        } else {
          setPartnerCards([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setPartnerCards([]);
      });
  }, []);

  // Carousel handlers
  const handlePartner = (direction) => {
    if (partnerCards.length === 0) return;
    if (direction === "next") {
      setActiveIndex((prev) => (prev + 1) % partnerCards.length);
    } else if (direction === "prev") {
      setActiveIndex(
        (prev) => (prev - 1 + partnerCards.length) % partnerCards.length
      );
    }
  };

  // Visible cards (up to 3 at once)
  const visibleCards =
    partnerCards.length > 0
      ? [
          partnerCards[activeIndex],
          partnerCards[(activeIndex + 1) % partnerCards.length],
          partnerCards[(activeIndex + 2) % partnerCards.length],
        ]
      : [];

  return (
    <div className="partner-container">
      <div className="partner-content">
        <div className="partners-title">
          <h5 className="partnersName">Our Partners</h5>
        </div>

        <div className="main-container">
          {/* Prev button */}
          <button
            className="carousel-button prev"
            onClick={() => handlePartner("prev")}
          >
            &#8592;
          </button>

          {/* Cards */}
          <div className="cardy">
            {visibleCards.length > 0 ? (
              visibleCards.map((cardi, index) => (
                <div key={index} className="PartnerCard">
                  <img src={cardi.src} alt={cardi.alt} />
                </div>
              ))
            ) : (
              <p>No partner images found.</p>
            )}
          </div>

          {/* Next button */}
          <button
            className="carousel-button next"
            onClick={() => handlePartner("next")}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}
