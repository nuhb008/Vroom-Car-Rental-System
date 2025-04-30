import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarByRegNo, getRentalById, updateRental, getBookingById } from "../services/api";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { getImagesByRegNo, viewImage } from "../services/api";
const BookingPage = () => {
    const { bid } = useParams();
    const [regNo, setRegNo] = useState("");

    const [rental, setRental] = useState(null);

    const [booking, setBooking] = useState("");

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
        getBookingById(bid)
            .then(response => {
                setBooking(response.data);
                setRegNo(booking.regNo);
            })
            .catch(error => {
                console.error("Error fetching BOOKING details:", error);
            });
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
                
                    const handleDelete = async () => {
                        if (window.confirm('Are you sure you want to cancel this booking?')) {
                            const res = await getRentalById(booking.bid);
                            res.data.status = "Canceled";
                            const response = await updateRental(res.data.rentID, res.data); // Correct usage
                            console.log(response.data);
                            navigate("/dashboard");
                        }
                    };
                    
                
        return (
                <div style={styles.container}>
                    <div style={styles.card}>
                        <h2 style={styles.title}>Booking Details</h2>
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
                    <span style={styles.label}>From:</span>
                    <span style={styles.value}>{booking.fromDate}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.label}>Till:</span>
                    <span style={styles.value}>{booking.tillDate}</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.label}>Rate:</span>
                    <span style={styles.value}>${car.rate} per day</span>
                </div>
                <div style={styles.detailItem}>
                    <span style={styles.label}>Status:</span>
                    <span style={{
                        ...styles.value,
                        color: booking.status === "Active" ? "#28a745" : 
                              booking.status === "Canceled" ? "#dc3545" : "#007bff"
                    }}>
                        {booking.status}
                    </span>
                </div>
            </div>
            
            <div style={styles.buttonGroup}>
                <button 
                    onClick={() => navigate("/dashboard")} 
                    style={styles.cancelButton}>
                    Back to Dashboard
                </button>
                
                
                {booking.status === "Active" && (
                    <button 
                        onClick={() => handleDelete()} 
                        style={{...styles.actionButton, backgroundColor: "#dc3545"}}>
                        Cancel Booking
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

export default BookingPage;