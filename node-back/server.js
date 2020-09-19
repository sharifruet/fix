
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
 origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
