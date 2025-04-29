package com.trident.vroom.repository;

import com.trident.vroom.model.Rental;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RentalRepository {

    private final JdbcTemplate jdbcTemplate;

    public RentalRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Rental> rowMapper = (rs, rowNum) -> new Rental(
        rs.getInt("rentID"),
        rs.getObject("BID", Integer.class),
        rs.getObject("customerId", Integer.class),
        rs.getDouble("totalAmount"),
        rs.getString("status")
    );

    // Insert Rental
    public void saveRental(Rental rental) {
        String sql = "INSERT INTO rentals (BID, customerId, totalAmount, status) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, rental.getBID(), rental.getCustomerId(), rental.getTotalAmount(), rental.getStatus());
    }

    // Get all Rentals
    public List<Rental> getAllRentals() {
        String sql = "SELECT * FROM rentals";
        return jdbcTemplate.query(sql, rowMapper);
    }

    // Get Rental by ID
    public Rental getRentalById(int id) {
        String sql = "SELECT * FROM rentals WHERE rentID = ?";
        List<Rental> rentals = jdbcTemplate.query(sql, rowMapper, id);
        return rentals.isEmpty() ? null : rentals.get(0);
    }

    // Update Rental
    public void updateRental(int id, Rental rental) {
        String sql = "UPDATE rentals SET BID = ?, customerId = ?, totalAmount = ?, status = ? WHERE rentID = ?";
        jdbcTemplate.update(sql, rental.getBID(), rental.getCustomerId(), rental.getTotalAmount(), rental.getStatus(), id);
    }

    // Delete Rental
    public void deleteRental(int id) {
        String sql = "DELETE FROM rentals WHERE rentID = ?";
        jdbcTemplate.update(sql, id);
    }

    // Get Rentals by status
    public List<Rental> getRentalsByStatus(String status) {
        String sql = "SELECT * FROM rentals WHERE status = ?";
        return jdbcTemplate.query(sql, rowMapper, status);
    }

    // Get Rentals by customer ID
    public List<Rental> getRentalsByCustomerId(int customerId) {
        String sql = "SELECT * FROM rentals WHERE customerId = ?";
        return jdbcTemplate.query(sql, rowMapper, customerId);
    }
}
