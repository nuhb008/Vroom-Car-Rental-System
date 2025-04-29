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
import CarForm from "./components/Cars/CarForm";
import CarList from "./components/Cars/CarList";
import CarProfile from "./components/Cars/CarProfile";
import BookCar from "./pages/BookCar";
import BookList from "./components/Cars/BookList";
import Payment from './pages/Payment';
import PaymentForm from "./components/PaymentForm";
import ImageManager from "./components/Images/ImageManager";
import CarInsuranceForm from "./components/Cars/CarInsuranceForm";

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
                <Route path="/cars/edit/:regNo" element={<CarForm />} />
                <Route path="/insurance/add/:regNo" element={<CarInsuranceForm />} />
                <Route path="/cars/ownerlist" element={<CarList />} />
                <Route path="/cars/profile/:regNo" element={<CarProfile />} />
                <Route path="/bookcar/:regNo" element={<BookCar />} />
                <Route path="/car-bookings" element={<BookList />} />


                <Route path="/payment" element={<Payment />} />
                <Route path="/make-payment/:pid" element={<PaymentForm />} />



                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/owner" element={<OwnerDashboard />} />
                <Route path="/customer" element={<CustomerDashboard />} />
                <Route path="/image-manager" element={<ImageManager />} />

                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
