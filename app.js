const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");

const teamMembers = [];
const idArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// I could create an array for general(common) questions and role specific questions, then I could concatenate the arrays of questions inside the function for the
// respective role. Then pass that new array into inquirer and work from there.

  /**
   * @todo if choice is not engineer, intern, or manager, call buildTeam();
   */
  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which type of team member would you like to add?",
          name: "addMember",
          choices: ["Engineer", "Intern", "Manager", "I don't need to add a member"],
          validate: answer => {
           console.log(answer);
            if (answer === "I don't need to add a member") {
              buildTeam();
            }
          }
        }
      ]).then(userChoice => {
    switch(userChoice.addMember) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          case "Manager":
            addManager();
            break;
          default:
            buildTeam();        
        }
      });
  }

  // need different prompts for engineer
  function addEngineer() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is your github?",
        name: "addGitHub",
      },
      {
        type: "input",
        message: "What is the user's name?",
        name: "addName",
        validate: answer => {
          if (answer !== "") {
            return true; 
          }
          return "Enter a valid name";
        }
      },
      {
        type: "input",
        message: "What is your ID number?",
        name: "addID",
        validate: answer => {
          const valid = answer.match(/^[1-9]\d*$/);
          if (valid ) {
            if (idArray.includes(answer)) {
              return "This ID is taken already, enter a different ID.";
            }
            else {
              return true;
            }
          }
          return "Please enter positive number greater than 0."
        }
      },
      {
        type: "input",
        message: "What is the employee's email?",
        name: "addEmail",
        validate: answer => {
          const valid = answer.match(/\S+@\S+\.\S+/);
          if (valid) {
            return true;
          }
          return "Please enter a valid email."
        }
      }
    ]).then(userChoice => {
        const engineer = new Engineer(userChoice.addName, userChoice.addID, userChoice.addEmail, userChoice.addGitHub);        
        teamMembers.push(engineer);
        idArray.push(userChoice.addID) 
      console.log(engineer);
      createTeam();
      });
  }

  function addIntern() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What school does the intern currently attend?",
        name: "addSchool"
      },
      {
        type: "input",
        message: "What is the user's name?",
        name: "addName",
        validate: answer => {
          if (answer !== "") {
            return true; 
          }
          return "Enter a valid name";
        }
      },
      {
        type: "input",
        message: "What is your ID number?",
        name: "addID",
        validate: answer => {
          const valid = answer.match(/^[1-9]\d*$/);
          if (valid ) {
            if (idArray.includes(answer)) {
              return "This ID is taken already, enter a different ID.";
            }
            else {
              return true;
            }
          }
          return "Please enter positive number greater than 0."
        }
      },
      {
        type: "input",
        message: "What is the employee's email?",
        name: "addEmail",
        validate: answer => {
          const valid = answer.match(/\S+@\S+\.\S+/);
          if (valid) {
            return true;
          }
          return "Please enter a valid email."
        }
      }
    ]).then(userChoice => {
      const intern = new Intern(userChoice.addName, userChoice.addID, userChoice.addEmail, userChoice.addSchool);        
      teamMembers.push(intern);
      idArray.push(userChoice.addID) 
    console.log(intern);
    createTeam();
    });
  }
  
  function buildTeam() {
    if(!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath,render(teamMembers),"utf-8");
  }

  function addManager() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the manager's office number?",
        name: "addOfficeNum"
      },
      {
        type: "input",
        message: "What is the user's name?",
        name: "addName",
        validate: answer => {
          if (answer !== "") {
            return true; 
          }
          return "Enter a valid name";
        }
      },
      {
        type: "input",
        message: "What is your ID number?",
        name: "addID",
        validate: answer => {
          const valid = answer.match(/^[1-9]\d*$/);
          if (valid ) {
            if (idArray.includes(answer)) {
              return "This ID is taken already, enter a different ID.";
            }
            else {
              return true;
            }
          }
          return "Please enter positive number greater than 0."
        }
      },
      {
        type: "input",
        message: "What is the employee's email?",
        name: "addEmail",
        validate: answer => {
          const valid = answer.match(/\S+@\S+\.\S+/);
          if (valid) {
            return true;
          }
          return "Please enter a valid email."
        }
      }
    ]).then(userChoice => {
      const manager = new Manager(userChoice.addName, userChoice.addID, userChoice.addEmail, userChoice.addOfficeNum);       
      teamMembers.push(manager);
      idArray.push(userChoice.addID) 
    console.log(manager);
    createTeam();
    });
  }

createTeam();

// copy paste the questions back into their respective functions

//  createManager();

// inputting of intern, engineer, create manager function



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// Call create team function at the end of each function
