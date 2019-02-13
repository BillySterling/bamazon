var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
//var table = require("table");
require('dotenv').config();
var pass_word = process.env.MYPASSWORD;
//var nbrEntries = 0;
var option = "";

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: pass_word,
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the manager console function after the connection is made to prompt the user
    mgrConsole();
  });

function mgrConsole() {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Management Console Options",
            choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
        }
    ]).then(function(choice) {  
        option = choice.option;
        getInput(option);  
    });
};

function getInput(option) {
    switch(option) {
        case "View Products for Sale":
            viewInventory();
            break;
        case "View Low Inventory":
            viewLowInventory();
            break;
        case "Add to Inventory":
            addToInventory();
            break;
        case "Add New Product":
            addNewProduct();
            break;
        default:
            console.log("*** INVALID INPUT *** \n\n");
    }; 
};

function viewInventory() {
    var table = new Table({
        head: ["Item Id","Product Name", "Department Name", "Price", "Stock Quantity"]
        , colWidths: [10, 45, 20, 20, 20]
    });    
    connection.query("SELECT * FROM products;", function(err, results) {
        if (err) throw err;
    // build display table array
    for (var i = 0; i < results.length; i++) {
        table.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        };
    console.log(table.toString());
    reRun();
    });
};

function viewLowInventory() {
    var table = new Table({
        head: ["Item Id","Product Name", "Department Name", "Price", "Stock Quantity"]
        , colWidths: [10, 45, 20, 20, 20]
    });
    connection.query("SELECT * FROM products WHERE stock_quantity < 5;", function(err, results) {
        if (err) throw err;
    // build display table array
    for (var i = 0; i < results.length; i++) {
        table.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        };
    console.log(table.toString());
    reRun();
    });
};

function addToInventory() {
    inquirer
      .prompt([
        {
          name: "itemID",
          type: "input",
          message: "Item Id of the product you want to add to?",
          validate: function validateData(name){
            return name !== '';
          }
        },
        {
          name: "units",
          type: "input",
          message: "How many would you like to add?",
          validate: function validateData(name){
            return name !== '' && name != 0;
          }        
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        connection.query("SELECT item_id, price, stock_quantity FROM products WHERE item_id = ?;", 
            [answer.itemID],
            function(err, results) {
            if (err) throw err;
        // update selected item's quantity
        var updateQty = results[0].stock_quantity + parseInt(answer.units);
        connection.query("UPDATE products SET ? WHERE ?;", 
            [{
            stock_quantity: updateQty
            },
            {
            item_id: answer.itemID
            }],
            function(error, res) {
            if (error) throw err;
        });

        connection.query("SELECT * FROM products WHERE item_id = ?;", 
            [answer.itemID],
            function(err, results) {
            if (err) throw err;
            console.log("\nUpdate complete\n");
            var table = new Table({
                head: ["Item Id","Product Name", "Department Name", "Price", "Stock Quantity"]
                , colWidths: [10, 45, 20, 20, 20]
            });   
            table.push([results[0].item_id, results[0].product_name, results[0].department_name, results[0].price, results[0].stock_quantity]);
            console.log(table.toString());
            reRun();
            });    
        });
    });
};

function addNewProduct() {
    console.log("=====Adding New Product=====\b")
    inquirer
      .prompt([
        {
          name: "productName",
          type: "input",
          message: "Product Name?",
          validate: function validateData(name){
            return name !== '';
          }
        },
        {
            name: "departmentName",
            type: "input",
            message: "Department Name?",
            validate: function validateData(name){
              return name !== '';
            }
          },
          {
            name: "unitPrice",
            type: "input",
            message: "Unit Price (dollars.cents)?",
            validate: function validateData(name){
              return name !== '' && name != 0;
            }
          },
        {
          name: "units",
          type: "input",
          message: "Quantity?",
          validate: function validateData(name){
            return name !== '' && name != 0;
          }        
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?);",
            [answer.productName,
             answer.departmentName,
             answer.unitPrice,
             answer.units],
            function(err, results) {
            if (err) {
                console.log("\nProduct ***NOT*** Added\n");
                console.log(err.sqlMessage)
                console.log("\n");
            } else {
                console.log("\nProduct Added\n");
            };
            reRun();
            });
        });
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
//            nbrEntries = 0;
            mgrConsole();
        }
        else {
            logText = "\nThank you - goodbye\n";
            // close db connection
            connection.end();
        }
    });
};