import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCarByRegNo } from "../../services/api"; // Ensure this API function gets car details, including rate

const BookCar = () => {
    const { regNo } = useParams(); // Get regNo from URL
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [carRate, setCarRate] = useState(null); // Set initial state as null to indicate loading

    // Fetch car details (including rate) when the component mounts
    useEffect(() => {
        console.log("Fetching car details for regNo:", regNo); // Debugging log
        getCarByRegNo(regNo)
            .then(response => {
                console.log("Car data fetched:", response.data); // Log the response data
                setCarRate(response.data.rate); // Set the fetched rate
            })
            .catch(error => {
                console.error("Error fetching car details:", error);
            });
    }, [regNo]); // Only fetch when regNo changes

    const calculateTotalPrice = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = (end - start) / (1000 * 3600 * 24); // Calculate the number of days
        if (days > 0) {
            setTotalPrice(days * carRate); // Calculate the total price using the fetched rate
        } else {
            alert('Please select a valid date range.');
            setTotalPrice(0);
        }
    };

    // Show a loading message if the rate is not fetched yet
    if (carRate === null) {
        return <div>Loading car details...</div>;
    }

    return (
        <div>
            <h2>Book Car: {regNo}</h2>
            <div>
                <label>Select Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label>Select End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <button onClick={calculateTotalPrice}>Calculate Total Price</button>

            {totalPrice > 0 && (
                <div>
                    <p>Total Price: ${totalPrice}</p>
                </div>
            )}
            <button>Book Car</button> {/* Implement booking functionality here */}
        </div>
    );
};

export default BookCar;
