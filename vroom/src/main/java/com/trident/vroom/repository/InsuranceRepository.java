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
            rs.getString("providerName"),
            rs.getString("policyNumber"),
            rs.getDouble("coverageAmount"),
            rs.getDate("startDate"),
            rs.getDate("endDate")
    );

    // Insert Insurance
    public void saveInsurance(Insurance insurance) {
        String sql = "INSERT INTO insurances (regNo, providerName, policyNumber, coverageAmount, startDate, endDate) " +
                     "VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, insurance.getRegNo(), insurance.getProviderName(), insurance.getPolicyNumber(),
                insurance.getCoverageAmount(), insurance.getStartDate(), insurance.getEndDate());
    }

    // Get All Insurances
    public List<Insurance> getAllInsurances() {
        String sql = "SELECT * FROM insurances";
        return jdbcTemplate.query(sql, rowMapper);
    }

    // Get Insurance by ID
    public Insurance getInsuranceById(int id) {
        String sql = "SELECT * FROM insurances WHERE IID = ?";
        List<Insurance> result = jdbcTemplate.query(sql, rowMapper, id);
        return result.isEmpty() ? null : result.get(0);
    }

    // Update Insurance
    public void updateInsurance(int id, Insurance insurance) {
        String sql = "UPDATE insurances SET regNo = ?, providerName = ?, policyNumber = ?, coverageAmount = ?, startDate = ?, endDate = ? " +
                     "WHERE IID = ?";
        jdbcTemplate.update(sql, insurance.getRegNo(), insurance.getProviderName(), insurance.getPolicyNumber(),
                insurance.getCoverageAmount(), insurance.getStartDate(), insurance.getEndDate(), id);
    }

    // Delete Insurance
    public void deleteInsurance(int id) {
        String sql = "DELETE FROM insurances WHERE IID = ?";
        jdbcTemplate.update(sql, id);
    }

    // Get Insurance by regNo
    public List<Insurance> getInsurancesByRegNo(String regNo) {
        String sql = "SELECT * FROM insurances WHERE regNo = ?";
        return jdbcTemplate.query(sql, rowMapper, regNo);
    }

    // Get Insurance active in a given date
    public List<Insurance> getInsurancesActiveOnDate(String regNo, Date date) {
        String sql = "SELECT * FROM insurances WHERE regNo = ? AND startDate <= ? AND endDate >= ?";
        return jdbcTemplate.query(sql, rowMapper, regNo, date, date);
    }
}
