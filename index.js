//include all packages needed
//const { default: inquirer } = require('inquirer');
const inquirer = require('inquirer');
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
    message: "What would you like to view?",
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
    }
})  
}
const viewDepartments = () => {
    db.promise().query("SELECT * FROM department").then(([rows])=>{
        console.log(rows);
    })
}

mainmenu()

