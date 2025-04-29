import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaymentById,updatePayment} from '../services/api'; 

const PaymentForm = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rentID: '',
    amount: '',
    paymentMethod: '',
    transactionID: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const generateTransactionID = () =>
    'TXN-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 10000).toString(36);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await getPaymentById(pid);
        const { rentID, amount } = res.data;
        setFormData((prev) => ({
          ...prev,
          rentID,
          amount,
          transactionID: generateTransactionID(),
        }));
      } catch (err) {
        console.error(err);
        setError('Failed to fetch payment info.');
      }
    };

    fetchPayment();
  }, [pid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPayment = {
      ...formData,
      status: 'Paid',
      paymentDate: new Date().toISOString().split('T')[0],
    };

    try {
      await updatePayment(pid, updatedPayment);
      setSuccess('Payment updated successfully!');
      setTimeout(() => navigate('/payment'), 1500);
    } catch (err) {
      console.error(err);
      setError('Failed to update payment.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Process Payment</h2>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <p><strong>Rent ID:</strong> {formData.rentID}</p>
        <p><strong>Amount:</strong> ${formData.amount}</p>
        <p><strong>Transaction ID:</strong> {formData.transactionID}</p>
        <p><strong>Date:</strong> {new Date().toISOString().split('T')[0]}</p>

        <label style={styles.label}>Payment Method:</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <button type="submit" style={styles.button}>Submit Payment</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '30px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    margin: '10px 0 5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginBottom: '10px',
  },
};

export default PaymentForm;
