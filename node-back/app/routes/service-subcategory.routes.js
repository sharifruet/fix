module.exports = app => {
    const ServiceSubcategory = require("../controllers/service-subcategory.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", ServiceSubcategory.create);
  
    // Retrieve all Services
    router.get("/", ServiceSubcategory.findAll);
  
    // Retrieve all published Services
    router.get("/published", ServiceSubcategory.findAllPublished);
  
    // Retrieve a single Service with id
    router.get("/:id", ServiceSubcategory.findOne);
  
    // Update a Service with id
    router.put("/:id", ServiceSubcategory.update);
  
    // Delete a Service with id
    router.delete("/:id", ServiceSubcategory.delete);
  
    // Delete all Services
    router.delete("/", ServiceSubcategory.deleteAll);
  
    app.use('/api/servicesubcategory', router);
  };