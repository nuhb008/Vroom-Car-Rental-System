package Controller;

import Model.Database;
import Model.JTextField;
import Model.Operation;
import Model.User;

import javax.swing.*;
import java.awt.*;

public class RentCar implements Operation {
    private JTextField brand, model, color, year, price;
    private Database database;
    private JFrame frame;
    @Override
    public void operation(Database database, JFrame f, User user) {
        this.database = database;

        frame = new JFrame("Rent Car");
        frame.setSize(600, 650);
        frame.setLocationRelativeTo(f);
        frame.getContentPane().setBackground(new Color(250, 206, 27));
        frame.setLayout(new BorderLayout());



    }
}
