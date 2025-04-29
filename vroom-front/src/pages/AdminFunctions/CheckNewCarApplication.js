import React, { useEffect, useState } from 'react';
import { getAllCars, updateCar } from '../../services/api'; // Make sure the path is correct

function CheckNewCarApplication() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await getAllCars();
      const maintenanceCars = res.data.filter(
        (car) => car.status === 'Maintenance'
      );
      setCars(maintenanceCars);
    } catch (err) {
      console.error('Error fetching cars:', err);
    }
  };

  const verifyCar = async (car) => {
    try {
      const updatedCar = { ...car, status: 'Available' };
      await updateCar(car.regNo, updatedCar);
      fetchCars(); // Refresh list
    } catch (err) {
      console.error('Error verifying car:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Check Car Maintenance</h2>
      {cars.length === 0 ? (
        <p>No cars under maintenance.</p>
      ) : (
        cars.map((car) => (
          <div key={car.regNo} style={styles.card}>
            <div style={styles.detailsContainer}>
              <div style={styles.detailItem}>
                <span style={styles.label}>Reg No:</span>
                <span style={styles.value}>{car.regNo}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Model:</span>
                <span style={styles.value}>{car.model}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Capacity:</span>
                <span style={styles.value}>{car.capacity}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Rate:</span>
                <span style={styles.value}>${car.rate}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Fuel Type:</span>
                <span style={styles.value}>{car.fuelType}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>Status:</span>
                <span style={styles.value}>{car.status}</span>
              </div>
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.submitButton} onClick={() => verifyCar(car)}>
                Verify
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CheckNewCarApplication;



const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '90vh',
    backgroundColor: '#f8f9fa',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333333',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
  },
  detailsContainer: {
    marginBottom: '20px',
  },
  detailItem: {
    display: 'flex',
    borderBottom: '1px solid #f0f0f0',
    padding: '12px 0',
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
    color: '#555',
  },
  value: {
    width: '60%',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    display: 'block',
    marginBottom: '10px',
  },
};

