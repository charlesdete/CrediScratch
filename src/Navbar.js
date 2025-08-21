import React from "react";
import "./navbar.css";
import CredImg from "./images/credilogo.png";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={CredImg} alt="" />
          <h1>Centre for Resource and Development Inclusion </h1>
        </div>
        <div className="links">
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Our Programs</a>
            </li>
            <li>
              <a href="">Our Community</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
