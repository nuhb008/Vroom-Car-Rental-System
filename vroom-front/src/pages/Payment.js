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
      const response = await axios.get('/api/payments'); // adjust the endpoint if needed
      setPayments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading payments...</p>;
  }

  return (
    <div>
      <h2>My Payments</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Registration No</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.PID}>
              <td>{payment.BID}</td>
              <td>{payment.regNo}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.payment_date}</td>
              <td>{payment.payment_method}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  }
};

export default Payment;
