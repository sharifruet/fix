module.exports = app => {
    const product = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", product.create);
  
    // Retrieve all Services
    router.get("/", product.findAll);
  
    // Retrieve all published Services
    router.get("/published", product.findAllPublished);
  
    // Retrieve a single Service with id
    router.get("/:id", product.findOne);
  
  
    // Update a Service with id
    router.put("/:id", product.update);
  
    // Delete a Service with id
    router.delete("/:id", product.delete);
  
    // Delete all Services
    router.delete("/", product.deleteAll);
  
  
    app.use('/api/products', router);
  };