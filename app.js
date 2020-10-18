const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const inquirer = require("inquirer");
const Intern = require("./library/intern");
const Engineer = require("./library/engineer");
const Manager = require ("./library/manager");

const employees = [];

function init(){
    addMember();
}
function addMember(){
    return inquirer.prompt([
        {
            type: input,
            message: "Welcome! Please enter a team member's name: ",
            name: "name"
        },
        {
            type: list,
            message: "Please select team member's role:",
            name: "role",
            choices: ["Manager", "Engineer", "Intern"]
        },
        {
            type: input,
            message: "Please enter team member's ID #:",
            name: "id"
        },
        {
            type: input,
            message: "Please enter team member's email:",
            name: "email"
        }

    ])
}