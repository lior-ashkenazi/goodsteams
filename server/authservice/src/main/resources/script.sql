-- 1. Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS authdb;

-- 2. Switch to the new database
USE authdb;

-- 3. Drop the User table if it already exists (as per your convention)
DROP TABLE IF EXISTS user;

-- 4. Create the User table
CREATE TABLE user (
                      id BIGINT PRIMARY KEY AUTO_INCREMENT,
                      username VARCHAR(255) NOT NULL UNIQUE,
                      password VARCHAR(255) NOT NULL
);

-- 5. Create a dedicated user for the auth-service to connect from a specific IP
CREATE USER IF NOT EXISTS 'liorash7'@'192.168.10.129' IDENTIFIED BY 'jagabong1712';

-- 6. Grant privileges to the new user for the authdb
GRANT ALL PRIVILEGES ON authdb.* TO 'liorash7'@'192.168.10.129';

-- 7. Refresh privileges to ensure the new privileges take effect
FLUSH PRIVILEGES;