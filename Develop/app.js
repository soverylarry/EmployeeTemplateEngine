const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const chooseRole = [
    {   
        type: "list",
        message: "Please choose an emplo role",
        name: "role",
        choices: ["Manager", "Engineer", "Intern", "Employee", "Exit"]
    },
]


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
            
            .then(userInput => {
                let manager = userInput.manager;
                let managerId = userInput.managerId;
                let managerEmail = userInput.managerEmail;
                let managerOfficeNumber = userInput.managerOfficeNumber;
    
                const managerInfo = new Manager(manager, managerId, managerEmail, managerOfficeNumber)
                employeeInfo.push(managerInfo)
                newTeamMember();
            })
            .catch(error => {
                console.log("couldn't add members, please try again")
                console.log(error);
                process.exit(1);
            })
        
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
   // addEngineer();
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

        ])}
        //addIntern();
        
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
            });
            function buildTeam() {
                // Create the output directory if the output path doesn't exist
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR)
                }
                const myTeam = fs.readFileSync("./templates/main.html");
                fs.writeFileSync(outputPath, render(teamMembers), myTeam, "utf-8");
                }
        }
        init();
        }
app();