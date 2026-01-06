import React from "react";
import "./section1.css";
import visionImg from "./images/vision.png"; // adjust path based on file location
import missionImg from "./images/mission.png";
import valueImg from "./images/value.png";
import estImg from "./images/est.jpeg";
function Section1() {
  return (
    <>
      <div className="Section1">
        <div className="Section1-wrapper">
        
          <div
            className="card"
            style={{ backgroundColor: "#0c184b", color: "#fff" }}
          >
            <img src={estImg} className="card-img" alt="" />

            <div className="card-body">
              <h5 className="card-title" style={{ color: "#fff" }}>
                History
              </h5>
              <p className="card-text">
                Centre for Resource and Development Inclusion (CReDI) was
                established in the year 2021.
              </p>
            </div>
        
        </div>

      
          <div
            className="card"
            style={{ backgroundColor: "rgb(240, 128, 36)" }}
          >
            <div className="card-body">
              <h5 className="card-title" style={{ color: "#fff" }}>
                Our Vision
              </h5>
              <p className="card-text" style={{ color: "#fff" }}>
                A just, equitable and informed society that cares for the
                environment
              </p>
            </div>
            <img src={visionImg} className="card-img" alt="" />
          </div>
        

        
          <div
            className="card"
            style={{ backgroundColor: "rgb(111, 233, 134)" }}
          >
            <img src={valueImg} className="card-img" alt="" />
            <div className="card-body">
              <h5 className="card-title">Core Values</h5>
              <p className="card-text" style={{ paddingLeft: "20px" }}>
                The Organization’s core values include; equality and equity,
                good governance, integrity and reliability in all operations,
                gender mainstreaming, respect for diversity, human rights and
                dignity.
              </p>
            </div>
          </div>
        

        
          <div className="card" style={{ backgroundColor: "#ecec38ff" }}>
            <div className="card-body">
              <h5 className="card-title">Our Mission</h5>
              <p className="card-text">
                We strengthen the capacity of minority, slum and marginalized
                communities to secure their economic, social, cultural and
                political rights in a healthy and sustainable environment.
              </p>
            </div>
            <img src={missionImg} className="card-img" alt="" />
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Section1;
