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

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    dispGoods();
  });

function dispGoods() {
    // set up display using cli-table package
    var table = new Table({
        head: ["Item Id","Product Name", "Department Name", "Price", "Stock Quantity"]
        , colWidths: [10, 45, 20, 20, 20]
    });
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products WHERE stock_quantity > 0;", function(err, results) {
    if (err) throw err;
    // build display table array
    for (var i = 0; i < results.length; i++) {
        table.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        lastIndex = results[i].item_id;  // save number of entries in database for later audit 
        };
    console.log("\n\n")
    console.log(table.toString());
    buyGoods();
    });
};

function buyGoods() {
    inquirer
      .prompt([
        {
          name: "itemID",
          type: "input",
          message: "What is the Item Id of the product you want to buy?",
          validate: function validateData(name){
            return name !== '' && name <= lastIndex;
          }
        },
        {
          name: "units",
          type: "input",
          message: "How many would you like to buy?",
          validate: function validateData(name){
            return name !== '' && name != 0;
          }        
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        connection.query("SELECT item_id, price, stock_quantity, product_sales FROM products WHERE item_id = ?;", 
          [answer.itemID],
          function(err, results) {
          if (err) throw err;
          // error if insufficiet stock on hand
          if (results[0].stock_quantity < answer.units) {
            console.log("\nSorry, insufficient stock on hand\n")
            reRun();
          } else {
            // update selected item's quantity
            // calculate and update product sales values
            var unitPrice = results[0].price;
            var updateQty = results[0].stock_quantity - parseInt(answer.units);
            var custTotal = (unitPrice * answer.units);
            var productSales = custTotal + results[0].product_sales;
            connection.query("UPDATE products SET ? , ? WHERE ?;", 
            [{
            stock_quantity: updateQty
            },
            {
            product_sales: productSales
            },
            {
            item_id: answer.itemID
            }],
            function(error, res) {
            if (error) throw err;
            // display transaction total to user
            console.log("\nYour total is $" + custTotal.toFixed(2) + "\n");
            reRun();
        });
      }
    });
  });
};

//option to shop again or exit
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
          dispGoods();
      }
      else {
          logText = "\nThank you - goodbye\n";
          // close db connection
          connection.end();
      }
  });
};