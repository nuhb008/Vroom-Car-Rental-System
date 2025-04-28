import React, { useState, useEffect } from 'react'
import { getCarsByFuel, getCarsByStatus } from '../../services/api';
import CarCard from '../../components/Cars/CarCard';

const CarListAvailable = () => {
    const [fuelType, setFuelType] = useState("");
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, [fuelType]);

    const fetchCars = async () => {
        if(fuelType === "") {
            const response = await getCarsByStatus("available");
            setCars(response.data);
        } else {
            const response = await getCarsByFuel(fuelType);
            setCars(response.data);
        }
    };

    const handleChange = (e) => {
        setFuelType(e.target.value);
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Available Cars List</h2>

            <div style={{ marginBottom: '20px' }}>
                <select name="fuelType" value={fuelType} onChange={handleChange} required>
                    <option value="">All</option>
                    <option value="Electric">Electric</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                </select>
            </div>

            <div style={styles.container}>
                {cars.map((car) => (
                    <CarCard key={car.regNo} car={car} /> // <-- Use CarCard here
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

export default CarListAvailable;
