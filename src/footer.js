import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import CrediLogo from "./images/credilogo.png";
import "./footer.css";

function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Organization Info */}
            <div className="footer-about">
              <div className="logo-section">
                <img src={CrediLogo} alt="CReDI Logo" className="logo" />
                <div>
                  <h3 className="footer-title">CReDI</h3>
                  <p className="footer-subtitle">
                    Centre for Resource & Development Inclusion
                  </p>
                </div>
              </div>
              <p className="footer-text">
                Strengthening the capacity of minority, slum and marginalized
                communities in Kenya to secure their economic, social, cultural
                and political rights in a healthy and sustainable environment.
              </p>
              <div className="social-links">
                <a href="#" className="social-icon">
                  <Facebook />
                </a>
                <a href="#" className="social-icon">
                  <Twitter />
                </a>
                <a href="#" className="social-icon">
                  <Linkedin />
                </a>
                <a href="#" className="social-icon">
                  <Instagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h4 className="footer-heading">Quick Links</h4>
              <ul>
                <li>
                  <button onClick={() => scrollToSection("about")}>
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("programs")}>
                    Our Programs
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("activities")}>
                    Activities
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")}>
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-contact">
              <h4 className="footer-heading">Contact Info</h4>
              <div className="contact-item">
                <MapPin /> <span>Nairobi, Kenya</span>
              </div>
              <div className="contact-item">
                <Phone /> <span>+254 123 456 789</span>
              </div>
              <div className="contact-item">
                <Mail /> <span>23credi@gmail.com</span>
              </div>
              <div className="contact-item">
                <Globe /> <span>www.credi.org</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © 2024 Centre for Resource and Development Inclusion (CReDI). All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
