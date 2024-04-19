CREATE DATABASE srb;

CREATE TABLE user_info(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,   
    phone_number VARCHAR(25) NOT NULL UNIQUE,
    user_password INT 
);
    -- FOREIGN KEY (user_password) REFERENCES passwords(pass_id)


CREATE TABLE password_table(
    pass_id INT AUTO_INCREMENT PRIMARY KEY,
    passwords VARCHAR(50) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user_info(user_id) 
);

CREATE TABLE sos_messages(
    mess_id INT AUTO_INCREMENT PRIMARY KEY,
    user_message VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

CREATE TABLE emergency_contact(
    ec_id INT AUTO_INCREMENT PRIMARY KEY,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,
    relationship VARCHAR(50),
    phone_number VARCHAR(25) NOT NULL UNIQUE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);


-- TODO: CREATE AND TEST COMMANDS OF THE CONTACT PAGE

--! COMMAND TO SHOW EMERGENCY CONTACT --
SELECT f_name, l_name, relationship, phone_number FROM emergency_contact WHERE user_id = [USER_ID];

--! ADD CONTACT BUTTON COMMAND --
INSERT INTO emergency_contact(f_name, l_name, relationship, phone_number) VALUES(NULL, NULL, NULL, NULL); --*Replace NULL with Parsed Data--

--! UPDATE CONTACT BUTTOM COMMAND --
UPDATE emergency_contact SET column = 'value' WHERE first_name = ['NAME'] AND last_name = ['NAME'] AND user_id = ['USER_ID'];

--! DELETE CONTACT BUTTON COMMAND --
DELETE FROM emergency_contact WHERE first_name = ['NAME'] AND last_name = ['NAME'] AND user_id = ['USER_ID'];



-- TODO: CREATE AND TEST COMMANDS OF THE LOGIN AND SIGN UP

--! SEARCH FOR RECORDS FOR USER NAME --
SELECT COUNT(user_name) FROM user_info WHERE user_name = ['INPUT'] -- IF COUNT > 0 CHOOSE A DIFFERENT NAME --

--! SIGNUP --
INSERT INTO user_info(user_name, f_name, l_name, phone_number) VALUES (NULL, NULL, NULL, NULL);

--! Login --
SELECT COUNT(user_name, passwords) FROM user_info INNER JOIN password_table ON user_info.user_id = password_table.user_id WHERE user_name = ['VALUE'] AND passwords = ['VALUE']; --If record is equal to 1 then login. --   