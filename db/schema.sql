DROP DATABASE IF EXISTS companyInfo;
CREATE DATABASE companyInfo;
USE companyInfo;

CREATE TABLE department (
    dept_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    dept_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

-- SELECT roles.title,roles.salary, department.dept_name AS department FROM roles LEFT JOIN department ON roles.dept_id = department.dept_id;

CREATE TABLE employee (
    emp_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    dept_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES department(dept_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    -- FOREIGN KEY (manager_id) REFERENCES employee(emp_id)
);

-- SELECT emp_id, first_name, last_name, department.dept_name AS department, roles.title AS title, roles.salary AS salary  FROM employee LEFT JOIN department ON employee.dept_id = department.dept_id LEFT JOIN roles ON employee.role_id = roles.role_id;