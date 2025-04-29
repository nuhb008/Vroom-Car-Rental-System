import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarByRegNo, deleteCar } from "../../services/api";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import { getImagesByRegNo, viewImage } from "../../services/api";
const CarProfile = () => {
    const { regNo } = useParams();
    const navigate = useNavigate();
    const [user] = useAtom(userAtom);

    const [car, setCar] = useState({
        regNo: "",
        ownerId: "",
        model: "",
        capacity: "",
        rate: "",
        status: "",
        fuelType: ""
    });

    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        getCarByRegNo(regNo)
            .then(response => {
                setCar(response.data);
            })
            .catch(error => {
                console.error("Error fetching car details:", error);
            });

        const fetchImage = async () => {
            try {
                const imageList = await getImagesByRegNo(regNo);
                if (imageList.data.length > 0) {
                    const imageId = imageList.data[0].id;
                    const imageResponse = await viewImage(imageId);
                    const base64 = btoa(
                        new Uint8Array(imageResponse.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ""
                        )
                    );
                    const mimeType = imageResponse.headers['content-type'];
                    setImageSrc(`data:${mimeType};base64,${base64}`);
                }
                    } catch (err) {
                        console.error("Error fetching image:", err);
                    }
                        };
                    
                        fetchImage();
                    }, [regNo]);
                
                    const handleBookCar = () => {
                        navigate(`/bookcar/${regNo}`);
                    };
                
                    const handleDelete = async () => {
                        if (window.confirm('Are you sure you want to delete this car?')) {
                            await deleteCar(regNo);
                            navigate("/dashboard");
                        }
                    };
                
        return (
                <div style={styles.container}>
                    <div style={styles.card}>
                        <h2 style={styles.title}>Car Details</h2>
                        {imageSrc && (
                <img
                    src={imageSrc}
                    alt="Car"
                    style={styles.image}
                />
            )}
            
            <div style={styles.detailsContainer}>
                <div style={styles.detailItem}>
                    <span style={styles.label}>Registration No:</span>
                    <span style={styles.value}>{car.regNo}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.label}>Model:</span>
                    <span style={styles.value}>{car.model}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.label}>Capacity:</span>
                    <span style={styles.value}>{car.capacity} persons</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.label}>Rate:</span>
                    <span style={styles.value}>${car.rate} per day</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.label}>Fuel Type:</span>
                    <span style={styles.value}>{car.fuelType}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.label}>Status:</span>
                    <span style={{
                        ...styles.value,
                        color: car.status === "Available" ? "#28a745" : 
                              car.status === "Booked" ? "#dc3545" : "#007bff"
                    }}>
                        {car.status}
                    </span>
                </div>
            </div>
            
            <div style={styles.buttonGroup}>
                <button 
                    onClick={() => navigate("/dashboard")} 
                    style={styles.cancelButton}>
                    Back to Dashboard
                </button>
                
                {user.role === "owner" && (
                    <button 
                        onClick={() => navigate(`/cars/edit/${car.regNo}`)} 
                        style={{...styles.actionButton, backgroundColor: "#ffc107"}}>
                        Edit
                    </button>
                )}
                
                {car.status === "Available" && user.role === "customer" && (
                    <button 
                        onClick={handleBookCar} 
                        style={styles.submitButton}>
                        Book This Car
                    </button>
                )}
                {user.role === "owner" && (
                    <button 
                        onClick={() => handleDelete()} 
                        style={{...styles.actionButton, backgroundColor: "#dc3545"}}>
                        Delete
                    </button>
                )}
                {user.role === "owner" && (
                    <button 
                        onClick={() => navigate(`/insurance/add/${car.regNo}`)} 
                        style={{...styles.actionButton, backgroundColor: "#ffc107"}}>
                        Add Insurance
                    </button>
                )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: "#f8f9fa",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "600px",
    },
    title: {
        textAlign: "center",
        marginBottom: "30px",
        color: "#333333",
        borderBottom: "1px solid #eee",
        paddingBottom: "15px",
    },
    detailsContainer: {
        marginBottom: "30px",
    },
    detailItem: {
        display: "flex",
        borderBottom: "1px solid #f0f0f0",
        padding: "12px 0",
    },
    label: {
        fontWeight: "bold",
        width: "40%",
        color: "#555",
    },
    value: {
        width: "60%",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
    },
    cancelButton: {
        backgroundColor: "#6c757d",
        color: "#ffffff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    actionButton: {
        color: "#ffffff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    submitButton: {
        backgroundColor: "#007bff",
        color: "#ffffff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    image: {
        width: "100%",
        height: "200px",            
        objectFit: "cover",         
        borderRadius: "10px",
        display: "block",           
        marginBottom: "10px",
    }
    
};

export default CarProfile;