import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImagesByRegNo, viewImage } from "../../services/api";
const CarCard = ({ car, onDelete }) => {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const fetchImageByRegNo = async () => {
            try {
                const imageResponse = await getImagesByRegNo(car.regNo);
                if (imageResponse.data.length > 0) {
                    const imageId = imageResponse.data[0].id;
                    const binaryImage = await viewImage(imageId);
                    const base64 = btoa(
                        new Uint8Array(binaryImage.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    );
                    const mimeType = binaryImage.headers['content-type'];
                    setImageSrc(`data:${mimeType};base64,${base64}`);
                }
            } catch (error) {
                console.error("Failed to fetch image:", error);
            }
        };

        fetchImageByRegNo();
    }, [car.regNo]);

    return (
        <div style={styles.card}>
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={car.model}
                    style={styles.image}
                />
            )}
            <h3>{car.model}</h3>
            <p><strong>Reg No:</strong> {car.regNo}</p>
            <button style={styles.button} onClick={() => navigate(`/cars/profile/${car.regNo}`)}>
                Show Profile
            </button>
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
    image: {
        width: "100%",
        height: "200px",            
        objectFit: "cover",         
        borderRadius: "10px",
        display: "block",           
        marginBottom: "10px",
    },
    
};

export default CarCard;
