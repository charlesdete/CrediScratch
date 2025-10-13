import React, { useState, useEffect } from "react";
import Donation from "./donate";
import Volunteer from "./volunteer";
import "./section4.css";

function Section4() {
  const [activeModal, setActiveModal] = useState(null);
  // can be "donation", "volunteer", or null

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  // Lock background scroll when a modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [activeModal]);

  return (
    <>
      <div className="sec4-buttons">
        <div className="donation-cont">
          <h2 className="donation-title">Make a Donation</h2>
          <button className="donation" onClick={() => openModal("donation")}>
            Donation
          </button>
        </div>

        <div className="volunteer-cont">
          <h2 className="volunteer-title">Join us on this Journey</h2>
          <button className="volunteer" onClick={() => openModal("volunteer")}>
            Volunteer
          </button>
        </div>
      </div>

      {activeModal === "donation" && <Donation closeModal={closeModal} />}
      {activeModal === "volunteer" && <Volunteer closeModal={closeModal} />}
    </>
  );
}

export default Section4;
