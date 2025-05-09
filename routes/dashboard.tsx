import React, { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userRole: "",
    userName: "",
    userEmail: "",
  });

  useEffect(() => {
    // Retrieve user data from localStorage
    const userRole = localStorage.getItem("userRole");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    // Redirect if not admin or not logged in
    if (!userRole || userRole !== "admin") {
      navigate("/");
      return;
    }

    setUserData({
      userRole: userRole || "admin",
      userName: userName || "Admin User",
      userEmail: userEmail || "admin@example.com",
    });
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    // Redirect to home page
    navigate("/");
  };

  return (
    <Dashboard
      userRole={userData.userRole as "admin"}
      userName={userData.userName}
      userEmail={userData.userEmail}
      onLogout={handleLogout}
    />
  );
};

export default DashboardPage;
