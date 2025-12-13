import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Gallery from "./gallery";
import Section3 from "./section3";
import Section4 from "./section4";
import Footer from "./footer";
import Team from "./team";
import { Route, Routes, Link } from "react-router";
import Partners from "./partners";
import SignIn from "./login";
import Signup from "./register";
import About from "./about";
import ProtectedRoute from "./protectedRoute";
import Dashboard from "./dashboard";
import masaiImg from "./images/masai.png";

// Layout wrapper (Navbar + Page + Footer)
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

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    if (activeModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [activeModal]);

  // Get user object from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Example role check
  if (user?.role === 1) {
    console.log("Admin logged in");
  } else if (user?.role === 0) {
    console.log("Normal user logged in");
  }

  return (
    <>
      {/* <Router> */}
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Layout isLoggedIn={!!user}>
              <div className="wrapper">
                <img src={masaiImg} className="wrapperImg" alt="" />
                <div className="wrapper-contents">
                  <h5 className="heroH5">
                    CReDI strengthens the capacity of minority, slum and
                    marginalized communities in Kenya to secure their economic,
                    social, cultural and political rights in a healthy and
                    sustainable environment.
                  </h5>

                  <div className="buttons">
                    <h3
                      className="SigninArrow"
                      onClick={() => openModal("login")}
                    >
                      {/* SignIn &#8594; */}
                    </h3>

                    <Link to="/about" className="link">
                      Learn more
                    </Link>

                    <h3
                      className="SigninArrow-prev"
                      onClick={() => openModal("register")}
                    >
                      {/* &#8592; SignUp */}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Sections */}
              <Section1 />
              <Section2 />
              <Gallery />
              <Section3 />
              <Section4 />
              <Partners />
            </Layout>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <Layout isLoggedIn={!!user}>
              <About />
            </Layout>
          }
        />

        {/* Team */}
        <Route
          path="/team"
          element={
            <Layout>
              <Team />
            </Layout>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        {/* Protected Dashboard (Admin only) */}
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
      {/* </Router> */}

      {/* Modals */}
      {activeModal === "login" && <SignIn closeModal={closeModal} />}
      {activeModal === "register" && <Signup closeModal={closeModal} />}
    </>
  );
}

export default App;
