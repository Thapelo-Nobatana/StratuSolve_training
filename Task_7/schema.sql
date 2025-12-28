
USE Task_7_db;
CREATE TABLE Person(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    firstname VARCHAR(255),
    Surname VARCHAR(255),
    DateOfBirth DATE,
    EmailAddress VARCHAR(255),
     Age INT 
);