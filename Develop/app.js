const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function app() {
    function addManager(){
            inquirer.prompt([
                {
                type: "input",
                message: "What is your full name?",
                name: "name",
                validate: name => {
                    const pass = name.match(
                        /^[A-Za-z]+$/
                    );
                    if(pass){
                        return true;
                    }
                    return "please input a school, jackass";
                }
                },
                {
                type: "input",
                message: "Please enter your ID",
                name: "id"
                },
                {
                type: "input",
                message: "Please enter your number",
                name: "officeNumber"
                },
                {
                type: "input",
                message: "Please enter your email",
                name: "email"
                }
            ])
            
            .then((res) => {
                
            })
        
        }
        function init () {
            inquirer.prompt(employeeQuestions)
            .then((inquirerResponse) => {
                var role = inquirerResponse.role;
                switch(role){
                    case "Manager":
                        addManager();
                        break;
                
                    case "Engineer":
                        addEngineer();
                        break;
               
                    case "Intern":
                        addIntern();
                        break;
              
                    case "Employee":
                        addEmployee();
                        break;
                    default: buildTeam();
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        init();
        }
        addManager();
        function addEngineer(){
            inquirer.prompt([
                {
                type: "input",
                message: "What is your full name?",
                name: "name"
                },
                {
                type: "input",
                message: "Please enter your ID",
                name: "id"
                },
                {
                type: "input",
                message: "Please enter your GitHub address",
                name: "github"
                },
                {
                type: "input",
                message: "Please enter your email",
                name: "email"
                }
            ])
    }
    addEngineer();
    function addIntern(){
        inquirer.prompt([
            {
            type: "input",
            message: "What is your full name?",
            name: "name",
            },
            {
            type: "input",
            message: "Please enter your ID",
            name: "id"
            },
            {
            type: "input",
            message: "Please enter your college name",
            name: "github"
            },
            {
            type: "input",
            message: "Please enter your email",
            name: "email"
            }

        ])}addIntern();}
        




app();