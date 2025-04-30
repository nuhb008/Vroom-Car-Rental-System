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
        rs.getObject("customer_id", Integer.class),
        rs.getDouble("totalAmount"),
        rs.getString("status")
    );

    // Insert Rental
    public void saveRental(Rental rental) {
        String sql = "INSERT INTO rental (BID, customer_id, totalAmount, status) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, rental.getBID(), rental.getCustomerId(), rental.getTotalAmount(), rental.getStatus());
    }

    // Get all Rentals
    public List<Rental> getAllRentals() {
        String sql = "SELECT * FROM rental";
        return jdbcTemplate.query(sql, rowMapper);
    }

    // Get Rental by ID
    public Rental getRentalById(int id) {
        String sql = "SELECT * FROM rental WHERE rentID = ?";
        List<Rental> rentals = jdbcTemplate.query(sql, rowMapper, id);
        return rentals.isEmpty() ? null : rentals.get(0);
    }

    // Get Rental by BID
    public Rental getRentalByBID(int bid) {
        String sql = "SELECT * FROM rental WHERE BID = ?";
        List<Rental> rentals = jdbcTemplate.query(sql, rowMapper, bid);
        return rentals.isEmpty() ? null : rentals.get(0);
    }

    // Update Rental
    public void updateRental(int id, Rental rental) {
        String sql = "UPDATE rental SET BID = ?, customer_id = ?, totalAmount = ?, status = ? WHERE rentID = ?";
        jdbcTemplate.update(sql, rental.getBID(), rental.getCustomerId(), rental.getTotalAmount(), rental.getStatus(), id);
    }

    // Delete Rental
    public void deleteRental(int id) {
        String sql = "DELETE FROM rental WHERE rentID = ?";
        jdbcTemplate.update(sql, id);
    }

    // Get Rentals by status
    public List<Rental> getRentalsByStatus(String status) {
        String sql = "SELECT * FROM rental WHERE status = ?";
        return jdbcTemplate.query(sql, rowMapper, status);
    }

    // Get Rentals by customer ID
    public List<Rental> getRentalsByCustomerId(int customerId) {
        String sql = "SELECT * FROM rental WHERE customer_id = ?";
        return jdbcTemplate.query(sql, rowMapper, customerId);
    }
    
    // Update Rental BID
    public Rental updateCustomerIdByBid(int bid, int customerId) {
        String sql = "UPDATE rental SET customer_id = ? WHERE BID = ?";
        int rows = jdbcTemplate.update(sql, customerId, bid);
        if (rows > 0) {
            return getRentalByBID(bid); // Or just return a new Rental with updated values
        }
        return null;
    }    

    // Get Rental Remain by BID
    public Rental getRentalRemainByBID(int bid) {
        String sql = "CALL GetRentalWithRemainingByBID(?)";
        List<Rental> rentals = jdbcTemplate.query(sql, rowMapper, bid);
        return rentals.isEmpty() ? null : rentals.get(0);
    }

}
