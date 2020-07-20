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
            message: "What is your Manager's name?",
            name: "manager",
            validate: name => {
                const pass = name.match(
                    /^[A-Za-z]+$/
                );
                if(pass){
                    return true;
                }
                return "please input a manager name";
            }
            },
            {
            type: "input",
            message: "Please enter your Manager ID",
            name: "managerId",
            validate: id => {
                const pass = id.match(
                    /^[0-9]+$/
                );
                if (pass) {
                    return true;
                }
                return 'You must input a number.'
                }
            },
            {
            type: "input",
            message: "Please enter your manager's office number, numbers only please",
            name: "managerOfficeNumber",
            validate: officeNumber => {
                const pass = officeNumber.match(
                    /^[0-9]+$/
                );
                if (pass) {
                    return true;
                }
                return 'You must enter numbers only in the office number.'
                }
            },
            {
            type: "input",
            message: "Please enter your managers's email",
            name: "managerEmail",
            validate:(email) => {
                const pass = email.match(
                    /.com/
                )
                if (pass) {
                    return true;   
                }
                return 'You must input an email with a .com.'
            }
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
            message: "Please enter next member type please",
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
            message: "What is your Engineer's first name?",
            name: "engineer",
            validate: name => {
                const pass = name.match(
                    /^[A-Za-z]+$/
                );
                if(pass){
                    return true;
                }
                return "please input a name";
            }
            },
            {
            type: "input",
            message: "Please enter your Engineer ID number",
            name: "engineerId",
            validate: id => {
                const pass = id.match(
                    /^[0-9]+$/
                );
                if (pass) {
                    return true;
                }
                return 'You must input a number.'
                }
            },
            {
            type: "input",
            message: "Please enter your Engineer's email",
            name: "engineerEmail",
            validate:(email) => {
                const pass = email.match(
                    /.com/
                )
                if (pass) {
                    return true;   
                }
                return 'You must input an email with a .com.'
            }
            },
            {
            type: "input",
            message: "What is your Engineer's Github username?",
            name: "engineerGitHub",
            validate: name => {
                const pass = name.match(
                    /^[A-Za-z]+$/
                );
                if(pass){
                    return true;
                }
                return "please input a GitHub user name";
            }
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
            message: "What is your Intern's name?",
            name: "intern",
            validate: name => {
                const pass = name.match(
                    /^[A-Za-z]+$/
                );
                if(pass){
                    return true;
                }
                return "please input a name";
            }
            },
            {
            type: "input",
            message: "Please enter your Intern's ID",
            name: "internId",
            validate: id => {
                const pass = id.match(
                    /^[0-9]+$/
                );
                if (pass) {
                    return true;
                }
                return 'You must input a number.'
                }
            },
            {
            type: "input",
            message: "Please enter your Intern's email",
            name: "internEmail",
            validate:(email) => {
                const pass = email.match(
                    /.com/
                )
                if (pass) {
                    return true;   
                }
                return 'You must input an email with a .com.'
            }
            },
            {
            type: "input",
            message: "What is your Intern's college name?",
            name: "internSchool",
            validate: name => {
                const pass = name.match(
                    /^[A-Za-z]+$/
                );
                if(pass){
                    return true;
                }
                return "please input a school name";
            }
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
