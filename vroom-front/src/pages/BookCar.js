import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarByRegNo,createBooking } from "../services/api";

const BookCar = () => {
  const { regNo } = useParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [carDetails, setCarDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    getCarByRegNo(regNo)
      .then(response => {
        setCarDetails(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching car details:", error);
        setError("Failed to load car details. Please try again.");
        setIsLoading(false);
      });
  }, [regNo]);

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !carDetails) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.round((end - start) / (1000 * 3600 * 24));
    
    if (days > 0) {
      setTotalPrice(days * carDetails.rate);
    } else {
      alert('Please select a valid date range.');
      setTotalPrice(0);
    }
  };

  const handleBooking = () => {
    // Don't proceed if already submitting or if there's no valid total price
    if (isSubmitting || totalPrice <= 0) return;
    
    setIsSubmitting(true);
    
    const bookingData = {
      //carId: carDetails.id,
      regNo: carDetails.regNo,
      fromDate: startDate,
      tillDate: endDate,
      //totalAmount: totalPrice,
      // Add any other required booking details here
    };
    
    createBooking(bookingData)
      .then(response => {
        // Show success message
        alert('Booking successful!');
        // Redirect to the "My Booked" component
        navigate('/car-bookings');

      })
      .catch(error => {
        console.error("Error creating booking:", error);
        alert('Failed to create booking. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading car details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.errorText}>{error}</div>
      </div>
    );
  }

  if (!carDetails) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.errorText}>Car not found</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Book Car</h2>
        
        <div style={styles.detailsContainer}>
          <div style={styles.detailItem}>
            <span style={styles.label}>Car Model:</span>
            <span style={styles.value}>{carDetails.model}</span>
          </div>
          
          <div style={styles.detailItem}>
            <span style={styles.label}>Registration No:</span>
            <span style={styles.value}>{carDetails.regNo}</span>
          </div>
          
          <div style={styles.detailItem}>
            <span style={styles.label}>Daily Rate:</span>
            <span style={styles.value}>${carDetails.rate}</span>
          </div>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Start Date:</label>
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.input}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>End Date:</label>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.input}
            min={startDate || new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div style={styles.buttonContainer}>
          <button 
            onClick={calculateTotalPrice}
            style={{
              ...styles.actionButton,
              backgroundColor: (!startDate || !endDate) ? "#cccccc" : "#007bff",
              cursor: (!startDate || !endDate) ? "not-allowed" : "pointer"
            }}
            disabled={!startDate || !endDate}
          >
            Calculate Total
          </button>
        </div>
        
        {totalPrice > 0 && (
          <div style={styles.totalPriceContainer}>
            <div style={styles.totalPriceText}>
              Total Price: <span style={styles.priceHighlight}>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={styles.daysText}>
              For {Math.round(totalPrice / carDetails.rate)} days
            </div>
          </div>
        )}
        
        <div style={styles.buttonGroup}>
          <button 
            onClick={() => navigate(`/cars/profile/${regNo}`)}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          <button 
            onClick={handleBooking}
            style={{
              ...styles.submitButton,
              backgroundColor: isSubmitting || totalPrice <= 0 ? "#cccccc" : "#28a745",
              cursor: isSubmitting || totalPrice <= 0 ? "not-allowed" : "pointer"
            }}
            disabled={isSubmitting || totalPrice <= 0}
          >
            {isSubmitting ? "Processing..." : "Book Now"}
          </button>
          
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
    maxWidth: "500px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333333",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
  },
  detailsContainer: {
    marginBottom: "20px",
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
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  buttonContainer: {
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  actionButton: {
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
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
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
  },
  totalPriceContainer: {
    backgroundColor: "#f0fff4",
    border: "1px solid #c6f6d5",
    borderRadius: "6px",
    padding: "15px",
    marginBottom: "20px",
  },
  totalPriceText: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  priceHighlight: {
    color: "#28a745",
  },
  daysText: {
    fontSize: "14px",
    color: "#666",
    marginTop: "5px",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  loadingText: {
    fontSize: "18px",
    color: "#666",
  },
  errorText: {
    fontSize: "18px",
    color: "#dc3545",
  }
};

export default BookCar;