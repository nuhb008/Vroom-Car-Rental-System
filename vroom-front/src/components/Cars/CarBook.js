import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../../services/api'; // adjust the path if needed

const CarBook = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchBookings();
  }, []); // dependency on user.id

  const fetchBookings = async () => {
    try {
    const response = await getAllBookings();
    setBookings(response.data);
    setLoading(false);
    }
    catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div>Loading your booked cars...</div>;
  }

  return (
    <div>
      <h2>My Booked Cars</h2>
      {bookings.length === 0 ? (
        <p>You have not booked any cars yet.</p>
      ) : (
        <div style={styles.bookingList}>
          {bookings.map((booking) => (
            <div key={booking.bid} style={styles.bookingCard}>
              <h3>{booking.regNo}</h3>
              <p><strong>Booking Date:</strong> {booking.fromDate} ~ {booking.tillDate}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              {/* You can add more booking details if available */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  bookingList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
  },
  bookingCard: {
    width: '250px',
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
};

export default CarBook;
