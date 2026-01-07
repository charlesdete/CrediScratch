import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./dashboard.css";
import SearchImg from "./images/Search.jpeg";
import DonateImg from "./images/donate.jpg";
import ReportImg from "./images/report.jpg";
import VoluntImg from "./images/volunteer.jpg";
import AnalyticsImg from "./images/analytics.png";
import ProjectImg from "./images/project.png";
import MenuImg from "./images/menu.png";

import DisplayBoard from "./display";
import Display1 from "./display1";
import Project from "./project";
import Post from "./post";
import TeamMember from "./add-team-member";
import Donations from "./donations";
import VolunteerDash from "./volunteerDash";
import Analytics from "./analytics";
import EditProject from "./edit-project";
import EditPost from "./edit-post";
import EditDonation from "./edit-donation";
import EditTeam from "./edit-team";
import { handleLogout } from "./logout";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeThis, setActiveThis] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

//  decrypt the user data in the localstorage 
const encryptedUser = localStorage.getItem("user");
const SECRET_KEY = "my-secret-key";


let user = null;

if (encryptedUser) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    user = JSON.parse(decrypted);
  } catch (err) {
    console.error("Failed to decrypt user", err);
    localStorage.removeItem("user");
  }
}

  const handleEditProject = (project) => {
    setSelectedProject(project); // save project being edited
    setActiveThis("edit-project"); // switch to edit page
  };

  const handleEditPost = (post) => {
    setSelectedPost(post); // save project being edited
    setActiveThis("edit-post"); // switch to edit page
  };

  const handleEditDonation = (donation) => {
    setSelectedDonation(donation); // save project being edited
    setActiveThis("edit-donation"); // switch to edit page
  };

  const handleEditTeam = (TeamMember) => {
    setSelectedTeam(TeamMember);
    setActiveThis("edit-team");
  };

  const renderContent = () => {
    switch (activeThis) {
      case "project":
        return <Project onEdit={handleEditProject} />;

      case "donations":
        return <Donations onEdit={handleEditDonation} />;

      case "volunteerDash":
        return <VolunteerDash />;

      case "post":
        return <Post onEdit={handleEditPost} />;

      case "add-team-member":
        return <TeamMember onEdit={handleEditTeam} />;

      case "analytics":
        return <Analytics />;

      case "edit-project":
        return (
          <EditProject
            project={selectedProject}
            onEdit={() => setActiveThis("project")} // go back to project list after editing
          />
        );

      case "edit-post":
        return (
          <EditPost
            post={selectedPost}
            onEdit={() => setActiveThis("post")} // go back to post list after editing
          />
        );
      case "edit-donation":
        return (
          <EditDonation
            donation={selectedDonation}
            onEdit={() => setActiveThis("donation")} // go back to post list after editing
          />
        );

      case "edit-team":
        return (
          <EditTeam
            team={selectedTeam}
            onEdit={() => setActiveThis("add-team-member")} // go back to post list after editing
          />
        );
      default:
        return (
          <>
            <DisplayBoard />
            <Display1 />
          </>
        );
    }
  };

  return (
    <div className="dashboard-section">
      {/* Sidebar */}
      <div className="sidebar-section">
        <div className={`sidebar ${menuOpen ? "open" : "closed"}`}>
          <div className="sidebar-title">
            <h5 className="sidebarTitle">Welcome {user?.name}</h5>
            <div className="sidebar-toggle">
              <img
                className="menu-toggle"
                src={MenuImg}
                alt="toggle"
                onClick={() => setMenuOpen((prev) => !prev)}
              />
            </div>
          </div>

          <div className="sidebar-search">
            <input type="text" />
            <img className="search-btn" src={SearchImg} alt="search" />
          </div>

          <div className="sidebar-options-container">
            <div
              className="sidebar-option"
              onClick={() => setActiveThis("project")}
            >
              <img
                className="sidebar-option-img"
                src={ProjectImg}
                alt="project"
              />
              <h3>Project</h3>
            </div>

            <div
              className="sidebar-option"
              onClick={() => setActiveThis("donations")}
            >
              <img
                className="sidebar-option-img"
                src={DonateImg}
                alt="donations"
              />
              <h3>Donations</h3>
            </div>

            <div
              className="sidebar-option"
              onClick={() => setActiveThis("volunteerDash")}
            >
              <img
                className="sidebar-option-img"
                src={VoluntImg}
                alt="volunteers"
              />
              <h3>Volunteers</h3>
            </div>
            <h2 className="sidebar-separator">System Content</h2>
            <div
              className="sidebar-option"
              onClick={() => setActiveThis("post")}
            >
              <img className="sidebar-option-img" src={ReportImg} alt="posts" />
              <h3>Posts</h3>
            </div>

            <div
              className="sidebar-option"
              onClick={() => setActiveThis("add-team-member")}
            >
              <img
                className="sidebar-option-img"
                src={AnalyticsImg}
                alt="newTeamMember"
              />
              <h3>Team</h3>
            </div>
            <br />
            <div
              className="sidebar-option"
              onClick={handleLogout}
              style={{ background: "red" }}
            >
              &#8594;
              <h3>Logout</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Display */}
      <div className="dashboard-display">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;
