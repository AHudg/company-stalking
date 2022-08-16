const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config/connection');

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

const mainMenu = function() {
    inquirer
        .prompt({
            type: 'list',
            message: 'Welcome to the Employee Database!',
            name: 'menu',
            choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','Exit']
        })
        .then(({ menu }) => {
            switch(menu) {
                case 'View All Employees':
                    renderAllEmployees();
                    break;
                case 'Add Employee':
                    // code
                    break;
                case 'Update Employee Role':
                    // code
                    break;
                case 'View All Roles':
                    renderAllRoles();
                    break;
                case 'Add Role':
                    // code
                    break;
                case 'View All Departments':
                    renderAllDepartments();
                    break;
                case 'Add Department':
                    // code
                    break;
                default:
                    console.log('See you later, alligator!');
            }
        })
};

mainMenu();