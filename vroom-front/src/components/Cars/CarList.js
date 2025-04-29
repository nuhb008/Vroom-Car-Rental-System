import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../../atoms/userAtom';
import { getCarsByOwner, deleteCar } from '../../services/api';
import CarCard from '../../components/Cars/CarCard';

const CarList = () => {
    const [user] = useAtom(userAtom);
    const [cars, setCars] = useState([]);
    const [randomCar, setRandomCar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const response = await getCarsByOwner(user.uid);
        const allCars = response.data;
        setCars(allCars);

        if (allCars.length > 0) {
            const randomIndex = Math.floor(Math.random() * allCars.length);
            setRandomCar(allCars[randomIndex]);
        }
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
            {randomCar && (
                <>
                    <h3>Most Booked Car</h3>
                    <div style={styles.container}>
                        <CarCard 
                            key={randomCar.regNo}
                            car={randomCar}
                            onDelete={() => handleDelete(randomCar.regNo)}
                        />
                    </div>
                </>
            )}

            {/* All Cars Section */}
            <h3>All Cars</h3>
            <div style={styles.container}>
                {cars.map((car) => (
                    <CarCard 
                        key={car.regNo}
                        car={car}
                        onDelete={() => handleDelete(car.regNo)}
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
