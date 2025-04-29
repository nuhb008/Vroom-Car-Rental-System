import React, { useState } from "react";
import CarNotAvailable from "../components/Cars/CarNotAvailable";
import CarListAll from "../components/Cars/CarListAll";
import CheckInsuranceApplication from "./AdminFunctions/CheckInsuranceApplication";
import CheckNewCarApplication from "./AdminFunctions/CheckNewCarApplication";
import VerifyPayment from "./AdminFunctions/VerifyPayment";
import SeeAllUsers from "./AdminFunctions/SeeAllUsers";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('carNotAvailable');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (option) => {
    setCurrentView(option);
    setIsSidebarOpen(false);
  };

  return (
    <div style={styles.dashboard}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <button onClick={toggleSidebar} style={styles.hamburger}>
          &#9776;
        </button>
        <h1 style={styles.title}>Admin Dashboard</h1>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div style={styles.sidebar}>
          <h3>Menu</h3>
          <button style={styles.menuButton} onClick={() => handleMenuClick('carNotAvailable')}>Cars Not Available</button>
          <button style={styles.menuButton} onClick={() => handleMenuClick('allCars')}>See All Cars</button>
          <button style={styles.menuButton} onClick={() => handleMenuClick('allUsers')}>See All Users</button>
          <button style={styles.menuButton} onClick={() => handleMenuClick('insuranceApplications')}>Check Insurance Applications</button>
          <button style={styles.menuButton} onClick={() => handleMenuClick('newCarApplications')}>Check Car Maintenance</button>
          <button style={styles.menuButton} onClick={() => handleMenuClick('verifyPayments')}>Verify Payments</button>
        </div>
      )}

      {/* Main Content */}
      <div style={styles.content}>
        {currentView === 'carNotAvailable' && (
          <CarNotAvailable />
        )}
        {currentView === 'allCars' && (
          <div style={styles.viewContainer}>
            <CarListAll/>
          </div>
        )}
        {currentView === 'allUsers' && (
          <div style={styles.viewContainer}>
            <SeeAllUsers />
          </div>
        )}
        {currentView === 'insuranceApplications' && (
          <div style={styles.viewContainer}>
    
          <CheckInsuranceApplication/>
          </div>
        )}
        {currentView === 'newCarApplications' && (
          <div style={styles.viewContainer}>
            <CheckNewCarApplication/>
          </div>
        )}
        {currentView === 'verifyPayments' && (
          <div style={styles.viewContainer}>
            <VerifyPayment/>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    position: "relative",
    minHeight: "100vh",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#343a40",
    color: "white",
    padding: "10px 20px",
  },
  hamburger: {
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    marginRight: "20px",
  },
  title: {
    margin: 0,
  },
  sidebar: {
    position: "absolute",
    top: "60px",
    left: 0,
    width: "220px",
    backgroundColor: "#f8f9fa",
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
    padding: "20px",
    zIndex: 10,
  },
  menuButton: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#343a40",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "left",
  },
  content: {
    marginTop: "20px",
    padding: "20px",
  },
  viewContainer: {
    backgroundColor: "#f1f1f1",
    padding: "20px",
    borderRadius: "10px",
  },
};

export default AdminDashboard;
