import React, { useEffect, useState } from 'react';
import { getPaymentsByStatus, updatePayment } from '../../services/api'; 

function VerifyPayment() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        fetchPaymentsByStatus();
    }, []);
    
    const fetchPaymentsByStatus = async () => {
      try {
        const response = await getPaymentsByStatus("Pending");
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Failed to load payment history.');
        setLoading(false);
      }
    };
    
    const handleStatusUpdate = async (payment, newStatus) => {
      const updatedPayment = {
        ...payment,
        status: newStatus,
        paymentDate: new Date().toISOString().split('T')[0],
      };
    
      try {
        await updatePayment(payment.pid || payment.PID, updatedPayment);
        fetchPaymentsByStatus(); // Refresh list
      } catch (err) {
        console.error(`Error updating payment to ${newStatus}:`, err);
        setError(`Failed to mark payment as ${newStatus}.`);
      }
    };
    
    
    
    
  
    if (loading) {
      return (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingText}>Loading rentals...</div>
        </div>
      );
    }
  
    return (
      <div style={styles.pageContainer}>
        <div style={styles.headerCard}>
          <h2 style={styles.title}>Pending Payments</h2>
        </div>
    
        {error && <div style={styles.errorText}>{error}</div>}
    
        {payments.length === 0 ? (
          <div style={styles.noDataContainer}>
            <p style={styles.noDataText}>No payment records found.</p>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Transaction ID</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Method</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.PID}>
                    <td style={styles.td}>{payment.paymentDate}</td>
                    <td style={styles.td}>{payment.transactionID}</td>
                    <td style={styles.td}>${payment.amount}</td>
                    <td style={styles.td}>{payment.paymentMethod}</td>
                    <td
                      style={{
                        ...styles.td,
                        color:
                          payment.status === 'Paid'
                            ? '#28a745'
                            : payment.status === 'Pending'
                            ? '#ffc107'
                            : '#dc3545',
                      }}
                    >
                      {payment.status}
                    </td>
                    <td style={styles.td}>
                      {payment.payment_date}{' '}
                      {payment.status === 'Pending' && (
                              <>
                                <button
                                  type="button"
                                  style={styles.payButton}
                                  onClick={() => handleStatusUpdate(payment, 'Paid')}
                                >
                                  Verify
                                </button>
                                <button
                                  type="button"
                                  style={{ ...styles.payButton, backgroundColor: '#dc3545', marginLeft: '10px' }}
                                  onClick={() => handleStatusUpdate(payment, 'Failed')}
                                >
                                  Mark as Failed
                                </button>
                              </>
                            )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
      
  }   
  
  
  const styles = {
    pageContainer: {
      padding: '20px',
    },
    headerCard: {
      marginBottom: '20px',
      backgroundColor: '#f8f9fa',
      padding: '10px',
      borderRadius: '5px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    payButton: {
      marginLeft: '10px',
      padding: '5px 10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    loadingText: {
      fontSize: '18px',
      color: '#333',
    },
    errorText: {
      color: 'red',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    noDataContainer: {
      textAlign: 'center',
      padding: '20px',
    },
    noDataText: {
      fontSize: '16px',
      color: '#6c757d',
    },
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #ddd',
    },
    th: {
      padding: '10px',
      backgroundColor: '#f1f1f1',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    td: {
      padding: '8px',
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
    },
  };

export default VerifyPayment
