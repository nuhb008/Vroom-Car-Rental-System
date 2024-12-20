
---

# Vroom - Car Rental System

**Vroom** is a car rental system built with Java and a Swing-based GUI, leveraging MySQL for database management. This project allows both **clients** and **admins** to interact with the system through a user-friendly interface.

## Features

### Client
- **Rent a car**: Browse available cars and make a reservation.
- **View rented cars**: See details of your currently rented cars.
- **Change password**: Update your account credentials.
- **Return a car**: Return cars you’ve rented.
- **Edit personal data**: Modify your profile information.

### Admin
- **Add a new car**: Add car details to the system.
- **Update car details**: Modify existing car information.
- **Delete a car**: Remove a car from the system.
- **Show all rents**: View a complete list of all ongoing and past rentals.
- **Change password**: Update admin account credentials.
- **Edit personal data**: Modify admin profile information.

## Technologies Used
- **Java**: Core programming language for business logic.
- **Java Swing**: For creating the desktop GUI application.
- **MySQL**: Database backend for storing and managing application data.

## Prerequisites
1. Java Development Kit (JDK) installed (version 20).
2. MySQL Server installed and configured.
3. An IDE like IntelliJ IDEA or Eclipse (optional but recommended).

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/nuhb008/Vroom-Car-Rental-System.git
   ```
2. Import the project into your IDE.
3. Configure the database:
    - Run the SQL file provided into your MySQL database.
    - Update the database connection settings in the `Database` class (e.g., URL, username, password).
4. Run the project:
    - Compile and execute the `Main.java` file in your IDE.

## How to Use
1. Launch the application.
2. **Login** using the appropriate credentials:
    - Admin credentials for administrative operations.
    - Client credentials for car rentals and account management.
3. Navigate through the intuitive GUI to perform your desired actions.

## Database Structure
- **Carregistration Table**: Stores car registration data.
- **Users Table**: Stores admin and client credentials and data.
- **Cars Table**: Holds information about available cars.
- **Rents Table**: Logs all rental transactions.


## License
This project is open-source under the [MIT License](LICENSE).

---

