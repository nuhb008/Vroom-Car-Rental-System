import React, { useEffect, useState } from "react";
import { getAllCars, getCarsByFuel, getCarsByStatus } from "../../services/api";
import { useNavigate } from "react-router-dom";
import CarCard from '../../components/Cars/CarCard';

const CarListAll = () => {
    const [fuelType, setFuelType] = useState("");
    const [status, setStatus] = useState("");
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchCars();
    }, [fuelType, status]);
    
    const fetchCars = async () => {
        setIsLoading(true);
        try {
            let response;
            if (fuelType !== "") {
                response = await getCarsByFuel(fuelType);
            } else if (status !== "") {
                response = await getCarsByStatus(status);
            } else {
                response = await getAllCars();
            }
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleStatusChange = () => {
        setStatus(status === "available" ? "" : "available");
        setFuelType("");
    };
    
    const handleFuelChange = (e) => {
        setFuelType(e.target.value);
        setStatus("");
    };
    
    const clearFilters = () => {
        setFuelType("");
        setStatus("");
    };
    
    return (
        <div style={styles.pageContainer}>
            <div style={styles.headerCard}>
                <h2 style={styles.title}>All Cars</h2>
                
                <div style={styles.filterContainer}>
                    <button 
                        onClick={handleStatusChange}
                        style={{
                            ...styles.filterButton,
                            backgroundColor: status === "available" ? "#007bff" : "#6c757d",
                        }}
                    >
                        {status === "available" ? "✓ Show Available Only" : "Show Available Only"}
                    </button>
                    
                    <select 
                        name="fuelType" 
                        value={fuelType} 
                        onChange={handleFuelChange}
                        style={styles.select}
                    >
                        <option value="">All Fuel Types</option>
                        <option value="Electric">Electric</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                    </select>
                    
                    {(fuelType !== "" || status !== "") && (
                        <button 
                            onClick={clearFilters}
                            style={styles.clearButton}
                        >
                            Clear Filters
                        </button>
                    )}
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
                        No cars found with the selected filters.
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
    filterButton: {
        color: "#ffffff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
    },
    select: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        minWidth: "200px",
    },
    clearButton: {
        backgroundColor: "#6c757d",
        color: "#ffffff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
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

export default CarListAll;