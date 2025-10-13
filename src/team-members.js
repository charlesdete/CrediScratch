import React, { useState, useEffect } from "react";
import "./team.css";

function TeamMember() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/team")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);

        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item) => ({
            src: `http://localhost:5000${
              item.memberFile.startsWith("/")
                ? item.memberFile
                : "/" + item.memberFile
            }`,
            memberName: item.memberName,
            memberPosition: item.memberPosition,
            memberEmail: item.memberEmail,
          }));
          setTeamMembers(formatted);
        } else {
          setTeamMembers([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setTeamMembers([]);
      });
  }, []);

  return (
    <div className="member-container">
      {teamMembers.map((member, index) => (
        <div className="members" key={index}>
          <div className="image-holder">
            <img
              src={member.src}
              className="memberImg"
              alt={member.memberName}
            />
          </div>
          <h4 className="member-name">{member.memberName}</h4>
          <h2 className="member-title">{member.memberPosition}</h2>
          {/* Optional: <p className="member-email">{member.memberEmail}</p> */}
        </div>
      ))}
    </div>
  );
}

export default TeamMember;
