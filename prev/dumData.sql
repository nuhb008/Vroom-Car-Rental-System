SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: carrentalsystemcars
--
USE carrentalsystem;

-- --------------------------------------------------------

--
-- Dumping data for table users
--

INSERT INTO users (FirstName, LastName, Email, PhoneNumber, Password, Type) VALUES
('Admin', '0', 'admin', '0000', '0000', 1),
('Admin', '2', 'admin2', '222222', '1234', 1),
('Client', '1', 'client', '111111', '1111', 0),
('Client', '2', 'client2@crs.com', '222222', '2222', 0),
('Client', '3', 'client3@crs.com', '333333', '3333', 0),
('Client', '4', 'client4@crs.com', '444444', '4444', 0),
('Client', '5', 'client5@crs.com', '555555', '5555', 0),
('Client', '6', 'client6@crs.com', '666666', '6666', 0),
('Client', '7', 'client7@crs.com', '777777', '7777', 0),
('Client', '8', 'client8@crs.com', '888888', '8888', 0),
('Client', '9', 'client9@crs.com', '999999', '9999', 0);

--
-- Dumping data for table cars
--

INSERT INTO cars (carid, Brand, Model, Color, Year, Price, Available) VALUES
(0, 'Brand 0', 'Model 0', 'Color 0', 2020, 1000, 0),
(1, 'Brand 1', 'Model 1', 'Color 1', 2021, 1100, 0),
(2, 'Brand 2', 'Model 2', 'Color 2', 2022, 1200, 0),
(3, 'Brand 3', 'Model 3', 'Color 3', 2023, 1300, 0),
(4, 'Brand 4', 'Model 4', 'Color 4', 2024, 1400, 0),
(5, 'Brand 5', 'Model 5', 'Color 5', 2025, 1500, 0),
(6, 'Brand 6', 'Model 6', 'Color 6', 2026, 1600, 0),
(7, 'Brand 7', 'Model 7', 'Color 7', 2027, 1700, 0),
(8, 'Brand 8', 'Model 8', 'Color 8', 2028, 1800, 2),
(9, 'Brand 8', 'Model 8', 'Color 8', 2028, 1800, 0),
(10, 'Brand 9', 'Model 9', 'Color 9', 2029, 1900, 0);
--
-- Dumping data for table rents
--

INSERT INTO rents (ID, User, Car, DateTime, Hours, Total, Status) VALUES
(0, '020240001', 7, '2023-22-12 23:59', 2, 3400, 0),
(1, '020240002', 0, '2023-22-12 23:59', 7, 7000, 0),
(2, '020240003', 2, '2023-23-12 00:00', 3, 3600, 0),
(3, '020240004', 3, '2023-23-12 00:16', 1, 1300, 0),
(4, '020240005', 5, '2023-23-12 00:16', 2, 3000, 0),
(5, '020240006', 5, '2023-23-12 00:16', 5, 7500, 0),
(6, '020240007', 9, '2023-23-12 00:16', 8, 14400, 0),
(7, '020240008', 7, '2023-23-12 00:16', 7, 11900, 0),
(8, '020240009', 5, '2023-23-12 00:16', 1, 1500, 0);


-- --------------------------------------------------------
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;