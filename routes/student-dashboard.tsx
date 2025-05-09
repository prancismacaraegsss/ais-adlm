import React, { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import { useNavigate } from "react-router-dom";

const StudentDashboardPage = () => {
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

    // Redirect if not student or not logged in
    if (!userRole || userRole !== "student") {
      navigate("/");
      return;
    }

    setUserData({
      userRole: userRole || "student",
      userName: userName || "John Doe",
      userEmail: userEmail || "john.doe@example.com",
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
      userRole={userData.userRole as "student"}
      userName={userData.userName}
      userEmail={userData.userEmail}
      onLogout={handleLogout}
    />
  );
};

export default StudentDashboardPage;
