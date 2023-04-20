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
     default: process.exit();
    }})
}

//viewing departments, roles, and employees
const viewDepartments = () => {
    db.promise().query("SELECT * FROM department").then(([rows])=>{
        //console.log(rows);
    })
}
const viewRoles = () => {
    db.promise().query("SELECT * FROM role").then(([rows])=>{
        console.log(rows);
    })
}
const viewEmployees = () => {
    db.promise().query("SELECT * FROM employee").then(([rows])=>{
        console.log(rows);
    })
}

mainmenu()

