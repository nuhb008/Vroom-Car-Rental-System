// src/components/CarCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car,onDelete }) => {
    const navigate = useNavigate();

    return (
        <div style={styles.card}>
            <h3>{car.model}</h3>
            <p><strong>Reg No:</strong> {car.regNo}</p>

            {/* You can show more details if needed */}
            {/* <p><strong>Fuel Type:</strong> {car.fuelType}</p> */}

            <button style={styles.button} onClick={() => navigate(`/cars/profile/${car.regNo}`)}>
                Show Profile
            </button>
              {/* Only show delete button if onDelete prop exists */}
            {/* {onDelete && (
                <button 
                    style={{ ...styles.button, backgroundColor: 'red', marginTop: '10px' }} 
                    onClick={onDelete}
                >
                    Delete
                </button>
            )} */}
        </div>
    );
};

const styles = {
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
        marginTop: '10px',
    },
};

export default CarCard;
