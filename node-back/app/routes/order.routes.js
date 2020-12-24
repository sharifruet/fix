module.exports = app => {
    const order = require("../controllers/order.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", order.create);

    router.post("/filter", order.findByFilter);
    
    // Retrieve all Services
    router.get("/", order.findAll);
  
    // Retrieve all published Services
    //router.get("/published", order.findAllPublished);
  
    // Retrieve a single Service with id
    router.get("/:id", order.findOne);
  
    // Update a Service with id
    router.put("/:id", order.update);
  
    // Delete a Service with id
    router.delete("/:id", order.delete);
  
    // Delete all Services
   // router.delete("/", order.deleteAll);
  
    app.use('/api/order', router);
  };