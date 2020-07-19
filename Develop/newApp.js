const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeeInfo = [];

function init(){
    //makeManager function
    function addManager(){
        inquirer.prompt([
            {
            type: "input",
            message: "What is your full name?",
            name: "manager",
            validate: name => {
                const pass = name.match(
                    /^[A-Za-z]+$/
                );
                if(pass){
                    return true;
                }
                return "please input a name, jackass";
            }
            },
            {
            type: "input",
            message: "Please enter your ID",
            name: "managerId"
            },
            {
            type: "input",
            message: "Please enter your office number",
            name: "managerOfficeNumber"
            },
            {
            type: "input",
            message: "Please enter your email",
            name: "managerEmail"
            }
        ])
        
        .then(userInput => {
            let manager = userInput.manager;
            let managerId = userInput.managerId;
            let managerEmail = userInput.managerEmail;
            let managerOfficeNumber = userInput.managerOfficeNumber;

            const managerInfo = new Manager(manager, managerId, managerEmail, managerOfficeNumber)
            employeeInfo.push(managerInfo)
            //newTeamMember();
            // console.log (employeeInfo);
            // console.log (userInput);
            createTeam();
        })
        .catch(error => {
            console.log("couldn't add members, please try again")
            console.log(error);
            process.exit(1);
        })
    
    }

    //createTeam function
    function createTeam(){
        inquirer.prompt([{
            type:"list",
            name: "teamChoice",
            message: "enter member type please",
            choices: ["Engineer", "Intern", "I'm done"],

        }])
        .then(choice=>{
            switch(choice.teamChoice){
                case "Engineer":
                    addEngineer();
                    break;
           
                case "Intern":
                    addIntern();
                    break;
                    default:createHTML();
            }
        })
    }

    //addEngineer function
    function addEngineer(){
        inquirer.prompt([
            {
            type: "input",
            message: "What is your full name?",
            name: "engineer",
            validate: name => {
                const pass = name.match(
                    /^[A-Za-z]+$/
                );
                if(pass){
                    return true;
                }
                return "please input a name, jackass";
            }
            },
            {
            type: "input",
            message: "Please enter your name",
            name: "engineer"
            },
            {
            type: "input",
            message: "Please enter your number",
            name: "engineerId"
            },
            {
            type: "input",
            message: "Please enter your email",
            name: "engineerEmail"
            },
            {
            type: "input",
            message: "What is your engineer's Github username?",
            name: "engineerGitHub"
            }
        ])
        
        .then(userInput => {
            let engineer = userInput.engineer;
            let engineerId = userInput.engineerId;
            let engineerEmail = userInput.engineerEmail;
            let engineerGitHub = userInput.engineerGitHub;

            const engineerInfo = new Engineer(engineer, engineerId, engineerEmail, engineerGitHub)
            employeeInfo.push(engineerInfo)
            //newTeamMember();
            // console.log (employeeInfo);
            // console.log (userInput);
            createTeam();
        })
        .catch(error => {
            console.log("couldn't add members, please try again")
            console.log(error);
            process.exit(1);
        })   
    }


    //addIntern function
    function addIntern(){
        inquirer.prompt([
            {
            type: "input",
            message: "What is your full name?",
            name: "engineer",
            validate: name => {
                const pass = name.match(
                    /^[A-Za-z]+$/
                );
                if(pass){
                    return true;
                }
                return "please input a name, jackass";
            }
            },
            {
            type: "input",
            message: "Please enter your name",
            name: "intern"
            },
            {
            type: "input",
            message: "Please enter your inter's ID",
            name: "internId"
            },
            {
            type: "input",
            message: "Please enter your intern's email",
            name: "internEmail"
            },
            {
            type: "input",
            message: "What is your intern's Github username?",
            name: "internSchool"
            }
        ])
        
        .then(userInput => {
            let intern = userInput.intern;
            let internId = userInput.internId;
            let internEmail = userInput.internEmail;
            let internSchool = userInput.internSchool;

            const internInfo = new Intern(intern, internId, internEmail, internSchool)
            employeeInfo.push(internInfo)
            //newTeamMember();
            // console.log (employeeInfo);
            // console.log (userInput);
            createTeam();
        })
        .catch(error => {
            console.log("couldn't add members, please try again")
            console.log(error);
            process.exit(1);
        })
    
    }

    
    //createTeam function
    function createHTML() {
        // Create the output directory if the output path doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        const myTeam = fs.readFileSync("./templates/main.html");
        fs.writeFileSync(outputPath, render(employeeInfo), "utf-8");
        }

    addManager();   
}
init();
