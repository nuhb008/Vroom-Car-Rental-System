import React, { useState, useEffect } from 'react';
import { deleteCar, getCarsByStatus } from '../../services/api';
import CarCard from '../../components/Cars/CarCard'; 

const CarNotAvailable = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const response = await getCarsByStatus("notavailable");
        setCars(response.data);
    };

    // const handleDelete = async (regNo) => {
    //     await deleteCar(regNo);
    //     fetchCars();
    // };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Not Available Cars List</h2>

            <div style={styles.container}>
                {cars.map((car) => (
                    <CarCard key={car.regNo} car={car} />  // Using CarCard here
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

export default CarNotAvailable;
