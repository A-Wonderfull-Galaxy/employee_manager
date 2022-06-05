const { prompt } = require("inquire");
const database = require("./db");
const mysql = require("mysql2");
require("console.table");

init();

//display intro
function init(){
    loadMainPrompts();
}

//load menu
function loadMainPrompts(){
    prompt([
        {
            type:"list",
            name: "choice",
            message: "what would you like to do that?",
            choices: [
                {
                    name: "view All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "view All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "view All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "remove Department",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }    
    ])
    .then(res => {
        let choice = res.choice;
        //call correct function using the choices
        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;

            case "ADD_EMPLOYEE":
                addEmployee();
                break;

            case "REMOVE_EMPLOYEE":
                removeEmployee();
                break;

            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;

            case "UPDATE_EMPLOYEE_MANAGER":
                updateEmployeeManager();
                break;

            case "VIEW_ROLES":
                viewRoles();
                break;

            case "ADD_ROLE":
                viewEmployees();
                break;

            case "REMOVE_ROLE":
                removeRole();
                break;

            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;

            case "ADD_DEPARTMENT":
                addDepartment();
                break;

            case "REMOVE_DEPARTMENT":
                removeDepartment();
                break;

            case "QUIT":
                quit();
                break;
        }
    })
}

//view employees
function viewEmployees(){
    database.findAllEmployees()
    .then(([rows]) => {
        let employee = rows;
        console.log("\n");
        console.table(employees);
    })
    .then(()=> loadMainPrompts());
}

//delete an employee
function removeEmployee(){
    database.findAllEmployees()
    .then(([rows]) =>{
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
            {
            type: "list",
            name:"employeeId",
            message: "pick employee to remove",
            choices: emplyeeChoices
            }
        ])
        .then(res => database.removeEmployee(res.employeeId))
        .then(()=>  console.log("employee removed"))
        .then(()=> loadMainPrompts())
    })
}

//update employee role
function updateEmployeeRole(){
    database.findAllEmployees()
    .then(([rows]) =>{
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name })=>({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "employeeId",
                message: "which employees role do you want to update",
                choices: employeeChoices
            }
        ])
        .then(res=>{
            let employeeId = res.employeeId;
            database.findAllRoles()
            .then(([rows])=>{
                let roles = rows;
                const roleChoices = roles.map(({ id, title })=>({
                    name: title,
                    value: id
                }));

                prompt([
                    {
                        type: "list",
                        name: "roleId",
                        message: "select role to update for employee"
                    }
                ])
                .then(res => database.updateEmployeeRole(employeeId, res.roleId))
                .then(() => console.log("updated role"))
                .then(()=> loadMainPrompts())
            });
        });
    })
}

//update employer manager
function updateEmployeeManager(){
    db.findAllEmployees()
    .then(([rows])=>{
        let employees = rows;
        const employeeChoices = employee.map(({ id, first_name, last_name })=>({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "employeeId",
                message: "which manager to update with",
                choices: employeeChoices
            }
        ])
        .then(res =>{
            let employeeId = res.employeeId
            database.findAllManagers(employeeId)
            .then(([rows])=>{
                let managers = rows;
                const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));

                prompt([
                    {
                        type: "list",
                        name: "managerId",
                        message: "pick manager for employee",
                        choices: managerChoices
                    }
                ])
                .then(res => database.updateEmployeeManager(employeeId, res.managerId))
                .then(()=> console.log("updated"))
                .then(()=> loadMainPrompts())
            })
        })
    })
}

//view roles
function viewRoles(){
    database.findAllRoles()
    .then(([rows])=>{
        let roles = rows;
        console.log("\n");
    })
    .then(()=> loadMainPrompts());
}

//add roles
function addRole() {
    database.findAllDepartments()
    .then(([rows])=>{
        let departments = rows;
        const departmentChoices = departments.map(({ id, name })=>({
            name: name,
            value: id
        }));

        prompt([
            {
                name: "title",
                message: "what is the name of the role"
            },
            {
                name: "salary",
                message: "whats the salary"
            },
            {
                type: "list",
                name: "department_id",
                message: "which department does the role belong to?",
                choices: departmentChoices
            }
        ])
        .then(role => {
            database.createRole(role)
            .then(()=> console.log(`${role.title} added to database`))
            .then(()=> loadMainPrompts())
        })
    })
}

//delete role
function removeRole(){
    database.findAllRoles()
    .then(([rows])=>{
        let roles = rows;
        const roleChoices = roles.map(({ id, title })=>({
            name: title,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "roleId",
                message: "which role do tou want to remove, this will remove all employees",
                choices: roleChoices
            }
        ])
        .then(res => database.removeRole(res.roleId))
        .then(()=> console.log("removed from database"))
        .then(()=> loadMainPrompts())
    })
}

//view departments
function viewDepartments(){
    database.findAllDepartments()
    .then(([rows])=> {
        let departments = rows;
        console.log("\n");
        console.table(departments);
    })
    .then(() => loadMainPrompts());
}

//add a department
function addDepartment(){
    prompt([
        {
            name: "department_name",
            message: "name of department"
        }
    ])
    .then(res => {
        let name =res;
        database.createDepartment(department_name)
        .then(()=> console.log(`${name.department_name} added`))
        .then(()=> loadMainPrompts())
    })
}

//delete department
function removeDepartment(){
    database.findAllDepartments()
    .then(([rows])=>{
        let department = rows;
        const departmentChoices = departments.map(({ id,name })=>({
            name: department.name,
            value: id
        }));

        prompt({
            type: "list",
            name: "departmentId",
            message: "pick departmetn to remove, this will remove roles and employee associated",
            choices: departmentChoices
        })
        .then(res => database.removeDepartment(res.departmentId))
        .then(()=> console.log(`removed`))
        .then(()=> loadMainPrompts())
    })
}

//add employee
function addEmployee(){
    prompt([
        {
            name: "first_name",
            message: "first name"
        },
        {
            name: "last_name",
            message: "last name"
        },
    ])
    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;

        database.findAllRoles()
        .then(([rows])=> {
            let roles = rows;
            const roleChoices = roles.map(({ id, title })=>({
                name: title,
                value: id
            }));

            prompt({
                type: "list",
                name: "roleId",
                message: "what is the role",
                choices: roleChoices
            })
            .then(res =>{
                let roleId = res.roleId;

                database.findAllEmployees()
                .then(([rows])=>{
                    let employee = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name })=> ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));

                    managerChoices.unshift({ name: "none", value: null });

                    prompt({
                        type: "list",
                        name: "managerId",
                        message: "who is the manager",
                        choices: managerChoices
                    })
                    .then(res => {
                        let employee = {
                            manager_id: res.managerId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                        }

                        database.createEmployee(employee);
                    })
                    .then(()=> console.log(`${firstName} ${lastName} added`))
                    .then(() => loadMainPrompts())
                })
            })
        })
    })
}

//exit app
function quit(){
    console.log("closed");
    process.exit();
}