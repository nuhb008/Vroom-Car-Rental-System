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


COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;