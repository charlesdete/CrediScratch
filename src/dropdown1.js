import React from "react";
import { Link as ScrollLink } from "react-scroll"; // for scrolling to sections

function Dropdown1() {
  return (
    <div className="flex flex-col dropdownProfile">
      <ul className="flex flex-col gap-4 droplist">
        <li>
          <ScrollLink to="section2" smooth={true} duration={500}>
            Our Programs
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="gallery" smooth={true} duration={500}>
            Our Gallery
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="section3" smooth={true} duration={500}>
            Contact Us
          </ScrollLink>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown1;
