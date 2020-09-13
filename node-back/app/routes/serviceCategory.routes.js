module.exports = app => {
    const serviceCategory = require("../controllers/serviceCategory.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", serviceCategory.create);
  
    // Retrieve all Services
    router.get("/", serviceCategory.findAll);
  
    // Retrieve all published Services
    router.get("/published", serviceCategory.findAllPublished);
  
    // Retrieve a single Service with id
    router.get("/:id", serviceCategory.findOne);
  
    // Update a Service with id
    router.put("/:id", serviceCategory.update);
  
    // Delete a Service with id
    router.delete("/:id", serviceCategory.delete);
  
    // Delete all Services
    router.delete("/", serviceCategory.deleteAll);
  
    app.use('/api/service-category', router);
  };