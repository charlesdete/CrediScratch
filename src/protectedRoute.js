import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import CryptoJS from "crypto-js";

const SECRET_KEY = "my-secret-key";

const ProtectedRoute = ({ requiredRole }) => {
  const encryptedUser = localStorage.getItem("user");
  let user = null;

  if (encryptedUser) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      user = JSON.parse(decrypted);
    } catch (err) {
      localStorage.removeItem("user");
      return <Navigate to="/signin" replace />;
    }
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (
    requiredRole !== undefined &&
    Number(user.role) !== Number(requiredRole)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
