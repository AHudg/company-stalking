const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config/connection');
const selectQuery = require('./lib/sqlQueries');

const renderInformation = function(queryID) {
    const sql = selectQuery(queryID);

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
    const roleInfoArray = [];

    const sql = selectQuery(2);

    db.query(sql, (err, results) => {
        if (err) {
            console.log('ERROR 500. We apologize! Looks like there is an error on our end. Check back in with us later!');
            return;
        };

        const deptArray = results.map(({ dept_id, dept_name }) => (dept_name));

    inquirer
        .prompt([{
                type: 'text',
                name: 'role',
                message: 'What is the name of the new role?',
                validate: roleInput => {
                    if (roleInput) {
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
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: deptArray
            }])
        .then(({ role, salary , department}) => {
            roleInfoArray.push(role);
            roleInfoArray.push(salary);
            roleInfoArray.push(department);
            console.log( roleInfoArray);
            });
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
                    renderInformation(0);
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    renderInformation(1);
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    renderInformation(2);
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