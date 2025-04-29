import React, { useState, useEffect } from 'react';
import { getCarsByFuel, getCarsByStatus } from '../../services/api';
import CarCard from '../../components/Cars/CarCard';

const CarListAvailable = () => {
    const [fuelType, setFuelType] = useState("");
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        fetchCars();
    }, [fuelType]);
    
    const fetchCars = async () => {
        setIsLoading(true);
        try {
            let response;
            if (fuelType === "") {
                response = await getCarsByStatus("available");
            } else {
                response = await getCarsByFuel(fuelType);
            }
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleChange = (e) => {
        setFuelType(e.target.value);
    }
    
    return (
        <div style={styles.pageContainer}>
            <div style={styles.headerCard}>
                <h2 style={styles.title}>Available Cars</h2>
                
                <div style={styles.filterContainer}>
                    <label style={styles.filterLabel}>Filter by Fuel Type:</label>
                    <select 
                        name="fuelType" 
                        value={fuelType} 
                        onChange={handleChange}
                        style={styles.select}
                    >
                        <option value="">All Fuel Types</option>
                        <option value="Electric">Electric</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                    </select>
                </div>
            </div>
            
            {isLoading ? (
                <div style={styles.loadingContainer}>
                    <div style={styles.loadingText}>Loading cars...</div>
                </div>
            ) : cars.length > 0 ? (
                <div style={styles.carGrid}>
                    {cars.map((car) => (
                        <CarCard key={car.regNo} car={car} />
                    ))}
                </div>
            ) : (
                <div style={styles.noResultsContainer}>
                    <p style={styles.noResultsText}>
                        No cars available with the selected criteria.
                    </p>
                </div>
            )}
        </div>
    );
};

const styles = {
    pageContainer: {
        backgroundColor: "#f8f9fa",
        minHeight: "90vh",
        padding: "30px",
    },
    headerCard: {
        backgroundColor: "#ffffff",
        padding: "20px 30px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "30px",
    },
    title: {
        color: "#333333",
        marginBottom: "20px",
        borderBottom: "1px solid #eee",
        paddingBottom: "15px",
    },
    filterContainer: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        flexWrap: "wrap",
    },
    filterLabel: {
        fontWeight: "bold",
        color: "#555",
        minWidth: "120px",
    },
    select: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        minWidth: "200px",
    },
    carGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
    },
    loadingText: {
        fontSize: "18px",
        color: "#666",
    },
    noResultsContainer: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    noResultsText: {
        fontSize: "18px",
        color: "#666",
    }
};

export default CarListAvailable;