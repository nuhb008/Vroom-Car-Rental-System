import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";

export default function Profile() {
  const [user] = useAtom(userAtom);
  
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Please log in to see Profile</h2>
        </div>
      </div>
    );
  }
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>User Profile</h2>
        
        <div style={styles.detailsContainer}>
          <div style={styles.detailItem}>
            <span style={styles.label}>Name:</span>
            <span style={styles.value}>{user.fullName}</span>
          </div>
          
          <div style={styles.detailItem}>
            <span style={styles.label}>Address:</span>
            <span style={styles.value}>{user.address}</span>
          </div>
          
          <div style={styles.detailItem}>
            <span style={styles.label}>Contact:</span>
            <span style={styles.value}>{user.contact}</span>
          </div>
          
          {user.role && (
            <div style={styles.detailItem}>
              <span style={styles.label}>Role:</span>
              <span style={{
                ...styles.value,
                color: user.role === "admin" ? "#dc3545" : 
                      user.role === "owner" ? "#28a745" : "#007bff"
              }}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          )}
        </div>
        
        <div style={styles.buttonGroup}>
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333333",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
  },
  detailsContainer: {
    marginBottom: "30px",
  },
  detailItem: {
    display: "flex",
    borderBottom: "1px solid #f0f0f0",
    padding: "12px 0",
  },
  label: {
    fontWeight: "bold",
    width: "40%",
    color: "#555",
  },
  value: {
    width: "60%",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "#ffffff",
    padding: "12px 30px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};