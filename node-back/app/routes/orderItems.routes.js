module.exports = app => {
    const orderItems = require("../controllers/orderItems.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", orderItems.create);
  router.post("/filter", orderItems.findByFilter);
    // Retrieve all Services
    router.get("/", orderItems.findAll);
  
    // Retrieve all published Services
    router.get("/published", orderItems.findAllPublished);
  
    // Retrieve a single Service with id
    router.get("/:id", orderItems.findOne);
  
    // Update a Service with id
    router.put("/:id", orderItems.update);
  
    // Delete a Service with id
    router.delete("/:id", orderItems.delete);
  
    // Delete all Services
    router.delete("/", orderItems.deleteAll);
  
    app.use('/api/orderItems', router);
  };