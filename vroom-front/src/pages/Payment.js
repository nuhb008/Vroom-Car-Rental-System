import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchPayments();
  }, []);
  
  const fetchPayments = async () => {
    try {
      const response = await axios.get('/api/payments');
      setPayments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading payments...</div>
      </div>
    );
  }
  
  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerCard}>
        <h2 style={styles.title}>My Payments</h2>
      </div>
      
      {payments.length === 0 ? (
        <div style={styles.noDataContainer}>
          <p style={styles.noDataText}>No payment records found.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Booking ID</th>
                <th style={styles.th}>Registration No</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Payment Date</th>
                <th style={styles.th}>Payment Method</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.PID}>
                  <td style={styles.td}>{payment.BID}</td>
                  <td style={styles.td}>{payment.regNo}</td>
                  <td style={styles.td}>${payment.amount.toFixed(2)}</td>
                  <td style={styles.td}>{new Date(payment.payment_date).toLocaleDateString()}</td>
                  <td style={styles.td}>{payment.payment_method}</td>
                  <td style={{
                    ...styles.td,
                    color: payment.status === "Completed" ? "#28a745" : 
                           payment.status === "Pending" ? "#ffc107" : 
                           payment.status === "Failed" ? "#dc3545" : "#007bff"
                  }}>
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  tableContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "15px",
    borderBottom: "2px solid #e9ecef",
    color: "#495057",
    fontWeight: "600",
  },
  td: {
    padding: "15px",
    borderBottom: "1px solid #e9ecef",
    color: "#212529",
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
  noDataContainer: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  noDataText: {
    fontSize: "18px",
    color: "#666",
  }
};

export default Payment;