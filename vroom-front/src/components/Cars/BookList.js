import React, { useEffect, useState } from 'react';
import { getCustomerBookings } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/userAtom';
const BookList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);

  useEffect(() => {
    fetchBookings();
  }, []);
  
  const fetchBookings = async () => {
    try {
      console.log(user);
      const response = await getCustomerBookings(user.uid);
      setBookings(response.data);
      setLoading(false);
    }
    catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  const handlePaymentClick = (bookingId, amount) => {
    // Navigate to the payment page with booking details
    navigate(`/booking-page/${bookingId}`);
  };
  
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading your booked cars...</div>
      </div>
    );
  }
  
  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerCard}>
        <h2 style={styles.title}>My Booked Cars</h2>
      </div>
      
      {bookings.length === 0 ? (
        <div style={styles.noBookingsContainer}>
          <p style={styles.noBookingsText}>You have not booked any cars yet.</p>
        </div>
      ) : (
        <div style={styles.bookingGrid}>
          {bookings.map((booking) => (
            <div key={booking.bid} style={styles.bookingCard}>
              <h3 style={styles.carTitle}>{booking.regNo}</h3>
              
              <div style={styles.detailsContainer}>
                <div style={styles.detailItem}>
                  <span style={styles.label}>From:</span>
                  <span style={styles.value}>{new Date(booking.fromDate).toLocaleDateString()}</span>
                </div>
                
                <div style={styles.detailItem}>
                  <span style={styles.label}>To:</span>
                  <span style={styles.value}>{new Date(booking.tillDate).toLocaleDateString()}</span>
                </div>
                
                <div style={styles.detailItem}>
                  <span style={styles.label}>Status:</span>
                  <span style={{
                    ...styles.value,
                    color: booking.status === "Active" ? "#28a745" : 
                          //  booking.status === "Pending" ? "#ffc107" : 
                           booking.status === "Cancelled" ? "#dc3545" : "#007bff"
                  }}>
                    {booking.status}
                  </span>
                </div>
                
                {booking.totalAmount && (
                  <div style={styles.detailItem}>
                    <span style={styles.label}>Amount:</span>
                    <span style={styles.value}>${booking.totalAmount}</span>
                  </div>
                )}
              </div>
              <button 
                  style={styles.paymentButton}
                  onClick={() => handlePaymentClick(booking.bid, booking.totalAmount)}
                >
                  Details
              </button>
            </div>
          ))}
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
    margin: "0",
  },
  bookingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  bookingCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  carTitle: {
    color: "#333333",
    marginTop: "0",
    marginBottom: "15px",
    padding: "0 0 10px 0",
    borderBottom: "1px solid #eee",
  },
  detailsContainer: {
    marginBottom: "15px",
  },
  detailItem: {
    display: "flex",
    padding: "8px 0",
  },
  label: {
    fontWeight: "bold",
    width: "40%",
    color: "#555",
  },
  value: {
    width: "60%",
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
  noBookingsContainer: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  noBookingsText: {
    fontSize: "18px",
    color: "#666",
  }
};

export default BookList;