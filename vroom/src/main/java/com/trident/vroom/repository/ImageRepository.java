package com.trident.vroom.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.trident.vroom.model.Image;

@Repository
public class ImageRepository {
    private final JdbcTemplate jdbcTemplate;

    public ImageRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public void save(Image image) {
        String sql = "INSERT INTO carimages (regNo, name, type, data) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, image.getRegNo(), image.getName(), image.getType(), image.getData());
    }

    public Image findById(Long id) {
        String sql = "SELECT * FROM carimages WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToImage, id);
    }

    public List<Image> findAll() {
        String sql = "SELECT * FROM carimages";
        return jdbcTemplate.query(sql, this::mapRowToImage);
    }

    public List<Image> findAllbyRegNo(String regNo) {
        String sql = "SELECT * FROM carImages WHERE regNo = ?";
        return jdbcTemplate.query(sql, this::mapRowToImage, regNo);
    }
    

    public void update(Long id, Image image) {
        String sql = "UPDATE carimages SET name = ?, type = ?, data = ? WHERE id = ?";
        jdbcTemplate.update(sql, image.getName(), image.getType(), image.getData(), id);
    }

    public void delete(Long id) {
        String sql = "DELETE FROM carimages WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private Image mapRowToImage(ResultSet rs, int rowNum) throws SQLException {
        return new Image(
                rs.getLong("id"),
                rs.getString("regNo"),
                rs.getString("name"),
                rs.getString("type"),
                rs.getBytes("data")
        );
    }
}
