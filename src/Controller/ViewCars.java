package Controller;

import Model.Database;
import Model.Operation;
import Model.User;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ViewCars implements Operation {
    @Override
    public void operation(Database database, JFrame f, User user) {
        JFrame frame = new JFrame("View All Cars");
        frame.setSize(800, 600);
        frame.setLocationRelativeTo(f);
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        // Table model to hold the data
        DefaultTableModel tableModel = new DefaultTableModel();
        tableModel.addColumn("ID");
        tableModel.addColumn("Brand");
        tableModel.addColumn("Model");
        tableModel.addColumn("Color");
        tableModel.addColumn("Year");
        tableModel.addColumn("Price per Hour");
        tableModel.addColumn("Available");

        // Fetch data from the `cars` table
        try {
            ResultSet rs = database.getStatement().executeQuery("SELECT * FROM `cars`");
            while (rs.next()) {
                int id = rs.getInt("carid");
                String brand = rs.getString("Brand");
                String model = rs.getString("Model");
                String color = rs.getString("Color");
                int year = rs.getInt("Year");
                double price = rs.getDouble("Price");
                int available = rs.getInt("Available");

                tableModel.addRow(new Object[]{id, brand, model, color, year, price, available});
            }
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(frame, "Error fetching data: " + e.getMessage());
            return;
        }

        // JTable to display the data
        JTable table = new JTable(tableModel);
        JScrollPane scrollPane = new JScrollPane(table);
        frame.add(scrollPane);

        frame.setVisible(true);
    }
}
