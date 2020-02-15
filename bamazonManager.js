let mysql = require("mysql");
let inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Shijiree9941!",
  database: "bamazon"
});

const viewProductsForSale = () => {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
  });
};

const viewLowInventory = () => {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    let lowItems = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].stock_quantity < 5) {
        lowItems.push(res[i]);
      }
    }
    lowItems.length === 0
      ? console.log("No low inventory!")
      : console.log(lowItems);
  });
};

const promptQuantity = item => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "What is the quantity you want to add?"
      }
    ])
    .then(function(val) {
      let quantity = parseInt(val.choice);
      item.stock_quantity += quantity;
      viewProductsForSale();
    });
};

const addToInventory = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "add inventory",
        message: "Please enter the ID of the product you want to add:"
      }
    ])
    .then(function(val) {
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        let itemID = parseInt(val.choice);
        for (let index = 0; index < res.length; index++) {
          if (res[index].item_id === itemID) {
            promptQuantity(res[index]);
          }
        }
      });
    });
};

const addNewProduct = () => {
  let questions = [
    {
      type: "input",
      name: "product_name",
      message: "Please enter the product name:"
    },
    {
      type: "input",
      name: "department_name",
      message: "Please enter the department name:"
    },
    {
      type: "input",
      name: "price",
      message: "Please enter the product price:"
    },
    {
      type: "input",
      name: "stock_quantity",
      message: "Please enter the product quantity:"
    }
  ];

  inquirer.prompt(questions, function(answers) {
    console.log(answers.choice);
    viewProductsForSale();
  });
};

const promtManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message:
          "1. View Products for Sale \n 2. View Low Inventory \n 3. Add to Inventory \n 4. Add New Product \n Please enter a number between 1 to 4 [Quit with Q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      if (val.choice === "q" || val.choice === "Q") {
        console.log("Good bye!");
        process.exit(0);
      }

      let choice = parseInt(val.choice);

      switch (choice) {
        case 1:
          viewProductsForSale();
          promtManager();
          break;
        case 2:
          viewLowInventory();
          promtManager();
          break;

        case 3:
          addToInventory();
          promtManager();
          break;

        case 4:
          addNewProduct();
          promtManager();
          break;

        default:
          console.log("Invalid input! ");
          promtManager();
          break;
      }

      if (choice === 1) {
        viewProductsForSale();
        // promtManager();
      } else if (choice === 2) {
        viewLowInventory();
        // promtManager();
      } else if (choice === 3) {
        addToInventory();
        // promtManager();
      } else if (choice === 4) {
        addNewProduct();
        // promtManager()
      } else {
        console.log("Please enter a valid input! ");
        // promtManager();
      }
    });
};

promtManager();
