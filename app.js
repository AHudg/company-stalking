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
    const employeeInfoArray = [];

    let sqlRoleData = selectQuery(1);

    db.query(sqlRoleData, (err, roleResults) => {
        if (err) {
            console.log('ERROR 500. We apologize! Looks like there is an error on our end. Check back in with us later!');
            return;
        };
    
        const roleArray = roleResults.map(({ title }) => (title));
        const roleDeptID = roleResults.map(({ dept_id }) => (dept_id));

        let sqlEmpData = selectQuery(0);

        db.query(sqlEmpData, (err, empResults) => {
             if (err) {
                console.log('ERROR 500. We apologize! Looks like there is an error on our end. Check back in with us later!');
                return;
            };

            const empArray = empResults.map(({ first_name, last_name }) => (first_name + " " + last_name));
            const empManagerID = empResults.map(({ emp_id }) => (emp_id));

            inquirer
                .prompt([
                    {
                        type: 'text',
                        name: 'first',
                        message: 'What is the first name of the new employee?',
                        validate: firstInput => {
                            if (firstInput) {
                                return true;
                            };
                            console.log('Please enter in the employee first name before proceeding.');
                            return false;
                        }
                    },
                    {
                        type: 'text',
                        name: 'last',
                        message: 'What is the last name of the new employee?',
                        validate: lastInput => {
                            if (lastInput) {
                                return true;
                            };
                            console.log('Please enter the last name of the employee before proceeding.');
                            return false;
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What role does this employee belong to?',
                        choices: roleArray
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the manager for this employee?',
                        choices: empArray
                    }
                ])
                .then(({ first, last, role, manager}) => {
                    employeeInfoArray.push(first);
                    employeeInfoArray.push(last);

                    for (let i = 0; i < roleArray.length; i++) {
                        if (roleArray[i] === role) {
                            const roleID = i + 1;
                            employeeInfoArray.push(roleID);
                            const deptID = roleDeptID[i];
                            employeeInfoArray.push(deptID)
                        };
                    };

                    for (let i = 0; i < empArray.length; i++) {
                        if (empArray[i] === manager) {
                            const managerID = i + 1;
                            employeeInfoArray.push(managerID);
                        };
                    };

                    const sql = selectQuery(5);

                    db.query(sql, employeeInfoArray, (err, results) => {
                        if (err) {
                            console.log('ERROR 400. Looks like the request was bad. Try resubmitting and double check the input.');
                            return;
                        };
                        console.log(`Successfully added ${employeeInfoArray[0]} ${employeeInfoArray[1]} to the available roles.\n`);
                        return mainMenu();
                    })

                })
        });
    });
};

const addRole = function() {
    const roleInfoArray = [];

    const sqlDeptData = selectQuery(2);

    db.query(sqlDeptData, (err, results) => {
        if (err) {
            console.log('ERROR 500. We apologize! Looks like there is an error on our end. Check back in with us later!');
            return;
        };

        const deptArray = results.map(({ dept_name }) => (dept_name));

        inquirer
            .prompt([
                {
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
                    type: 'number',
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
                }
            ])
            .then(({ role, salary , department}) => {
                roleInfoArray.push(role);
                roleInfoArray.push(salary);

                for (let i = 0; i < deptArray.length; i++) {
                    if (deptArray[i] === department) {
                        const departmentID = i + 1;
                        roleInfoArray.push(departmentID);
                    };
                };

                const sql = selectQuery(6);

                db.query(sql, roleInfoArray, (err, results) => {
                    if (err) {
                        console.log('ERROR 400. Looks like the request was bad. Try resubmitting and double check the input.');
                        return;
                    };
                    console.log(`Successfully added ${roleInfoArray[0]} to the available roles.\n`);
                    return mainMenu();
                });
            });
    });
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
            const sql = selectQuery(7);

            db.query(sql, department, (err, results) => {
                if (err) {
                    console.log('Error. Could not create the new department.');
                };
                console.log(`Successfully added ${department} as a department.\n`);
                return mainMenu();
            });
        })
};

const updateEmployeeRole = function() {
    const updateArray = [];

    let sqlRoleData = selectQuery(1);

    db.query(sqlRoleData, (err, roleResults) => {
        if (err) {
            console.log('ERROR 500. We apologize! Looks like there is an error on our end. Check back in with us later!');
            return;
        };
    
        const roleArray = roleResults.map(({ title }) => (title));
        const roleID = roleResults.map(({ role_id }) => (role_id));

    inquirer
        .prompt([
            {
                type: 'number',
                name: 'employeeId',
                message: 'Enter the employee ID to update their role.',
                validate: idInput => {
                    if (idInput) {
                        return true;
                    };
                    console.log('You need to enter an employee ID so we know who is getting a new role!');
                    return false;
                }
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'What role should we assign this employee?',
                choices: roleArray,
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    };
                    console.log('You need to enter in the new employee role.');
                    return false;
                }
            }
        ])
        .then(({ employeeId, newRole }) => {
            updateArray.push(employeeId);
            for (let i = 0; i < roleArray.length; i++) {
                if (roleArray[i] === newRole) {
                    const newRoleId = i + 1;
                    updateArray.push(newRoleId);
                };
            };

            console.log(updateArray);
            sql = selectQuery(8)

            db.query(sql, updateArray, (err, results) => {
                if (err) {
                    console.log('ERROR 404. Looks like the request was bad. Try resubmitting and double check the input.');
                    return;
                };
                console.log(`Successfully updated employee ${employeeId}.\n`);
                return mainMenu();
            })
        })
    })
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
                    renderInformation(3);
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    renderInformation(4);
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