import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

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
