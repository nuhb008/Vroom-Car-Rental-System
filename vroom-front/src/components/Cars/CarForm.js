import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarByRegNo, updateCar } from "../../services/api";

const CarForm = () => {
    const { regNo } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState({
        regNo: "",
        model: "",
        capacity: "",
        rate: "",
        status: "",
        fuelType: ""
    });

    useEffect(() => {
        getCarByRegNo(regNo)
            .then(response => {
                setCar(response.data);
            })
            .catch(error => {
                console.error("Error fetching car details:", error);
            });
    }, [regNo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Map "Available" to null before saving to state
        if (name === "status") {
            setCar((prevCar) => ({ ...prevCar, status: value === "Available" ? null : value }));
        } else {
            setCar((prevCar) => ({ ...prevCar, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCar(regNo, car);
            navigate("/cars");
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Edit Car Details</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input 
                        style={styles.input} 
                        type="text" 
                        name="regNo" 
                        value={car.regNo} 
                        onChange={handleChange} 
                        placeholder="Registration No" 
                        required 
                        disabled
                    />
                    <input 
                        style={styles.input} 
                        type="text" 
                        name="model" 
                        value={car.model} 
                        onChange={handleChange} 
                        placeholder="Model" 
                        required 
                    />
                    <input 
                        style={styles.input} 
                        type="number" 
                        name="capacity" 
                        value={car.capacity} 
                        onChange={handleChange} 
                        placeholder="Capacity" 
                        required 
                    />
                    <input 
                        style={styles.input} 
                        type="number" 
                        name="rate" 
                        value={car.rate} 
                        onChange={handleChange} 
                        placeholder="Rate per day" 
                        required 
                    />
                    <select 
                        style={styles.select} 
                        name="status" 
                        value={car.status} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Booked">Booked</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                    <select 
                        style={styles.select} 
                        name="fuelType" 
                        value={car.fuelType} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                    </select>
                    <div style={styles.buttonGroup}>
                        <button type="button" onClick={() => navigate("/cars")} style={styles.cancelButton}>Cancel</button>
                        <button type="submit" style={styles.submitButton}>Update</button>
                    </div>
                </form>
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
        maxWidth: "500px",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        marginBottom: "15px",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    select: {
        marginBottom: "15px",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
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
    submitButton: {
        backgroundColor: "#28a745",
        color: "#ffffff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};

export default CarForm;
