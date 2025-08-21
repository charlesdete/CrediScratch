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
        <div className="Sec-card1">
          <div
            className="card"
            style={{ backgroundColor: "rgb(184, 184, 244)" }}
          >
            <img src={estImg} className="card-img-top" alt="" />

            <div className="card-body">
              <h5 className="card-title">History</h5>
              <p className="card-text">
                Centre for Resource and Development Inclusion (CReDI) was
                established in the year 2021.
              </p>
              <a href="#" className="btn btn-primary">
                Our History
              </a>
            </div>
          </div>
        </div>

        <div className="Sec-card1">
          <div
            className="card"
            style={{ backgroundColor: "rgb(240, 193, 132)" }}
          >
            <img src={visionImg} className="card-img-top" alt="" />

            <div className="card-body">
              <h5 className="card-title">Our Vision</h5>
              <p className="card-text">
                A just, equitable and informed society that cares for the
                environment
              </p>
              <a href="#" className="btn btn-primary">
                Our Vision
              </a>
            </div>
          </div>
        </div>

        <div className="Sec-card1">
          <div className="card" style={{ backgroundColor: "#a4f3c2" }}>
            <img src={valueImg} className="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title">Core Values</h5>
              <p className="card-text">
                The Organization’s core values include; equality and equity,
                good governance, integrity and reliability in all operations,
                gender mainstreaming, respect for diversity, human rights and
                dignity.
              </p>
              <a href="#" className="btn btn-primary">
                Core Values
              </a>
            </div>
          </div>
        </div>

        <div className="Sec-card1">
          <div className="card" style={{ backgroundColor: "#efefe5" }}>
            <img src={missionImg} className="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title">Our Mission</h5>
              <p className="card-text">
                We strengthen the capacity of minority, slum and marginalized
                communities to secure their economic, social, cultural and
                political rights in a healthy and sustainable environment.
              </p>
              <a href="#" className="btn btn-primary">
                Our Mission
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section1;
