import React from "react";
import "./section2.css";
import genderImg from "./images/gender.jpeg";
import govtImg from "./images/govt.jpg";
import healthImg from "./images/healthg.jpg";
import eduImg from "./images/edu.jpg";

function Section2() {
  return (
    <>
      <div className="section2">
        <div className="sec-img">
          <h5>Our Programmes</h5>
        </div>
      </div>

      <div className="section2b">
        <div className="Sec-card2">
          <div
            className="card2"
            style={{ backgroundColor: "rgb(184, 184, 244)" }}
          >
            <img src={genderImg} className="card2-img-top" alt="" />

            <div className="card2-body">
              <h5 className="card2-title">
                Gender equity and social inclusion programme
              </h5>
              <p className="card2-text">
                To enhance effective participation of minority, slum and
                marginalized communities’ (paying special attention to women,
                youth, children, people with disabilities and those living in
                under-serviced areas) to effectively transform gender based
                disparities and social exclusion.
              </p>
            </div>
          </div>
        </div>

        <div className="Sec-card2">
          <div
            className="card2"
            style={{ backgroundColor: "rgb(240, 193, 132)" }}
          >
            <img src={govtImg} className="card2-img-top" alt="" />

            <div className="card2-body">
              <h5 className="card2-title">
                Governance and development programme
              </h5>
              <p className="card2-text">
                To enhance effective Participation and Representation of
                minority, slum and marginalized communities in decision making
                and development processes at all relevant levels.
              </p>
            </div>
          </div>
        </div>

        <div className="Sec-card2">
          <div className="card2" style={{ backgroundColor: "#a4f3c2" }}>
            <img src={healthImg} className="card2-img-top" alt="" />
            <div className="card2-body">
              <h5 className="card2-title">Health and environment programme</h5>
              <p className="card2-text">
                Build capacity of minority, slum and marginalized communities in
                sharing of policies, good practices, research and action on
                environmental risks that have a direct impact on human health.
              </p>
            </div>
          </div>
        </div>

        <div className="Sec-card2">
          <div className="card2" style={{ backgroundColor: "#efefe5" }}>
            <img src={eduImg} className="card2-img-top" alt="" />
            <div className="card2-body">
              <h5 className="card2-title">
                Education and capacity building programme
              </h5>
              <p className="card2-text">
                To step up after school education by enhancing modern skills in
                minority, slum and marginalized communities on experimental
                learning, innovation and media literacy for students, educators
                and institutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section2;
