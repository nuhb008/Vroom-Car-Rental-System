package Model;

import Controller.*;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JFrame;
import javax.swing.JPanel;


public class Client extends User {

    private Operation[] operations = new Operation[] {
            new ViewCars(),                           //To be Implemented
            new RentCar(),                           //To be Implemented
            new ReturnCar(),                           //To be Implemented
            new ShowUserRents("-9999"),                           //To be Implemented
            new EditUserData(),
            new ChangePassword()};
    private JButton[] btns = new JButton[] {
            new JButton("View Cars", 22),
            new JButton("Rent Car", 22),
            new JButton("Return Car", 22),
            new JButton("Show My Rents", 22),
            new JButton("Edit My Data", 22),
            new JButton("Change Password", 22),
            new JButton("Log Out", 22)
    };

    public Client() {
        super();
    }

    @Override
    public void showList(Database database, JFrame f) {

        JFrame frame = new JFrame("Client Panel");
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.setSize(400, btns.length*90);
        frame.setLocationRelativeTo(f);
        frame.getContentPane().setBackground(new Color(250, 206, 27));
        frame.setLayout(new BorderLayout());
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        JLabel title = new JLabel("Welcome "+getFirstName(), 30);
        title.setBorder(BorderFactory.createEmptyBorder(15, 0, 0, 0));
        frame.add(title, BorderLayout.NORTH);

        JPanel panel = new JPanel(new GridLayout(btns.length, 1, 15, 15));
        panel.setBackground(null);
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        for (int i=0;i<btns.length;i++) {
            final int j = i;
            JButton button = btns[i];
            panel.add(button);
            button.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    if (j == btns.length - 1) { // Logout button is the last in the array
                        frame.dispose(); // Close the client panel
                        Main.start();    // Reopen the login frame
                    } else {
                        operations[j].operation(database, frame, Client.this);
                    }
                }
            });
        }

        frame.add(panel, BorderLayout.CENTER);
        frame.setVisible(true);
    }

}
