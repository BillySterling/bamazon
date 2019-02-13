var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
//var table = require("table");
require('dotenv').config();
var pass_word = process.env.MYPASSWORD;

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
    // run the start function after the connection is made to prompt the user
    dispGoods();
  });

function dispGoods() {
    // set up display using cli-table package
    var table = new Table({
        head: ["Item Id","Product Name", "Department Name", "Price", "Stock Quantity"]
        , colWidths: [10, 20, 20, 20, 20]
    });
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products WHERE stock_quantity > 0 ORDER BY item_id;", function(err, results) {
        if (err) throw err;

    for (var i = 0; i < results.length; i++) {
        table.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
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
          message: "What is the Item Id of the product you want to buy?"
          },
        {
          name: "units",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        connection.query("SELECT item_id, price, stock_quantity FROM products WHERE item_id = ?;", 
          [answer.itemID],
          function(err, results) {
            debugger;
          if (err) throw err;
          if (results[0].stock_quantity < answer.units) {
            console.log("Sorry, insufficient stock on hand")
            connection.end();
          } else {
            var unitPrice = results[0].price;
            var updateQty = results[0].stock_quantity - answer.units;
            connection.query("UPDATE PRODUCTS SET ? WHERE ?;", 
            [{
            stock_quantity: updateQty
            },
            {
            item_id: answer.itemID
            }],
            function(error, res) {
              debugger;
            if (error) throw err;
            var custTotal = (unitPrice * answer.units);
            console.log("Your total is $" + roundTo(custTotal,2));
            //console.log("Your total is $" + custTotal);
        });
      }
    });
  });
};
function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
    n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {    
        n = (n * -1).toFixed(2);
    }
    return n;
}