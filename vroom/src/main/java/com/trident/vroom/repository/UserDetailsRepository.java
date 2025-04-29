package com.trident.vroom.repository;

import com.trident.vroom.model.UserDetails;

import org.springframework.dao.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserDetailsRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserDetailsRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper to convert SQL ResultSet into UserDetails object
    private final RowMapper<UserDetails> rowMapper = (rs, rowNum) -> new UserDetails(
            rs.getInt("UID"),
            rs.getString("fullName"),
            rs.getString("address"),
            rs.getString("contact"),
            rs.getString("driver_license_number") // Matches SQL column name
    );

    public Optional<UserDetails> findByUID(int UID) {
        String sql = "SELECT * FROM userDetails WHERE UID = ?";
        List<UserDetails> details = jdbcTemplate.query(sql, rowMapper, UID);
        return details.stream().findFirst();
    }

    
    public void saveUserDetails(UserDetails userDetails) {
        try {
            
            String checkUserSql = "SELECT COUNT(*) FROM users WHERE UID = ?";
            Integer count = jdbcTemplate.queryForObject(checkUserSql, Integer.class, userDetails.getUID());

            if (count == null || count == 0) {
                
                throw new DataIntegrityViolationException("Error: UID " + userDetails.getUID() + userDetails.getAddress() + " does not exist in users table.");
            }

            String sql = "INSERT INTO userDetails (UID, fullName, address, contact, driver_license_number) VALUES (?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, userDetails.getUID(), userDetails.getFullName(), userDetails.getAddress(),
                    userDetails.getContact(), userDetails.getDriverLicenseNumber());
        } catch (DuplicateKeyException e) {
            throw new DataIntegrityViolationException("Driving License Number " + userDetails.getDriverLicenseNumber() + " already exists.");
        }
    }

   
    public void updateUserDetails(UserDetails userDetails) {
        String sql = "UPDATE userDetails SET fullName = ?, address = ?, contact = ?, driver_license_number = ? WHERE UID = ?";
        jdbcTemplate.update(sql, userDetails.getFullName(), userDetails.getAddress(), userDetails.getContact(),
                userDetails.getDriverLicenseNumber(), userDetails.getUID());
    }

   
    public void deleteUserDetails(int UID) {
        String sql = "DELETE FROM userDetails WHERE UID = ?";
        jdbcTemplate.update(sql, UID);
    }
}
