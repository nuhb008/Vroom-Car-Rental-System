package Model;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class Database {

<<<<<<< HEAD
    private String user = "root";
    private String password = "007911";
    private String url = "jdbc:mysql://localhost:3306/carrentalsystem";  // Add port 3306
=======
    Properties properties = new Properties();
    private String user ;
    private String password ;
    private String url ;  // Add port 3306
>>>>>>> ec92e77f9c906f5891b26f163ba2675cef8d1ca6
    private Connection connection;
    private Statement statement;

    public Database() {
        try {
            FileInputStream inputStream = new FileInputStream("dbconfig.properties");
            properties.load(inputStream);
            inputStream.close();
            // Load the MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver"); // for MySQL Connector/J 8.0+
            url = properties.getProperty("db.url");
            user = properties.getProperty("db.user");
            password = properties.getProperty("db.password");
            // Establish the connection
            connection = DriverManager.getConnection(url, user, password);

            // Create a statement with scrollable and read-only result sets
            statement = connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_READ_ONLY);

            System.out.println("Connection to MySQL established successfully.");
        } catch (ClassNotFoundException e) {
            System.out.println("MySQL JDBC Driver not found.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Failed to connect to MySQL database.");
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Connection getConnection() {
        return connection;
    }

    public Statement getStatement() {
        return statement;
    }

    // Method to close the database connection
    public void closeConnection() {
        try {
            if (statement != null) {
                statement.close();
            }
            if (connection != null) {
                connection.close();
            }
            System.out.println("Connection closed.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
