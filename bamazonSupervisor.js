var mysql = require("mysql");
var inquirer = require("inquirer");
// CLI table utility
var Table = require('cli-table');
require('dotenv').config();
var pass_word = process.env.MYPASSWORD;
var lastIndex = 0;

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password (held in .env file)
  password: pass_word,
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    supvConsole();
  });

function supvConsole() {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Supervisor Console Options",
            choices: ["View Product Sales by Department","Create New Department"]
        }
    ]).then(function(choice) {  
        option = choice.option;
        getInput(option);  
    });
};

function getInput(option) {
    switch(option) {
        case "View Product Sales by Department":
            viewSales();
            break;
        case "Create New Department":
            addDepartment();
            break;
        default:
            console.log("*** INVALID INPUT *** \n\n");
    }; 
};

function viewSales() {
    var table = new Table({
        head: ["Dept Id", "Department Name", "Overhead Costs", "Product Sales", "Total Profit"]
        , colWidths: [10, 45, 20, 20, 20]
    });
    // create SQL view of the products and departments tables, calculating total sales   
    connection.query("CREATE OR REPLACE VIEW `deptsummary` AS SELECT d.department_id, d.department_name,  d.over_head_costs, sum(p.product_sales) AS total_sales FROM departments d INNER JOIN products p ON d.department_name = p.department_name GROUP BY p.department_name ORDER BY p.department_name;", function(err, results) {
        if (err) throw err;
        // extract profit date from the just-created view
        connection.query("SELECT department_id, department_name, over_head_costs, total_sales AS product_sales, total_sales-over_head_costs AS total_profit FROM deptsummary ORDER BY department_name;", function(err, results) {
            if (err) throw err;
            // build display table array
            for (var i = 0; i < results.length; i++) {
                table.push([results[i].department_id, results[i].department_name, results[i].over_head_costs, results[i].product_sales, results[i].total_profit]);
                };
            console.log(table.toString());
            reRun();
            });
        });
};

function addDepartment() {
    console.log("addDepartment selected");
};

//option to run console again or exit
function reRun() {
    inquirer.prompt([
        {
        type: "list",
        message: "Another transaction or exit?",
        choices: ["Transaction", "Exit"],
        name: "again"
        }
    ]).then(function(resp) {
        var answer = resp.again;
        if (answer === "Transaction") {
            supvConsole();
        }
        else {
            logText = "\nThank you - goodbye\n";
            // close db connection
            connection.end();
        }
    });
};