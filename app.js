const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config/connection');
const selectQuery = require('./lib/sqlQueries');

const renderAllEmployees = function() {
    const sql = `SELECT emp.emp_id, emp.first_name, emp.last_name, 
    department.dept_name AS department, 
    roles.title AS title, roles.salary AS salary, 
    man.first_name AS manager 
    FROM employee emp 
    LEFT JOIN department on emp.dept_id = department.dept_id 
    LEFT JOIN roles ON emp.role_id = roles.role_id 
    LEFT JOIN employee man on emp.manager_id = man.emp_id;`

    db.query(sql, (err, results) => {
        if (err) {
            console.log('ERROR 500. We apologize! Looks like there is an error on our end. Check back in with us later!');
            return;
        };
        console.log('\n');
        console.table(results);
        console.log('\n');
        return mainMenu();
    });
};

const renderAllRoles = function() {
    const sql = `SELECT roles.title,roles.salary, department.dept_name AS department
    FROM roles 
    LEFT JOIN department ON roles.dept_id = department.dept_id;`

    db.query(sql, (err, results) => {
        if (err) {
            console.log('ERROR 500. We apologize! Looks like there is an error on our end. Check back in with us later!');
            return;
        };
        console.log('\n');
        console.table(results);
        console.log('\n');
        return mainMenu();
    });
};

const renderAllDepartments = function() {
    const sql = `SELECT * FROM department;`

    db.query(sql, (err, results) => {
        if (err) {
            console.log('ERROR 500. We apologize! Looks like there is an error on our end. Check back in with us later!');
            return; 
        };
        console.log('\n');
        console.table(results);
        console.log('\n');
        return mainMenu();
    });
};

const addEmployee = function() {

};

const addRole = function() {
    inquirer
        .prompt({
            type: 'text',
            name: 'role',
            message: 'What is the name of the new role?',
            validate: roleInput => {
                if (deptInput) {
                    return true;
                };
                console.log('Please enter a department name to be added.');
                return false;
            }
        },
        {
            type: 'text',
            name: 'salary',
            message: 'What is the salary associated with this role?',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                };
                console.log('Please enter a salary for this role.');
                return false;
            }
        },
        {
            type: 'text',
            name: 'department',
            message: 'What department does this role belong to?',
            choices: ['']
        })

};

const addDepartment = function() {
    inquirer
        .prompt({
            type: 'text',
            name: 'department',
            message: 'What is the name of the new department?',
            validate: deptInput => {
                if (deptInput) {
                    return true;
                };
                console.log('Please enter a department name to be added.');
                return false;
            }
        })
        .then(({ department }) => {
            const sql = `INSERT INTO department (dept_name) VALUES (?);`

            db.query(sql, department, (err, results) => {
                if (err) {
                    console.log('Error. Could not create the new department.');
                };
                console.log(`Added ${department} as a department.`);
                return mainMenu();
            });
        })
};

const updateEmployeeRole = function() {

};

const updateManager = function() {

};

const mainMenu = function() {
    inquirer
        .prompt({
            type: 'list',
            name: 'menu',
            message: 'Welcome to the Employee Database!',
            choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','Exit']
        })
        .then(({ menu }) => {
            switch(menu) {
                case 'View All Employees':
                    renderAllEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    renderAllRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    renderAllDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                default:
                    console.log('See you later, alligator!');
            };
        });
};

mainMenu();