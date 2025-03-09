package Controller;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.swing.BorderFactory;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

import Model.*;

public class Main {

    private static Database database;

    public static void main(String[] args) {
        database = new Database();
        start();
    }

    public static void start() {
        JFrame frame = new JFrame("Login");
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.setSize(600, 330);
        frame.setLocationRelativeTo(null);
        frame.getContentPane().setBackground(new Color(250, 206, 27));
        frame.setLayout(new BorderLayout());

        JLabel title = new JLabel("Welcome to Car Rental System", 35);
        title.setBorder(BorderFactory.createEmptyBorder(20, 0, 0, 0));
        frame.add(title, BorderLayout.NORTH);

        JPanel panel = new JPanel(new GridLayout(3, 2, 15, 15));
        panel.setBackground(null);
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        panel.add(new JLabel("Username:", 22));

        JTextField email = new JTextField(22);
        panel.add(email);

        panel.add(new JLabel("Password:", 22));

        JPasswordField password = new JPasswordField(22);
        panel.add(password);

        JButton createAcc = new JButton("Create New Account", 22);
        createAcc.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new AddNewAccount(0).operation(database, frame, null);
                frame.dispose();
            }
        });
        panel.add(createAcc);

        JButton login = new JButton("Login", 22);
        login.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String userEmail = email.getText();
                String userPassword = new String(password.getPassword()); // Secure way to get password

                if (userEmail.isEmpty() || userPassword.isEmpty()) {
                    JOptionPane.showMessageDialog(frame, "Email or Password cannot be empty");
                    return;
                }

                try {
                    String query = "SELECT * FROM users WHERE Email = ? LIMIT 1;";
                    PreparedStatement pstmt = database.getConnection().prepareStatement(query);
                    pstmt.setString(1, userEmail);

                    ResultSet rs = pstmt.executeQuery();

                    if (rs.next()) {
                        String storedPassword = rs.getString("Password"); // Insecure: Store hashed passwords!

                        // Password Validation (if using plain text)
                        if (storedPassword.equals(userPassword)) {
                            int userType = rs.getInt("Type");
                            User user = (userType == 0) ? new Client() : new Admin();

                            user.setID(rs.getString("userid"));
                            user.setFirstName(rs.getString("FirstName"));
                            user.setLastName(rs.getString("LastName"));
                            user.setEmail(userEmail);
                            user.setPhoneNumber(rs.getString("PhoneNumber"));
                            user.setPassword(storedPassword);

                            user.showList(database, frame);
                            frame.dispose();
                        } else {
                            JOptionPane.showMessageDialog(frame, "Incorrect Password");
                        }
                    } else {
                        JOptionPane.showMessageDialog(frame, "User not found");
                    }
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
        });
        panel.add(login);

        frame.add(panel, BorderLayout.CENTER);
        frame.setVisible(true);
    }

}

