
---

# Vroom - Car Rental System

**Vroom** is a full-stack car rental system built with React for the frontend and Spring Boot for the backend. It utilizes MySQL as the database. This web application provides features for customer, owners and admins, offering an intuitive user experience for car rentals and management.

## Features

### Client
- **Rent a car**: Browse available cars and make a reservation.
- **View rented cars**: See details of your currently rented cars.
- **Return a car**: Return cars you’ve rented.
- **Make Payment**: Pay for the car rented which will be further verified by the admin.

### Admin
- **See all Cars**: View Cars of all status.
- **See all Users**: View both customer & owners' profile.
- **Check Insurance Application**: Verify Insurance of a Car added by owner.
- **Check Car Maintanance**: View the status and verify for available.
- **Verify Payments**: Verify Payments.
- 
### Customer
- **Add a Car**: Add Cars with different registration number.
- **Edit a Car**: Edit everything except registration number.
- **Check Insurance Application**: Verify Insurance of a Car added by owner.
- **Add Insurance**: Add insurance for a specif car to decrement its rate by 5%.
- **View My Cars**: View his/her own cars.
- **Delete a Car**: View his/her own cars.

## Technologies Used
-**React**: Frontend library for building the user interface.
-**Spring Boot**: Backend framework for handling business logic and APIs.
-**MySQL**: Database backend for storing and managing application data.

## Prerequisites
1.Node.js & npm installed.
2.Java Development Kit (JDK) installed (version 20).
3.MySQL Server installed and configured.
4.An IDE like IntelliJ IDEA, Eclipse, or VS Code (optional but recommended).

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
    - Run the backend:
   ```bash
   mvn spring-boot:run
   ```
   -Run the front end:
   ```bash
   npm start
   ```
The frontend will run on http://localhost:3000

## License
This project is open-source under the [MIT License](LICENSE).

---

