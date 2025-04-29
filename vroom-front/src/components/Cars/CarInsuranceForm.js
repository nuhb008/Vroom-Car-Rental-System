import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarByRegNo, updateCar,  } from "../../services/api";
import { createInsurance } from "../../services/api"; 


const CarInsuranceForm = () => {
    const { regNo } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState({
        regNo: "",
        ProviderName: "",
        PolicyNumber: "",
        CoverageAmount: "",
        StartDate: "",
        EndDate: ""
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
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const insurance = {
                regNo: car.regNo,
                providerName: car.ProviderName,
                policyNumber: car.PolicyNumber,
                coverageAmount: car.CoverageAmount,
                startDate: car.StartDate,
                endDate: car.EndDate
            };
            await createInsurance(insurance);
            navigate("/cars");
        } catch (error) {
            console.error("Error adding insurance:", error);
        }
    };
    

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Add Insurance</h2>
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
                        name="ProviderName" 
                        value={car.ProviderName} 
                        onChange={handleChange} 
                        placeholder="Provider Name" 
                        required 
                    />
                    <input 
                        style={styles.input} 
                        type="text" 
                        name="PolicyNumber" 
                        value={car.PolicyNumber} 
                        onChange={handleChange} 
                        placeholder="Policy Number" 
                        required 
                    />
                    <input 
                        style={styles.input} 
                        type="number" 
                        name="CoverageAmount" 
                        value={car.CoverageAmount} 
                        onChange={handleChange} 
                        placeholder="Coverage Amount" 
                        required 
                    />
                    <input 
                        style={styles.input} 
                        type="date" 
                        name="StartDate" 
                        value={car.StartDate} 
                        onChange={handleChange} 
                        placeholder="Start Date" 
                        required 
                    />
                    <input 
                        style={styles.input} 
                        type="date" 
                        name="EndDate" 
                        value={car.EndDate} 
                        onChange={handleChange} 
                        placeholder="End Date" 
                        required 
                    />
                    <div style={styles.buttonGroup}>
                        <button type="button" onClick={() => navigate("/cars")} style={styles.cancelButton}>Cancel</button>
                        <button type="submit" style={styles.submitButton}>Add</button>
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

export default CarInsuranceForm;
