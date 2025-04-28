import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <h2 style={styles.logoText}>VROOM</h2>
      </div>

      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        {!user ? (
          <Link style={styles.link} to="/login">Login</Link>
        ) : (
          <>
            <Link style={styles.link} to="/dashboard">Dashboard</Link>
            <Link style={styles.link} to="/profile">Profile</Link>
            <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

      <div style={styles.welcome}>
        {user ? (
          <span style={styles.welcomeText}>Welcome, {user.fullName} ({user.uid})</span>
        ) : (
          <span style={styles.welcomeText}>Please log in</span>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 30px",
    backgroundColor: "#f8f9fa", // light grey background
    color: "#333", // dark text for good contrast
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logo: {
    flex: "1",
  },
  logoText: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "2px",
  },
  links: {
    flex: "2",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#333",
    textDecoration: "none",
    fontSize: "16px",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  logoutButton: {
    backgroundColor: "transparent",
    color: "#333",
    border: "1px solid #333",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s, color 0.3s",
  },
  welcome: {
    flex: "1",
    textAlign: "right",
    fontSize: "14px",
  },
  welcomeText: {
    fontStyle: "italic",
  },
};

export default Navbar;
