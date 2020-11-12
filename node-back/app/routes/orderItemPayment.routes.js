module.exports = app => {
    const orderItemPayment = require("../controllers/orderItemPayment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", orderItemPayment.create);
    router.post("/filter", orderItemPayment.findByFilter);
    // Retrieve all Services
    router.get("/", orderItemPayment.findAll);
  
    // Retrieve all published Services
    //router.get("/published", orderItemPayment.findAllPublished);
  
    // Retrieve a single Service with id
    router.get("/:id", orderItemPayment.findOne);
  
    // Update a Service with id
    router.put("/:id", orderItemPayment.update);
  
    // Delete a Service with id
    router.delete("/:id", orderItemPayment.delete);
  
    // Delete all Services
    //router.delete("/", orderItemPayment.deleteAll);
  
    app.use('/api/orderItemPayment', router);
  };