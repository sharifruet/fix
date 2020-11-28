
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//const env = "prd";
const env = "dev";


const app = express();
require('dotenv').config();

var corsOptions = {
 origin: "http://localhost:4200"
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

/***********************  FOR PRODUCTION *****************************/
//db.sequelize.sync();
/*********************************************************************/

/***********************  FOR DEVELOPMENT ****************************/
 db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
   require("./app/models/init.js")();
 });
/*********************************************************************/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Fix api" });
});

require("./app/routes/service.routes")(app);
require("./app/routes/service-subcategory.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/serviceCategory.routes")(app);
require("./app/routes/serviceHierarchy.routes")(app);
require("./app/routes/areaHierarchy.routes")(app);
require("./app/routes/login.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/role.routes")(app);

require("./app/routes/fileUpload.routes")(app);
require("./app/routes/privilege.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/orderItems.routes")(app);
require("./app/routes/orderItemPayment.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
