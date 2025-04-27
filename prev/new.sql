CREATE TABLE CarInsurance (
                              InsID INT PRIMARY KEY,
                              StartDate DATE NOT NULL,
                              EndDate DATE NOT NULL,
                              DeductibleAmount DECIMAL(10, 2),
                              Status ENUM('Active', 'Expired', 'Cancelled') DEFAULT 'Active'
);

ALTER TABLE carregistration
    ADD InsID INT;

-- Step 2: Add a foreign key constraint linking InsID in carregistration to InsID in CarInsurance
ALTER TABLE carregistration
    ADD CONSTRAINT FK_Insurance FOREIGN KEY (InsID) REFERENCES CarInsurance(InsID);