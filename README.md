# bamazon

#### Node.js &amp; MySQL Unit 12 Bootcamp CLI project

## Overview

`bamazonCustomer`

In this activity, we are creating an Amazon-like storefront with the MySQL skills learned this unit. The application will take in orders from customers and deplete stock from the store's inventory.  

`bamazonManager`

In this bonus activity, we are creating a product management console to augment the `bamazonCustomer` application.  

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

## Database

MySQL database: `bamazon`

Tables: `Products`

   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)

Unique key `UC_item` added to table to help prevent entry of duplicate products.

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
