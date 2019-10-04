let mysql = require("mysql");
let inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Shijiree9941!",
    database: "bamazon"
});

const checkIFExit = (choice) => {
    if (choice === "q") {
        console.log("Goodbye");
        process.exit(0);
    }
}

const checkInventory = (itemID, inventory) => {
    for (let index = 0; index < inventory.length; index++) {
        if (inventory[index].item_id === itemID) {
            return inventory[index];
        }
    }
    return null
}

const makePurchase = (product, quantity) => {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, product.item_id], function(err, res) {
        if (err) throw err;
        console.log("Successfully purchased " + quantity + " " + product.product_name);
        loadProduct();
    })
}

const promptCustomerForQuantity = (product) => {
    inquirer.prompt([{
        type: "input",
        name: "quantity",
        message: "How many items do you want[Quit with Q]",
        validate: function(val) {
            return val > 0 || val.toLowerCase() === 'q'
        }
    }]).then(function(val) {
        checkIFExit(val.quantity);
        let quantity = parseInt(val.quantity);

        if (quantity > product.stock_quantity) {
            console.log("Insufficient quantity");
            loadProduct();
        } else {
            makePurchase(product, quantity)
        }


    })
}


const promptCustomer = (inventory) => {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What is the ID of the item you like to purchase? [Quit with Q]",
        validate: function(val) {
            return !isNaN(val) || val.toLowerCase() === 'q'
        }
    }]).then(function(val) {
        checkIFExit(val.choice);
        let itemID = parseInt(val.choice);
        let product = checkInventory(itemID, inventory)
        console.log(product)
        if (product) {
            promptCustomerForQuantity(product);
        } else {
            console.log("\nThat item is not in the inventory");
            loadProduct();
        }
    })
}


const loadProduct = () => {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptCustomer(res)
    })
}

connection.connect(function(err) {
    if (err) throw err;
    loadProduct();
})