import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Navbar from "./Navbar";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Gallery from "./gallery";
import Section3 from "./section3";
import Section4 from "./section4";
import Footer from "./footer";
import Team from "./team";
import Partners from "./partners";
import SignIn from "./login";
import Signup from "./register";
import About from "./about";
import ProtectedRoute from "./protectedRoute";
import Dashboard from "./dashboard";

import masaiImg from "./images/masai.png";

// Layout wrapper (Navbar + main content + Footer)
function Layout({ isLoggedIn, children }) {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  const [activeModal, setActiveModal] = useState(null);

  // Modal open/close handlers
  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [activeModal]);

  // Decrypt user data from localStorage
  const SECRET_KEY = "my-secret-key";

  const storedUser = localStorage.getItem("user");

  let user = null;
  if (storedUser) {
    try {
      const bytes = CryptoJS.AES.decrypt(storedUser, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      user = JSON.parse(decrypted);
    } catch (err) {
      console.error("Failed to decrypt user", err);
      localStorage.removeItem("user");
    }
  }

  // Optional: Role check logs (you can remove in prod)
  useEffect(() => {
    if (user?.role === 1) {
      console.log("Admin logged in");
    } else if (user?.role === 0) {
      console.log("Normal user logged in");
    }
  }, [user]);

  return (
    <>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Layout isLoggedIn={!!user}>
              <div className="wrapper-app">
                <img src={masaiImg} alt="Masai" className="wrapper-Img" />
                <div className="wrapper-contents">
                  <h5 className="heroH5">
                    CReDI strengthens the capacity of minority, slum and
                    marginalized communities in Kenya to secure their economic,
                    social, cultural and political rights in a healthy and
                    sustainable environment.
                  </h5>

                  <div className="buttons">
                    <h3 className="SigninArrow" onClick={() => openModal("login")}>
                      {/* SignIn &#8594; */}
                    </h3>

                    <Link to="/about" className="link">
                      Learn more
                    </Link>

                    <h3 className="SigninArrow-prev" onClick={() => openModal("register")}>
                      {/* &#8592; SignUp */}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Home Page Sections */}
              <Section1 />
              <Section2 />
              <Gallery />
              <Section3 />
              <Section4 />
              <Partners />
            </Layout>
          }
        />

        {/* About Page */}
        <Route
          path="/about"
          element={
            <Layout isLoggedIn={!!user}>
              <About />
            </Layout>
          }
        />

        {/* Team Page */}
        <Route
          path="/team"
          element={
            <Layout isLoggedIn={!!user}>
              <Team />
            </Layout>
          }
        />

        {/* Sign In and Sign Up routes (no Layout to keep minimal) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard (Admin Only) */}
        <Route element={<ProtectedRoute requiredRole={1} />}>
  <Route
    path="/dashboard"
    element={
      <Layout isLoggedIn={!!user}>
        <Dashboard />
      </Layout>
    }
  />
</Route>

      </Routes>

      {/* Modals rendered conditionally */}
      {activeModal === "login" && <SignIn closeModal={closeModal} />}
      {activeModal === "register" && <Signup closeModal={closeModal} />}
    </>
  );
}

export default App;
