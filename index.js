//include all packages needed
const { default: inquirer } = require('inquirer');
const inquire = require('inquirer');

//questions for database
inquirer
.prompt({
    name: "Employment Manager",
    message: "What would you like to view?",
    type: "list",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
})