import React, { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtomWithPersistence } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useAtom(userAtomWithPersistence);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", {
        username,
        password,
      });

      setUser(response.data);
      setError("");

      try {
        const userResponse = await getUserById(response.data.uid);
        const userDetails = userResponse.data;
        if (userDetails.userType === 1) {
          navigate("/customer");
        } else if (userDetails.userType === 2) {
          navigate("/owner");
        } else {
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details");
      }
    } catch (error) {
      if (error.response?.status === 404 && error.response?.data) {
        navigate(`/userdetails/${error.response.data}`);
      } else {
        setError(error.response?.data || "Login failed");
        setUser(null);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username:</label>
            <input
              style={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "28px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  error: {
    color: "red",
    marginTop: "15px",
    textAlign: "center",
  },
};

export default Login;
