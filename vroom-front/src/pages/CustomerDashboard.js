import React, { useState } from 'react';
import CarListAvailable from '../components/Cars/CarListAvailable';
import BookList from '../components/Cars/BookList';
import Payment from './Payment';

const CustomerDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('availableCars');

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      
      {/* Orange Navbar for Options */}
      <div style={styles.orangeNavbar}>
        <button style={styles.navButton} onClick={() => handleMenuClick('availableCars')}>Available Cars</button>
        <button style={styles.navButton} onClick={() => handleMenuClick('bookedCars')}>Booked Cars</button>
        <button style={styles.navButton} onClick={() => handleMenuClick('mypayments')}>Payments</button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {selectedOption === 'availableCars' && <CarListAvailable />}
        {selectedOption === 'bookedCars' && <BookList/>}
        {selectedOption === 'mypayments' && <Payment />}
      </div>
    </div>
  );
};

const styles = {
  topNavbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    padding: '10px 20px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  searchBar: {
    flexGrow: 1,
    margin: '0 20px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  topRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  topButton: {
    background: 'none',
    border: '1px solid orange',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  sellButton: {
    backgroundColor: 'white',
    border: '1px solid orange',
    padding: '8px 15px',
    borderRadius: '20px',
    color: 'orange',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
  },
  callUs: {
    textAlign: 'right',
    fontSize: '12px',
    color: 'orange',
  },
  orangeNavbar: {
    backgroundColor: '#F26522',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
    gap: '30px',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
  },
  content: {
    padding: '20px',
  },
};

export default CustomerDashboard;
