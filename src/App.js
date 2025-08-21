import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./section3";
import Section4 from "./section4";
import Footer from "./footer";
function App() {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h5 className="heroH5">
          CReDI strengthens the capacity of minority, slum and marginalized
          communities in Kenya to secure their economic, social, cultural and
          political rights in a healthy and sustainable environment.
        </h5>

        <div className="buttons">
          <button className="Button1">Learn more about us</button>
          <button className="Button2">Explore our programs</button>
        </div>
      </div>

      <Section1 />
      <br />
      <Section2 />
      <br />
      <Section3 />
      <Section4 />
      <Footer />
    </>
  );
}

export default App;
