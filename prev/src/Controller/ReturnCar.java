package Controller;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.swing.BorderFactory;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

import Model.Database;
import Model.JButton;
import Model.JComboBox;
import Model.JLabel;
import Model.Operation;
import Model.Rent;
import Model.User;

public class ReturnCar implements Operation {
    @Override
    public void operation(Database database, JFrame f, User user) {
        JFrame frame = new JFrame("Return Car");
        frame.setSize(600, 260);
        frame.setLocationRelativeTo(f);
        frame.getContentPane().setBackground(new Color(250, 206, 27));
        frame.setLayout(new BorderLayout());
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        Model.JLabel title = new Model.JLabel("Rent Car", 35);
        title.setBorder(BorderFactory.createEmptyBorder(20, 0, 0, 0));
        frame.add(title, BorderLayout.NORTH);

        JPanel panel = new JPanel(new GridLayout(2, 2, 15, 15));
        panel.setBackground(null);
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        panel.add(new Model.JLabel("Rent ID:", 22));

        String[] ids = new String[] {" "};
        ArrayList<Integer> idsArray = new ArrayList<>();
        try {
            ResultSet rs0 = database.getStatement()
                    .executeQuery("SELECT `ID` FROM `rents` WHERE `User` = '"+user.getID()+"' AND `Status` != 1;");
            while (rs0.next()) {
                idsArray.add(rs0.getInt("ID"));
            }
        } catch (Exception e0) {
            JOptionPane.showMessageDialog(frame, e0.getMessage());
            frame.dispose();
        }

        ids = new String[idsArray.size()+1];
        ids[0] = " ";
        for (int i=1;i<=idsArray.size();i++) {
            ids[i] = String.valueOf(idsArray.get(i-1));
        }

        Model.JComboBox id = new Model.JComboBox(ids, 22);
        panel.add(id);

        Model.JButton showRents = new Model.JButton("Show my Rents", 22);
        showRents.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new ShowUserRents(user.getID()).operation(database, frame, user);
            }
        });
        panel.add(showRents);

        Model.JButton confirm = new JButton("Confirm", 22);
        confirm.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (id.getSelectedItem().toString().equals(" ")) {
                    JOptionPane.showMessageDialog(frame, "Rent ID cannot be empty");
                    return;
                }

                try {
                    String select = "SELECT * FROM `rents` WHERE `ID` = '"+id.getSelectedItem().toString()+"';";
                    ResultSet rs = database.getStatement().executeQuery(select);
                    rs.next();
                    Rent r = new Rent();
                    r.setID(rs.getInt("ID"));
                    r.setUser(user);
                    r.setDateTime(rs.getString("DateTime"));
                    r.setHours(rs.getInt("Hours"));
                    r.setTotal(rs.getDouble("Total"));
                    r.setStatus(rs.getInt("Status"));

                    if (r.getStatusToString().equals("Delayed")) {
                        JOptionPane.showMessageDialog(frame, r.getDelayedHours()
                                +" delayed hours\nYou will have to pay "+ r.getDelayedHours()*1000+"$ as fine");
                    }

                    String update = "UPDATE `rents` SET `Status`='1' WHERE `ID` = '"+id.getSelectedItem().toString()+"';";
                    database.getStatement().execute(update);
                    JOptionPane.showMessageDialog(frame, "Car returned successfully");
                    frame.dispose();
                } catch (SQLException exception) {
                    JOptionPane.showMessageDialog(frame, exception.getMessage());
                }

            }
        });
        panel.add(confirm);

        frame.add(panel, BorderLayout.CENTER);
        frame.setVisible(true);
        frame.requestFocus();

    }
}
