import React, { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtomWithPersistence } from "../atoms/userAtom"; // Use persistent atom
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getUserById } from "../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useAtom(userAtomWithPersistence); // Use persistent atom
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", {
        username,
        password,
      });
  
      const baseUser = response.data; // ✅ define baseUser here
      setError("");
  
      let role = "";
  
      try {
        const userResponse = await getUserById(baseUser.uid);
        const userDetails = userResponse.data;
  
        if (userDetails.userType === 1) {
          role = "customer";
        } else if (userDetails.userType === 2) {
          role = "owner";
        } else {
          role = "admin";
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details");
      }
  
      const updatedUser = { ...baseUser, role }; // ✅ correct merge
      setUser(updatedUser); // ✅ Save updated user
  
      // Navigate based on role
      if (role === "customer") {
        navigate("/customer");
      } else if (role === "owner") {
        navigate("/owner");
      } else {
        navigate("/admin");
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;

