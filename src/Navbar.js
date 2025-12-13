import React from "react";
import "./navbar.css";
import CredImg from "./images/credilogo.png";

import { Link as RouterLink, useNavigate } from "react-router"; // router link
import Dropdown from "./dropdown";
import Dropdown1 from "./dropdown1";

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear saved user
    navigate("/"); // redirect home
  };
  return (
    <div className="navbar">
      <div className="navbar-contents">
        <div className="logo">
          <img src={CredImg} alt="CReDI logo" />
          <h1>Centre for Resource and Development Inclusion</h1>
        </div>

        <div className="links">
          <ul>
            {/* Home goes to actual route (React Router) */}
            <li>
              <RouterLink to="/">Home</RouterLink>
              <Dropdown1 />
            </li>

            {/* Organisation dropdown toggle */}
            <li>
              <RouterLink to="/">Our Organisation</RouterLink>
              <Dropdown />
            </li>
            {isLoggedIn && (
              <li onClick={handleLogout}>
                <RouterLink to="/">Logout</RouterLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
