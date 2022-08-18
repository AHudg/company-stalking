const selectQuery = function(queryID) {
    // an array holding all the queries used in the application
    const queryArray = [

        `SELECT * FROM employee`,

        `SELECT * FROM roles;`,

        `SELECT * FROM department;`,

        `SELECT emp.emp_id, emp.first_name, emp.last_name, 
        department.dept_name AS department, 
        roles.title AS title, roles.salary AS salary, 
        man.first_name AS manager 
        FROM employee emp 
        LEFT JOIN department on emp.dept_id = department.dept_id 
        LEFT JOIN roles ON emp.role_id = roles.role_id 
        LEFT JOIN employee man on emp.manager_id = man.emp_id;`,

        `SELECT roles.role_id,roles.title,roles.salary, department.dept_name AS department
        FROM roles 
        LEFT JOIN department ON roles.dept_id = department.dept_id;`,

        `INSERT INTO employee (first_name, last_name, role_id, dept_id, manager_id) VALUES (?,?,?,?,?)`,

        `INSERT INTO roles (title, salary, dept_id) VALUES (?,?,?);`,

        `INSERT INTO department (dept_name) VALUES (?);`,

        `UPDATE employee SET role_id = ? WHERE emp_id = ?;`

    ];
    return queryArray[queryID];
};

module.exports = selectQuery;