const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { finished } = require("stream");
const employees = [];

var standardQuestions = [
   {
       type: "input",
       name: "name",
       message: "Please write employee's name:",
   },
   {
       type: "number",
       name: "id",
       message: "Please write employee's ID:",
   },
   {
       type: "input",
       name: "email",
       message: "Please write employee's email:",
   } 
]

const managerQuestion = 
    {
        type: "input",
        name: "officeNumber",
        message: "Please write manager's office number:",
    }

const engineerQuestion = {
    type: "input",
    name: "github",
    message: "Enter github username:",
}

const internQuestion = {
    type: "input",
    name: "school",
    message: "Enter school that intern has attended:",
}

function initialize(){
    inquirer.prompt([...standardQuestions, managerQuestion])
        .then(function({name, id, email, officeNumber}){
            const manager = new Manager(name, id, email, officeNumber);
            employees.push(manager);
            teamCreate();
        });
}

function createEngineer(){
    inquirer.prompt([...standardQuestions, engineerQuestion])
        .then(function({name, id, email, github}){
            const engineer = new Engineer(name, id, email, github);
            employees.push(engineer);
            teamCreate();
        });
}


function createIntern(){
    inquirer.prompt([...standardQuestions, internQuestion])
        .then(function({name, id, email, school}){
            const intern = new Intern(name, id, email, school);
            employees.push(intern);
            teamCreate();
        });
}

function teamCreate(){
    inquirer.prompt({
        type: "list",
        name: "type",
        message: "Choose the type of employee:",
        choices: ["Engineer", "Intern", "Finish"]
    }).then(function({type}) {
        if (type === "Engineer"){
            createEngineer();
        } else if (type === "Intern"){
            createIntern();
        } else {
            finish();
           console.log("success");
        }
    })
}

function finish() {
    const htmlOutput = render(employees);
    fs.writeFile(outputPath, (htmlOutput), (err) => {
        if (err) throw err;
    });
}

initialize();

