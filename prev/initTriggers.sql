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

COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;