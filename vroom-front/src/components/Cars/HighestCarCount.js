import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../../atoms/userAtom';
import { getCarsByOwner, deleteCar } from '../../services/api';
import CarCard from '../../components/Cars/CarCard'; 

const HighestCarCount = () => {
    const [user] = useAtom(userAtom);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const response = await getCarsByOwner(user.uid);
        const allCars = response.data;
    
        if (allCars.length > 0) {
            const randomIndex = Math.floor(Math.random() * allCars.length);
            setCars([allCars[randomIndex]]); // Set only one random car
        } else {
            setCars([]);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>{user?.fullName}'s Most Picked Car</h2>

            <div style={styles.container}>
                {cars.map((car) => (
                    <CarCard 
                        key={car.regNo} 
                        car={car} 
                        onDelete={() => handleDelete(car.regNo)} // Pass delete function
                    />
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

export default HighestCarCount;
