module.exports = app => {
    const service = require("../controllers/service.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", service.create);
  
    // Retrieve all Services
    router.get("/", service.findAll);
  
    // Retrieve all published Services
    router.get("/published", service.findAllPublished);
  
    // Retrieve a single Service with id
    router.get("/:id", service.findOne);
  
    // Update a Service with id
    router.put("/:id", service.update);
  
    // Delete a Service with id
    router.delete("/:id", service.delete);
  
    // Delete all Services
    router.delete("/", service.deleteAll);
  
    app.use('/api/services', router);
  };