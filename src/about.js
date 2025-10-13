import React from "react";
import "./about.css";
import AboutContent from "./aboutContent";
function About() {
  return (
    <>
      <div className="AboutContainer">
        <div className="AboutTitle">
          <h5 className="AboutH5"> About Us</h5>
        </div>
      </div>
      <AboutContent />
    </>
  );
}
export default About;
