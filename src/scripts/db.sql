-- sql script
-- connect to mysql
mysql -u administrator -p

-- create a new database
CREATE DATABASE testdb;

-- check all databases
show databases;

-- change to the new database
use testdb;

-- create a new user
CREATE USER 'testuser'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'testuser'@'192.168.10.100' IDENTIFIED BY 'password';
CREATE USER 'testuser'@'%' IDENTIFIED BY 'password';

-- grant privileges to the new user
GRANT ALL PRIVILEGES ON testdb.* TO 'testuser'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'testuser'@'localhost';
GRANT SELECT, INSERT, DELETE ON testdb1.* TO testuser@'localhost';

-- show grants to the new user
SHOW GRANTS FOR 'testuser'@'localhost';

# revoke privileges from the new user
REVOKE ALL PRIVILEGES ON testdb.* FROM 'testuser'@'localhost';

-- delete database
DROP DATABSE testdb;

-- delete user
DROP USER 'testuser'@'localhost';

-- create a new table
CREATE TABLE cards.cards (
	id INT UNSIGNED auto_increment NOT NULL,
	category varchar(100) NOT NULL,
	title varchar(100) NOT NULL,
	price varchar(100) NOT NULL,
	create_time varchar(20) NOT NULL,
	CONSTRAINT cards_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

-- insert data to the table
INSERT INTO cards (category, title, price, create_time) VALUES (?, ?, ?, ?);

-- select all data from the table
SELECT id, category, title, price FROM cards;

-- select data from the table by id
SELECT id, category, title, price FROM cards WHERE id = ?

-- update data in the table by id
UPDATE cards SET category = ?, title = ?, price = ? WHERE id = ?;

-- delete data from the table by id
DELETE FROM cards WHERE id = ?;

/*
  README

  For DBeaver users:
    Right-click your connection, choose "Edit Connection";
    On the "Connection settings" screen (main screen), click on "Edit Driver Settings";
    Click on "Driver properties" and insert two new properties;
    Set these two properties:
      - "allowPublicKeyRetrieval" to true;
      - "useSSL" to false;
*/
