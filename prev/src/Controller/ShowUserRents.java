package Controller;

import java.awt.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.swing.*;

import Model.*;
import Model.JLabel;
import Model.JTable;
import Model.JTextField;

public class ShowUserRents implements Operation {
    private String userID;
    private String name;
    private String email;
    private String phone;

    public ShowUserRents(String userID) {
        this.userID = userID;
    }
    @Override
    public void operation(Database database, JFrame f, User user) {
        if (userID=="-9999") userID = user.getID();

        JFrame frame = new JFrame("Rents");
        frame.setSize(1200, 600);
        frame.setLocationRelativeTo(f);
        frame.getContentPane().setBackground(new Color(250, 206, 27));
        frame.setLayout(new BorderLayout());
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        JLabel title = new JLabel("Rents", 35);
        title.setBorder(BorderFactory.createEmptyBorder(20, 0, 0, 0));
        frame.add(title, BorderLayout.NORTH);

        String[] header = new String[] {
                "Rent",
                "Car", "Date Time",
                "Hours", "Total", "Status"
        };

        ArrayList<Rent> rents = new ArrayList<>();
        ArrayList<Integer> carIDs = new ArrayList<>();
        try {
            String select = "SELECT * FROM `rents` WHERE `User` = '"+userID+"';";
            ResultSet rs = database.getStatement().executeQuery(select);
            while (rs.next()) {
                Rent rent = new Rent();
                rent.setID(rs.getInt("ID"));
                carIDs.add(rs.getInt("Car"));
                rent.setDateTime(rs.getString("DateTime"));
                rent.setHours(rs.getInt("Hours"));
                rent.setTotal(rs.getDouble("Total"));
                rent.setStatus(rs.getInt("Status"));
                rents.add(rent);
            }

            String selectUser = "SELECT * FROM `users` WHERE `userid` = '"+userID+"';";
            ResultSet rs2 = database.getStatement().executeQuery(selectUser);
            rs2.next();
            User u = new Client();
            u.setID(rs2.getString("userid"));
            u.setFirstName(rs2.getString("FirstName"));
            u.setLastName(rs2.getString("LastName"));
            u.setEmail(rs2.getString("Email"));
            u.setPhoneNumber(rs2.getString("PhoneNumber"));
            u.setPassword(rs2.getString("Password"));

            name = u.getLastName()+ ", "+ u.getFirstName();
            email = u.getEmail();
            phone = u.getPhoneNumber();

            for (int j=0;j<rents.size();j++) {
                Rent r = rents.get(j);
                r.setUser(u);
                ResultSet rs3 = database.getStatement()
                        .executeQuery("SELECT * FROM `cars` WHERE `carid` = '"+carIDs.get(j)+"';");
                rs3.next();
                Car car = new Car();
                car.setID(rs3.getInt("carid"));
                car.setBrand(rs3.getString("Brand"));
                car.setModel(rs3.getString("Model"));
                car.setColor(rs3.getString("Color"));
                car.setYear(rs3.getInt("Year"));
                car.setPrice(rs3.getDouble("Price"));
                car.setAvailable(rs3.getInt("Available"));
                r.setCar(car);
            }

        } catch (SQLException e) {
            JOptionPane.showMessageDialog(frame, e.getMessage());
            frame.dispose();
        }

        String[][] rentsData = new String[rents.size()][6];
        for (int j=0;j<rents.size();j++) {
            Rent r = rents.get(j);
            rentsData[j][0] = String.valueOf(r.getID());
            rentsData[j][1] = r.getCar().getBrand()+" "+r.getCar().getModel()+" "+r.getCar().getColor();
            rentsData[j][2] = r.getDateTime();
            rentsData[j][3] = String.valueOf(r.getHours());
            rentsData[j][4] = String.valueOf(r.getTotal()) + " $";
            rentsData[j][5] = r.getStatusToString();
        }
        JPanel panelD = new JPanel(new GridLayout(15, 2, 5, 5));
        panelD.setBackground(null);
        panelD.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        panelD.add(new JLabel("Name: " + name, 20));
        panelD.add(new JLabel("Email: " + email, 20));
        panelD.add(new JLabel("Phone Number: " + phone, 20));


        Color color2 = new Color(252, 242, 202);

        JScrollPane panel = new JScrollPane(new JTable(rentsData, header, Color.black, color2));
        panel.setBackground(null);
        panel.getViewport().setBackground(null);
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        frame.add(panelD, BorderLayout.WEST);
        frame.add(panel, BorderLayout.CENTER);
        frame.setVisible(true);

    }
}
