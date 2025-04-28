import React, { useEffect, useState } from "react";
import { getAllCars, getCarsByFuel, getCarsByStatus } from "../../services/api";
import { useNavigate } from "react-router-dom";
import CarCard from '../../components/Cars/CarCard'; 

const CarListAll = () => {
    const [fuelType, setFuelType] = useState("");
    const [status, setStatus] = useState("");
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCars();
    }, [fuelType, status]);

    const fetchCars = async () => {
        if (fuelType !== "") {
            const response = await getCarsByFuel(fuelType);
            setCars(response.data);
        } else if (status !== "") {
            const response = await getCarsByStatus(status);
            setCars(response.data);
        } else {
            const response = await getAllCars();
            setCars(response.data);
        }
    };

    const handleStatusChange = () => {
        setStatus("available");
    };

    const handleFuelChange = (e) => {
        setFuelType(e.target.value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>All Cars List</h2>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={handleStatusChange}>Show Available</button>
                <select name="fuelType" value={fuelType} onChange={handleFuelChange} required>
                    <option value="">All</option>
                    <option value="Electric">Electric</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                </select>
            </div>

            <div style={styles.container}>
                {cars.map((car) => (
                    <CarCard key={car.regNo} car={car} /> // Use CarCard
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
    },
};

export default CarListAll;
