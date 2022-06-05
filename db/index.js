const connection = require("../connection.js");

class database{
    //this reference the connection just in case i need it
    constructor(connection){
        this.connection = connection;
    }

    //find all employees
    findAllEmployees(){
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    //find all employees using employee id
    findAllManagers(employeeId){
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM emplyee WHERE id != ?",
            employeeId
        );
    }

    //crreate new employee
    createEmployee(employee){
        return this.connection.promise().query("INSERT INTO employee SET ?", employee)
    }

    //remove employee using id
    removeEmployee(employeeId){
        return this.connection.promise().query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }

    //update emplyee role using role id then changes that id
    updateEmployeeRole(employeeId, roleId, managerId){
        return this.connection.promise().query(
            "UPDATE employee SET role_id =? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    //update the given employee manager
    updateEmployeeManager(employeeId, managerId){
        return this.connection.promise().query(
            "UPDATE employee SET manager_id = ? WHERE id = ?"
            [managerId, employeeId]
        );
    }

    //find all roles, join with departments
    findAllRoles(){
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.department_name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    //create new role
    createRole(role){
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }

    //remove a role from the database
    removeRole(roleId){
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }

    //find all departments
    findAllDepartments(){
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    //create new department
    createDepartment(departmentId){
        return this.connection.promise().query(
            "INSERT INTO department SET ?", departmentId
        );
    }

    //remove a department
    removeDepartment(departmentId){
        return this.connection.promise().query(
            "DElETE FROM department WHERE id = ?", departmentId
        );
    }
};

module.exports = new database(connection);