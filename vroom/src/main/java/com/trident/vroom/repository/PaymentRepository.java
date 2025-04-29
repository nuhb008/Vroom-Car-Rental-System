package com.trident.vroom.repository;

import com.trident.vroom.model.Payment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public class PaymentRepository {

    private final JdbcTemplate jdbcTemplate;

    public PaymentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Payment> rowMapper = (rs, rowNum) -> new Payment(
            rs.getInt("PID"),
            rs.getInt("rentID"),
            rs.getDouble("amount"),
            rs.getDate("payment_date"),
            rs.getString("payment_method"),
            rs.getString("status"),
            rs.getString("transactionID")
    );

    // Insert Payment
    public void savePayment(Payment payment) {
        String sql = "INSERT INTO payment (rentID, amount, payment_date, payment_method, status, transactionID) " +
                     "VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                payment.getRentID(),
                payment.getAmount(),
                payment.getPaymentDate(),
                payment.getPaymentMethod(),
                payment.getStatus(),
                payment.getTransactionID());
    }

    // Get All Payments
    public List<Payment> getAllPayments() {
        String sql = "SELECT * FROM payment";
        return jdbcTemplate.query(sql, rowMapper);
    }

    // Get Payment by ID
    public Payment getPaymentById(int id) {
        String sql = "SELECT * FROM payment WHERE PID = ?";
        List<Payment> payments = jdbcTemplate.query(sql, rowMapper, id);
        return payments.isEmpty() ? null : payments.get(0);
    }

    // Update Payment
    public void updatePayment(int id, Payment payment) {
        String sql = "UPDATE payment SET rentID = ?, amount = ?, payment_date = ?, " +
                     "payment_method = ?, status = ?, transactionID = ? WHERE PID = ?";
        jdbcTemplate.update(sql,
                payment.getRentID(),
                payment.getAmount(),
                payment.getPaymentDate(),
                payment.getPaymentMethod(),
                payment.getStatus(),
                payment.getTransactionID(),
                id);
    }

    // Delete Payment
    public void deletePayment(int id) {
        String sql = "DELETE FROM payment WHERE PID = ?";
        jdbcTemplate.update(sql, id);
    }

    // Get Payments by Rent ID
    public List<Payment> getPaymentsByRentId(int rentId) {
        String sql = "SELECT * FROM payment WHERE rentID = ?";
        return jdbcTemplate.query(sql, rowMapper, rentId);
    }

    // Get Payments by Date Range
    public List<Payment> getPaymentsByDateRange(Date startDate, Date endDate) {
        String sql = "SELECT * FROM payment WHERE payment_date BETWEEN ? AND ?";
        return jdbcTemplate.query(sql, rowMapper, startDate, endDate);
    }

    // Get Payments by Status
    public List<Payment> getPaymentsByStatus(String status) {
        String sql = "SELECT * FROM payment WHERE status = ?";
        return jdbcTemplate.query(sql, rowMapper, status);
    }

    public double getTotalPaymentAmount() {
        String sql = "SELECT SUM(amount) FROM payment";
        Double total = jdbcTemplate.queryForObject(sql, Double.class);
        return total != null ? total : 0.0;
    }

    public double getTotalPaymentAmountByRentId(int rentId) {
        String sql = "SELECT SUM(amount) FROM payment WHERE rentID = ?";
        Double total = jdbcTemplate.queryForObject(sql, Double.class, rentId);
        return total != null ? total : 0.0;
    }
}
