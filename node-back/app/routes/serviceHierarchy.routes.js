module.exports = app => {
    const serviceHierarchy = require("../controllers/serviceHierarchy.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", serviceHierarchy.create);
  
    // Retrieve all Services
    router.get("/", serviceHierarchy.findAll);
  
    // Retrieve all published Services
   // router.get("/published", serviceHierarchy.findAllPublished);

    router.post("/filter", serviceHierarchy.findByFilter);
	
    // Retrieve a single Service with id
    router.get("/:id", serviceHierarchy.findOne);
  
    // Update a Service with id
    router.put("/:id", serviceHierarchy.update);
  
    // Delete a Service with id
    router.delete("/:id", serviceHierarchy.delete);
  
    // Delete all Services
    router.delete("/", serviceHierarchy.deleteAll);
  
    app.use('/api/service-hierarchy', router);
  };