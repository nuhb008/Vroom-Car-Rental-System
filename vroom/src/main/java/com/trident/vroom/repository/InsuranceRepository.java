package com.trident.vroom.repository;

import com.trident.vroom.model.Insurance;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public class InsuranceRepository {
    private final JdbcTemplate jdbcTemplate;

    public InsuranceRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Insurance> rowMapper = (rs, rowNum) -> new Insurance(
            rs.getInt("IID"),
            rs.getString("regNo"),
            rs.getString("provider_name"),  // Fixed column name to match DB schema
            rs.getString("policy_number"),  // Fixed column name to match DB schema
            rs.getDouble("coverage_amount"), // Fixed column name to match DB schema
            rs.getDate("start_date"),       // Fixed column name to match DB schema
            rs.getDate("end_date"),         // Fixed column name to match DB schema
            rs.getString("status")
    );

    // Insert Insurance
    public void saveInsurance(Insurance insurance) {
        String sql = "INSERT INTO insurance (regNo, provider_name, policy_number, coverage_amount, start_date, end_date, status) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        // Default to 'Invalid' if status is null (matching the DB schema default)
        String status = insurance.getStatus();
        if (status == null) {
            status = "Invalid";
        }
        
        jdbcTemplate.update(sql, 
            insurance.getRegNo(), 
            insurance.getProviderName(), 
            insurance.getPolicyNumber(),
            insurance.getCoverageAmount(), 
            insurance.getStartDate(), 
            insurance.getEndDate(),
            status
        );
    }

    // Get All Insurances
    public List<Insurance> getAllInsurances() {
        String sql = "SELECT * FROM insurance";
        return jdbcTemplate.query(sql, rowMapper);
    }

    // Get Insurance by ID
    public Insurance getInsuranceById(int id) {
        String sql = "SELECT * FROM insurance WHERE IID = ?";
        List<Insurance> result = jdbcTemplate.query(sql, rowMapper, id);
        return result.isEmpty() ? null : result.get(0);
    }

    // Update Insurance
    public void updateInsurance(int id, Insurance insurance) {
        String sql = "UPDATE insurance SET regNo = ?, provider_name = ?, policy_number = ?, " +
                     "coverage_amount = ?, start_date = ?, end_date = ?, status = ? " +
                     "WHERE IID = ?";
        
        jdbcTemplate.update(sql, 
            insurance.getRegNo(), 
            insurance.getProviderName(), 
            insurance.getPolicyNumber(),
            insurance.getCoverageAmount(), 
            insurance.getStartDate(), 
            insurance.getEndDate(), 
            insurance.getStatus(),
            id
        );
    }

    // Delete Insurance
    public void deleteInsurance(int id) {
        String sql = "DELETE FROM insurance WHERE IID = ?";
        jdbcTemplate.update(sql, id);
    }

    // Get Insurance by regNo
    public List<Insurance> getInsurancesByRegNo(String regNo) {
        String sql = "SELECT * FROM insurance WHERE regNo = ?";
        return jdbcTemplate.query(sql, rowMapper, regNo);
    }

    // Get Insurance active in a given date
    public List<Insurance> getInsurancesActiveOnDate(String regNo, Date date) {
        String sql = "SELECT * FROM insurance WHERE regNo = ? AND start_date <= ? AND end_date >= ?";
        return jdbcTemplate.query(sql, rowMapper, regNo, date, date);
    }

    // Get Insurance by status
    public List<Insurance> getInsurancesByStatus(String status) {
        String sql = "SELECT * FROM insurance WHERE status = ?";
        return jdbcTemplate.query(sql, rowMapper, status);
    }
    
    // New method to get count of active insurances for a car
    public int countActiveInsurancesForCar(String regNo, Date currentDate) {
        String sql = "SELECT COUNT(*) FROM insurance WHERE regNo = ? AND start_date <= ? AND end_date >= ? AND status = 'Valid'";
        return jdbcTemplate.queryForObject(sql, Integer.class, regNo, currentDate, currentDate);
    }
    
    // New method to update insurance status
    public void updateInsuranceStatus(int id, String status) {
        String sql = "UPDATE insurance SET status = ? WHERE IID = ?";
        jdbcTemplate.update(sql, status, id);
    }

    public int approveInsurance(int id) {
        String sql = "UPDATE insurance SET status = 'Valid' WHERE IID = ? AND status = 'Invalid'";
        return jdbcTemplate.update(sql, id);
    }
    
} 