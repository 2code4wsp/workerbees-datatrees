//include all packages needed

const inquirer = require('inquirer');
const { default: InputPrompt } = require('inquirer/lib/prompts/input');
require('dotenv').config();
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});
db.connect(function(error){if(error)throw error});

//questions for database
const mainmenu = () => {
inquirer
.prompt({
    name: "task",
    message: "What would you like to do?",
    type: "list",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
}) .then(({task}) => {
    switch (task) {
        case "view all departments":
            viewDepartments()
            break;
        case "view all roles":
            viewRoles()
            break;
        case "view all employees":
            viewEmployees()
            break;
        case "add a role":
            addRole()
            break;
        case "add a department":
            addDepartment()
            break;
     default: process.exit();
    }})
}

//viewing departments, roles, and employees
const viewDepartments = () => {
    db.promise().query("SELECT department.department_name AS Department FROM department").then(([rows])=>{
        console.table(rows);
        mainmenu ();
    })
}
const viewRoles = () => {
    db.promise().query("SELECT role.title AS Title, role.salary AS Salary, department.department_name AS Department FROM role LEFT JOIN department ON role.department_id = department.id").then(([rows])=>{
        console.table(rows);
        mainmenu ();
    })
}
const viewEmployees = () => {
    db.promise().query("SELECT * FROM employee").then(([rows])=>{
        console.table(rows);
        mainmenu ();
    })

}

//adding departments, roles, and employees 
const addRole = async () => {
    const [departments] = await db.promise().query("SELECT * FROM department")
    const departmentarr = departments.map(department =>({name: department.department_name, value: department.id}))
    console.log(departmentarr);
    inquirer.prompt([
        {type: "input", name: "title", message: "enter the new title of the role"}, 
        {type: "input", name: "salary", message: "enter the salary"},
        {type: "list", name: "department_id", message: "select department from list", choices: departmentarr},
    ]).then(({title, salary, department_id})=> {   
        db.promise().query("INSERT INTO role SET ?", {title, salary, department_id}).then(([res]) => res.affectedRows > 0 ? viewRoles() :senderr("role")); //ternary

    })
}
const addDepartment = async () => {
    const [department] = (await db.promise()).query("SELECT * FROM department")
    const departmentarr = department.map(department =>({name: department.department.name, department: department.id}))
    console.log(departmentarr);
    inquirer.prompt([
        {type: "input", name: "department_name", message: "enter the new department name"},
    ]).then(({department_name})=> {
        db.promise().query("INSERT INTO department SET ?", {department_name}).then(([res]) => res.affectedRows > 0 ? viewDepartment() : senderr("department"));
    })
}



const senderr = (table) => {
    console.info("failed to add to table: " + table)
    mainmenu();
}


mainmenu()

