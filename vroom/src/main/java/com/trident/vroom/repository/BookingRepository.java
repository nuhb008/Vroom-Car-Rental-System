package com.trident.vroom.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.trident.vroom.model.Booking;

@Repository
public class BookingRepository {
    private final JdbcTemplate jdbcTemplate;
    public BookingRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    private final RowMapper<Booking> rowMapper = (rs, rowNum) -> new Booking(
            rs.getInt("BID"),
            rs.getString("regNo"),
            rs.getDate("fromDate"),
            rs.getDate("tillDate")
    );

    // Insert Booking
    public void saveBooking(Booking booking) {
        String sql = "INSERT INTO booking (regNo, fromDate, tillDate) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, booking.getRegNo(), booking.getFromDate(), booking.getTillDate());
    }

    // Get All Bookings
    public List<Booking> getAllBookings() {
        String sql = "SELECT * FROM booking";
        return jdbcTemplate.query(sql, rowMapper);
    }

    //Get booking by customer ID
    public List<Booking> getBookingsByCustomerId(int customerId) {
        String sql = "CALL GetBookingsByCustomerId(?);";
        return jdbcTemplate.query(sql, rowMapper, customerId);
    }

    // Get Booking by ID
    public Booking getBookingById(int id) {
        String sql = "SELECT * FROM booking WHERE BID = ?";
        List<Booking> bookings = jdbcTemplate.query(sql, rowMapper, id);
        return bookings.isEmpty() ? null : bookings.get(0);
    }

    // Update Booking
    public void updateBooking(int id, Booking booking) {
        String sql = "UPDATE booking SET regNo = ?, fromDate = ?, tillDate = ? WHERE BID = ?";
        jdbcTemplate.update(sql, booking.getRegNo(), booking.getFromDate(), booking.getTillDate(), id);
    }

    // Delete Booking
    public void deleteBooking(int id) {
        String sql = "DELETE FROM booking WHERE BID = ?";
        jdbcTemplate.update(sql, id);
    }

    // Get Booking by regNo
    public List<Booking> getBookingsByRegNo(String regNo) {
        String sql = "SELECT * FROM booking WHERE regNo = ?";
        return jdbcTemplate.query(sql, rowMapper, regNo);
    }

    // Get Booking by Date Range
    public List<Booking> getBookingsByDateRange(String regNo, java.sql.Date fromDate, java.sql.Date tillDate) {
        String sql = "SELECT * FROM booking WHERE regNo = ? AND fromDate >= ? AND tillDate <= ?";
        return jdbcTemplate.query(sql, rowMapper, regNo, fromDate, tillDate);
    }
}
