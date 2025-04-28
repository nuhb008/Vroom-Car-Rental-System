import React, { useState } from 'react';
import CarList from '../components/Cars/CarList';

const OwnerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddCarForm, setShowAddCarForm] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (option) => {
    if (option === 'addCar') {
      setShowAddCarForm(true);
    }
    setIsSidebarOpen(false); 
  };

  const closeForm = () => {
    setShowAddCarForm(false);
  };

  return (
    <div style={styles.dashboard}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <button onClick={toggleSidebar} style={styles.hamburger}>
          &#9776;
        </button>
        <h1 style={styles.title}>Owner Dashboard</h1>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div style={styles.sidebar}>
          <h3>Menu</h3>
          <button style={styles.menuButton} onClick={() => handleMenuClick('addCar')}>Add a Car</button>
          <button style={styles.menuButton} onClick={() => alert('View Cars clicked!')}>View My Cars</button>
          {/* Add more options here */}
        </div>
      )}

      {/* Main Content */}
      <div style={styles.content}>
        {!showAddCarForm ? (
          <CarList />
        ) : (
          <div style={styles.formContainer}>
            <h2>Add New Car</h2>
            {/* Add Car Form */}
            <form>
              <div style={styles.inputGroup}>
                <label>Model:</label>
                <input type="text" placeholder="Enter model" />
              </div>
              <div style={styles.inputGroup}>
                <label>Registration No:</label>
                <input type="text" placeholder="Enter registration number" />
              </div>
              <div style={styles.inputGroup}>
                <label>Fuel Type:</label>
                <select>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <button type="submit" style={styles.submitButton}>Submit</button>
              <button type="button" style={styles.closeButton} onClick={closeForm}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    position: 'relative',
    minHeight: '100vh',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
  },
  hamburger: {
    fontSize: '24px',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    marginRight: '20px',
  },
  title: {
    margin: 0,
  },
  sidebar: {
    position: 'absolute',
    top: '60px',
    left: 0,
    width: '200px',
    backgroundColor: '#f8f9fa',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
    padding: '20px',
    zIndex: 10,
  },
  menuButton: {
    display: 'block',
    width: '100%',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  content: {
    marginTop: '20px',
    padding: '20px',
  },
  formContainer: {
    backgroundColor: '#f1f1f1',
    padding: '20px',
    borderRadius: '10px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default OwnerDashboard;
