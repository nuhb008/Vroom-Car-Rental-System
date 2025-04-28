import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../../services/api'; // adjust the path if needed

const CarBook = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user')); // get logged-in user

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllBookings();
        const allBookings = response.data;

        // Filter bookings that belong to the current logged-in user
        const customerBookings = allBookings.filter(
          (booking) => booking.customerId === user.id
          // OR if you use email to match: booking.customerEmail === user.email
        );

        setBookings(customerBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id]); // dependency on user.id

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
            <div key={booking.id} style={styles.bookingCard}>
              <h3>{booking.carName}</h3>
              <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
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
