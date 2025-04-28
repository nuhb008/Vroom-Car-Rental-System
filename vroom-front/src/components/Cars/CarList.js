import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../../atoms/userAtom';
import { getCarsByOwner, deleteCar } from '../../services/api';
import CarCard from '../../components/Cars/CarCard'; 

const CarList = () => {
    const [user] = useAtom(userAtom);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const response = await getCarsByOwner(user.uid);
        setCars(response.data);
    };

    const handleDelete = async (regNo) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            await deleteCar(regNo);
            fetchCars();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>{user?.fullName}'s Cars List</h2>

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

export default CarList;
