const fs = require("fs");
const util = require("util");
// const writeFile = util.promisify(fs.writeFile);
const inquirer = require("inquirer");
const Intern = require("./library/intern");
const Engineer = require("./library/engineer");
const Manager = require ("./library/manager");

const employees = [];

function init(){
    startHTML();
    addMember();
}

//User inputs the required info to create a team member card
function addMember(){
    return inquirer.prompt([
        {
            type: "input",
            message: "Welcome! Please enter a team member's name: ",
            name: "name"
        },
        {
            type: "list",
            message: "Please select team member's role:",
            name: "role",
            choices: ["Manager", "Engineer", "Intern"]
        },
        {
            type: "input",
            message: "Please enter team member's ID #:",
            name: "id"
        },
        {
            type: "input",
            message: "Please enter team member's email:",
            name: "email"
        }])
        //creates space for the user to input the employee info unique to their role
        .then(function({name, role, id, email}) {
            let roleInfo = "";
            if (role === "Engineer"){
                roleInfo = "Github Username";
            } else if (role === "Intern"){
                roleInfo = "School Name";
            } else {
                roleInfo = "Office Number";
            }
            inquirer.prompt([{
                message: `Enter team member's ${roleInfo}`,
                name: "roleInfo"
            },
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["Yes", "No"],
            name: "moreMembers"
        }])
        //creates new members and then push them to the employee array
        .then(function({roleInfo, moreMembers}){
            let newMember;
            if  (role === "Engineer"){
                newMember = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } else {
                newMember = new Manager(name, id, email, roleInfo);
            }
            employees.push(newMember);
            addHTML(newMember).then(function(){
                if (moreMembers === "Yes"){
                    addMember();
                } else {
                    finishHTML();
                }
            });
        });
        });
}
function startHTML(){
    const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <body>
        <nav class= "navbar navbar-dark bg-dark mb-5">
        <span class="navbar-brand mb-0 h1 w-100 text-center>Team Profile</span>
        </nav>
        <div class="container">
        <div class="row">`;
fs.writeFile("./output/team.html", html, function(err){
    if (err) {
        console.log(err);
    }
});
console.log("start");
}

function addHTML(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("adding team member");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}
function finishHTML() {
    const HTML = `</div>
    </div>
    </body>
    </html>`;
    fs.appendFile("./output/team.html", html, functino(err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}

init();