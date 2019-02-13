mysql = require("mysql");
inquirer = require("inquirer");

connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "", //password here
    database:"bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected");
})

function displayItems(){
    console.log("\nItems availiable for sale: ");
    var query = "SELECT * from products";
    connection.query(query, function(err, res){
        for(var i = 0; i < res.length; i++){
            console.log("Product ID: "+res[i].id +" || Product Name: "+res[i].product_name+
            " || Department Name : "+ res[i].department_name+" || Price: "+res[i].price+
            " || Stock Quantity: "+res[i].stock_quantity+"\n--------------------");
        }
    });
}

function startApp(){
    inquirer
    .prompt([
        {
            name:"todo",
            type:"list",
            message:"\nWhat would you like to do...",
            choices:[
                "Display Items in Inventory",
                "Make Purchase",
                "Exit\n"
            ]
        }
    ]).then(function(response){
       switch(response.todo){
           case  "Display Items in Inventory":
           displayItems();
           startApp();
           break;

           case "Make Purchase":
           askID();
           break;

           case "Exit":
           connection.end();
           break;
       }
    });
}

function askID(){
    //displayItems();
    var prodID;
    inquirer
    .prompt([
    {
        name:"askID",
        type:"input",
        message:"Enter the ID of the product you would like to buy: ",
        validate: function(value){
            if(!isNaN(value)){
                return true;
            }
            return false;
        }
    },
    {
        name:"quantity",
        type: "input",
        message:"How many would you like to purchase: ",
        validate: function(value){
            if(!isNaN(value)){
                return true;
            }
            return false;
        }
    }
    ])
    .then(function(answer){
        query = "SELECT * from products WHERE ?";
        
        connection.query(query,{id: answer.askID}, function(err, res){
            
            console.log(res[0].stock_quantity);

            if(res[0].stock_quantity < answer.quantity){
                console.log("\nINSUFFICIENT QUANTITY\n");
                askID();
            }
            else{
                var totalPrice = res[0].price * answer.quantity;
                var remainStock = res[0].stock_quantity - answer.quantity;
                console.log("\n------------\nBuying "+
                answer.quantity+" "+res[0].product_name+"....\n");
                
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: remainStock
                        },
                        {
                            id: answer.askID
                        }
                    ],
                    function(error){
                        if(error) throw err;
                        console.log("Inventory Updated Successfully!\n");
                        console.log("Total cost: "+totalPrice+"\n-----------\n");
                        //askID();
                        startApp();
                    }
                );

            }
            
        })
    });
};
startApp();


