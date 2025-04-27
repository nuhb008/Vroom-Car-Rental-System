import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import { ToastContainer } from "react-toastify";

import LandingPage from "./pages/LandingPage";

import Profile from "./pages/Profile";
import OwnerDashboard from "./pages/OwnerDashboard";
import CarsPage from "./pages/CarsPage";

function App() {
    return (
        <Router>
            < ToastContainer />
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                
                <Route path="/dashboard" element={<Dashboard/>} />
                
                <Route path="/home" element={<LandingPage />} />
                <Route path="/profile" element={<Profile />} />


                <Route path="/login" element={<Login />} />
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/owner" element={<OwnerDashboard />} />
                <Route path="/customer" element={<CustomerDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
