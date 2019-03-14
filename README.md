# bamazon

Node.js &amp; MySQL CLI application.

## Overview

`bamazonCustomer`

This is an Amazon-like storefront using a command line order entry application. The application will take in orders from customers and deplete stock from the store's inventory. 

`bamazonManager`

This is a command line product management console to augment the `bamazonCustomer` application.  

`bamazonSupervisor`

This is a command line department supervisor console to track product sales across our store's departments and then provide a summary of the highest-grossing departments in the store.

## Packages Required:

Dotenv module that loads environment variables from a .env file (in this case the database password): 
[DotEnv](https://www.npmjs.com/package/dotenv)

Interactive Command Line User Interfaces:
[Inquirer](https://www.npmjs.com/package/inquirer)

Command line table utility that allows you to render unicode-aided tables on the command line from your node.js scripts.
[cli-table](https://www.npmjs.com/package/cli-table)

A node.js driver for mysql database access:
[mysql](https://www.npmjs.com/package/mysql)

## Installation

In order to run this application locally you will need to install the following npm packages (as referenced above):

* npm install dotenv
* npm install inquirer
* npm install cli-table
* npm install mysql

Create a `.env` file in the project root directory and add `MYPASSWORD=<your_mySQL_database_password>`

## Database

MySQL database: `bamazon`

Tables: `products`

   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)
   * product_sales (cumulative product sales value)

Unique key `UC_item` added to table to prevent entry of duplicate products.

Tables: `departments`

   * item_id (unique id for each department)
   * department_name
   * over_head_costs (cost of doing business per department)

Unique key `UC_item` added to table to prevent entry of duplicate departments.

## Usage

`node bamazonCustomer.js`

Running this application will display the contents of the `products` table contained in the `bamazon` database.  The application will then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

The application will check if the store has enough of the product to meet the customer's request.  

Audits are in place to not allow the following conditions:

   * sales where insufficient quantity exists to fulfil the desired purchase quantity.
   * users cannot select an item ID not present in the products table.
   * users cannot select zero quantity for purchase.

If the above criteria are met the customer's order will be fulfilled.
   * update the SQL database to reflect the remaining quantity.
   * Once updated, show the customer the total cost of their purchase.

`node bamazonManager.js`

Running this application will:
   * List a set of menu options:
   * View Products for Sale   
   * View Low Inventory  
   * Add to Inventory    
   * Add New Product

Selection Description:

   * If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.
   * If a manager selects `View Low Inventory`, then the app will list all items with an inventory count lower than five.
   * If a manager selects `Add to Inventory`, the app will display a prompt that will let the manager "add more" of any item currently in the store.
   * If a manager selects `Add New Product`, the app will allow the manager to add a completely new product to the store.


`node bamazonSupervisor.js`

Running this application will:
   * List a set of menu options:
   * View product sales information by department   
   * Create a new department  

Selection Description:

   * If a supervisor selects `View Product Sales by Department`, the app will allow the supervisor to add a completely new department to the store.

   * If a supervisor selects `Add New Department`, the app will allow the supervisor to view overhead costs, total product sales, and calculated total profits by department.

Audits are in place to not allow the following conditions:

   * users cannot enter duplicate departments.
   * users cannot select zero value for overhead costs.

## Demo

A demo video of this assignment can be viewed [here](https://drive.google.com/file/d/1iYRZFIko-9r5FC3OMPsxPQTtllBH8Cof/view?usp=sharing)