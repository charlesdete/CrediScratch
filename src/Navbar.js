import React from "react";
import "./navbar.css";
import CredImg from "./images/credilogo.png";

import { Link as RouterLink} from "react-router-dom";
import Dropdown from "./dropdown";
import Dropdown1 from "./dropdown1";

function Navbar() {


 

  return (
    <div className="navbar">
      <div className="navbar-contents">
        <div className="logo">
          <img src={CredImg} alt="CReDI logo" />
          <h1>Centre for Resource and Development Inclusion</h1>
        </div>

        <div className="links">
          <ul>
            <li>
              <RouterLink to="/">Home</RouterLink>
              <Dropdown1 />
            </li>

            <li>
              <RouterLink to="/">Our Organisation</RouterLink>
              <Dropdown />
            </li>

            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
