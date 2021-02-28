//======== Dependencies===================//
// prettify output
const consoleTable = require('console.table');
// inquirer
const inquirer = require("inquirer");
// db connection
const mysql = require('mysql');
// creates connection to sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your username
    user: 'root',
    // Your password
    password: 'password',
    database: 'employee-tracker'
})
// connection.connect(err => {
//     if (err) throw err;
//     console.log('connected as id ' + connection.threadId);
//     StartTracker();
//   });
// prompts user with list of options to choose from
function StartTracker() {
    inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'Welcome to the Employee Tracker app! Please select the following options!',
            choices: [
                    'View all employees',
                    'View all departments',
                    'View all roles',
                    'Add an employee',
                    'Add a department',
                    'Add a role',
                    'EXIT'
                    ]
            }).then(function (answer) {
                switch (answer.choice) {
                    case 'View all employees':
                        viewEmployees();
                        break;
                    case 'View all departments':
                        viewDepartments();
                        break;
                    case 'View all roles':
                        viewRoles();
                        break;
                    case 'Add an employee':
                        addEmployee();
                        break;
                    case 'Add a department':
                        addDepartment();
                        break;
                    case 'Add a role':
                        addRole();
                        break;
                    case 'EXIT': 
                        exitApp();
                        break;
                    default:
                        break;
                }
        })
};

// view all employees in the database
function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res); 
        StartTracker();
    })
};

// view all departments in the database
function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        StartTracker();
    })
};

// view all roles in the database
function viewRoles() {
    var query = 'SELECT * FROM employeerole';
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        StartTracker();
    })
};

// add an employee to the database
function addEmployee() {
    connection.query('SELECT * FROM employeerole', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'firstname',
                    type: 'input', 
                    message: "What is the employee's fist name? ",
                },
                {
                    name: 'lastname',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'employeerole', 
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is this employee's role? "
                }
                ]).then(function (answer) {
                    let role_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            role_id = res[a].id;
                            console.log(role_id)
                        }                  
                    }  
                    connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        firstname: answer.firstname,
                        lastname: answer.lastname,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        StartTracker();
                    })
                })
        })
};

// add a department to the database
function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                connection.query(query, function(err, res) {
                if(err)throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                StartTracker();
                })
            })
};

// add a role to the database
function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            connection.query(
                'INSERT INTO employeerole SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    StartTracker();
                })
        })
    })
};

// exit the app
function exitApp() {
    connection.end();
};

StartTracker();