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
CREATE DATABASE IF NOT EXISTS carrentalsystem DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE carrentalsystem;

-- --------------------------------------------------------

--
-- Table structure for table users
--

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS users (
  userid VARCHAR(20) NOT NULL,            -- Modify ID to VARCHAR
  FirstName TEXT NOT NULL,
  LastName TEXT NOT NULL,
  Email TEXT NOT NULL,
  PhoneNumber TEXT NOT NULL,
  Password TEXT NOT NULL,
  Type INT(11) NOT NULL,              -- User type (1 for Admin, 2 for Client)
  PRIMARY KEY (userid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table id_sequence
--

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS id_sequence;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS id_sequence (
  Type INT NOT NULL,              -- Type of user (1 for Admin, 2 for Client)
  LastSeq INT NOT NULL DEFAULT 0, -- Last generated sequence number
  PRIMARY KEY (Type)
);

--
-- Table structure for table cars
--
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS cars;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS cars (
  carid int(11) NOT NULL PRIMARY KEY,
  Brand text NOT NULL,
  Model text NOT NULL,
  Color text NOT NULL,
  Year int(11) NOT NULL,
  Price double NOT NULL,
  Available int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table carregistration
--

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS carregistration;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS carregistration (
  registration_number VARCHAR(50) NOT NULL PRIMARY KEY,
  userid VARCHAR(20) NOT NULL,
  carid int(11) NOT NULL,
  FOREIGN KEY (userid) REFERENCES users(`userid`),
  FOREIGN KEY (carid) REFERENCES cars(`carid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table rents
--

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS rents;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS rents (
  ID int(11) NOT NULL,
  User VARCHAR(20) NOT NULL,
  Car int(11) NOT NULL,
  DateTime text NOT NULL,
  Hours int(11) NOT NULL,
  Total double NOT NULL,
  Status int(11) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (User) REFERENCES users(`userid`),
  FOREIGN KEY (Car) REFERENCES cars(`carid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Trigger Logic for before_insert_user
--

DROP TRIGGER IF EXISTS before_insert_user;

DELIMITER $$

CREATE TRIGGER before_insert_user
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    DECLARE v_prefix CHAR(1);       -- Prefix for the ID (1 for Admin, 2 for Client)
    DECLARE v_seq INT;              -- The sequence number for the ID
    DECLARE v_id VARCHAR(20);       -- Final ID to be inserted
    DECLARE v_year CHAR(4);         -- Current year as a string

    -- prefix Type (1 for Admin, 0 for Client)
    SET v_prefix = IFNULL(CAST(NEW.Type AS CHAR), '0');
    
    -- year from the system date
    SET v_year = YEAR(CURDATE());

    -- last sequence number for the given type from the id_sequence table
    SELECT LastSeq INTO v_seq FROM id_sequence WHERE Type = NEW.Type FOR UPDATE;

    -- If no record exists, initialize the sequence for that type
    IF v_seq IS NULL THEN
        SET v_seq = 0;
    END IF;

    -- Increment the sequence number
    SET v_seq = v_seq + 1;

    -- Generate the final ID in the format TYYYYxxxx
    SET v_id = CONCAT(v_prefix, v_year, LPAD(v_seq, 4, '0'));  -- Ensure 4 digits for sequence

    -- Set the generated ID as the new value for the ID column
    SET NEW.userid = v_id;

    -- Update the sequence table with the new sequence number for that Type
    INSERT INTO id_sequence (Type, LastSeq)
    VALUES (NEW.Type, v_seq)
    ON DUPLICATE KEY UPDATE LastSeq = v_seq;

END $$

DELIMITER ;


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