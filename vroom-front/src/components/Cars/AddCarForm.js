import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCar, uploadImage } from "../../services/api";

const AddCarForm = () => {
    const navigate = useNavigate();

    const [car, setCar] = useState({
        regNo: "",
        ownerId: "",
        model: "",
        capacity: "",
        rate: "",
        status: "Maintenance",  // <-- set default
        fuelType: ""
    });
    

    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { ownerId, ...carData } = car;
            await createCar(ownerId, carData);

            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                await uploadImage(car.regNo, imageFile); // pass raw File
            }

            alert("Car added successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error adding car:", error);
            alert("Failed to add car. " + (error.response?.data || ""));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Add New Car</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input style={styles.input} type="text" name="regNo" value={car.regNo} onChange={handleChange} placeholder="Registration No" required />
                    <input style={styles.input} type="text" name="ownerId" value={car.ownerId} onChange={handleChange} placeholder="Owner ID" required />
                    <input style={styles.input} type="text" name="model" value={car.model} onChange={handleChange} placeholder="Model" required />
                    <input style={styles.input} type="number" name="capacity" value={car.capacity} onChange={handleChange} placeholder="Capacity" required />
                    <input style={styles.input} type="number" name="rate" value={car.rate} onChange={handleChange} placeholder="Rate per day" required />
                    
                    <select
                            style={styles.select}
                            name="status"
                            value={car.status}
                            disabled // <-- lock the field
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Available">Available</option>
                            <option value="Booked">Booked</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>

                    
                    <select style={styles.select} name="fuelType" value={car.fuelType} onChange={handleChange} required>
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                    </select>

                    <input style={styles.input} type="file" accept="image/*" onChange={handleImageChange} />

                    <div style={styles.buttonGroup}>
                        <button type="button" onClick={() => navigate("/cars")} style={styles.cancelButton}>Cancel</button>
                        <button type="submit" style={styles.submitButton}>Add Car</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
    },
    card: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '1rem',
        padding: '0.75rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    select: {
        marginBottom: '1rem',
        padding: '0.75rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1rem',
    },
    cancelButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    submitButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default AddCarForm;