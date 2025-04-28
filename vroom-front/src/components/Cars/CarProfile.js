import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarByRegNo, updateCar  } from "../../services/api";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";

const CarProfile = () => {
    const { regNo } = useParams(); // Always present
    const navigate = useNavigate();
    const [user] = useAtom(userAtom) ;

    const [car, setCar] = useState({
        regNo: "",
        ownerId: "",
        model: "",
        capacity: "",
        rate: "",
        status: "",
        fuelType: ""
    });

    useEffect(() => {
        getCarByRegNo(regNo)
            .then(response => {
                setCar(response.data);
            })
            .catch(error => {
                console.error("Error fetching car details:", error);
            });
    }, [regNo]);

    const handleBookCar = () => {
        navigate(`/bookcar/${regNo}`); // Redirect to the booking template page without changing the status
    };
    

    return (
        console.log(car),
        console.log(regNo),
        <div>
            <h2>Car Profile</h2>
            <div>
                <h3>Car Registration No: {car.regNo}</h3>
                <h3>Car Model: {car.model}</h3>
                <h3>Car Capacity: {car.capacity}</h3>
                <h3>Car Rate: {car.rate}</h3>
                <h3>Car Fuel Type: {car.fuelType}</h3>
                {car.status === "Available" ? (
                    <h3 style={{ color: "green" }}>Car Status: Available</h3>
                ) : car.status === "Booked" ? (
                    <h3 style={{ color: "red" }}>Car Status: Booked</h3>
                ) : (
                    <h3 style={{ color: "blue" }}>Car Status: Maintenance</h3>
                )}
            </div>
            {car.status === "Available" && (
                <button onClick={handleBookCar}>Book This Car</button>
            )}
            {user.role === "owner" && (
                <button onClick={() => navigate(`/cars/edit/${car.regNo}`)}>Edit Car</button>
            )}
            <button onClick={() => navigate("/cars")}>Back to Cars List</button>
        </div>
    );
}
export default CarProfile;