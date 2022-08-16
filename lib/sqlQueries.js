const selectQuery = function(queryID) {
    const queryArray = [

        `SELECT emp.emp_id, emp.first_name, emp.last_name, 
        department.dept_name AS department, 
        roles.title AS title, roles.salary AS salary, 
        man.first_name AS manager 
        FROM employee emp 
        LEFT JOIN department on emp.dept_id = department.dept_id 
        LEFT JOIN roles ON emp.role_id = roles.role_id 
        LEFT JOIN employee man on emp.manager_id = man.emp_id;`,

        `SELECT roles.title,roles.salary, department.dept_name AS department
        FROM roles 
        LEFT JOIN department ON roles.dept_id = department.dept_id;`,

        `SELECT * FROM department;`
    ];
    return queryArray[queryID];
};

module.exports = selectQuery;