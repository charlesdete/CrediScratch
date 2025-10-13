import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Team from "./team";
import About from "./about";

function Dropdown() {
  return (
    <>
      <div className="flex flex-col dropdownProfile">
        <ul className="flex flex-col gap-4 droplist">
          <li>
            <Link to="/team" duration={500}>
              Our Team
            </Link>
          </li>
          <li>
            <Link to="/about" duration={500}>
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Dropdown;
