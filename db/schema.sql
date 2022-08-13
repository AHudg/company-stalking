DROP DATABASE IF EXISTS companyInfo;
CREATE DATABASE companyInfo;
USE companyInfo;

CREATE TABLE department (
    dept_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    dept_id INTEGER NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

CREATE TABLE employee (
    emp_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    dept_id INTEGER NOT NULL,
    manager_id INTEGER
);