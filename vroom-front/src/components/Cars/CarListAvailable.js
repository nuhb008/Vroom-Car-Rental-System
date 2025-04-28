import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteCar, getCarsByFuel, getCarsByStatus } from '../../services/api';

const CarListAvailable = () => {
    const [fuelType, setFuelType] = useState("");
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

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

    // const handleDelete = async (regNo) => {
    //     await deleteCar(regNo);
    //     fetchCars();
    // };

    const handleChange = async (e) => {
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
                    <div key={car.regNo} style={styles.card}>
                        <h3>{car.model}</h3>
                        <p><strong>Reg No:</strong> {car.regNo}</p>
                        {/* <p><strong>Owner ID:</strong> {car.ownerId}</p>
                        <p><strong>Capacity:</strong> {car.capacity}</p>
                        <p><strong>Rate:</strong> {car.rate}</p>
                        <p><strong>Status:</strong> {car.status}</p>
                        <p><strong>Fuel Type:</strong> {car.fuelType}</p> */}

                        <button style={styles.button} onClick={() => navigate(`/cars/profile/${car.regNo}`)}>
                            Show Profile
                        </button>

                        {/* <button style={{ ...styles.button, backgroundColor: 'red', marginTop: '10px' }}
                            onClick={() => handleDelete(car.regNo)}>
                            Delete
                        </button> */}
                    </div>
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
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        padding: '20px',
        width: '250px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default CarListAvailable;