module.exports = app => {
    const ServiceSubcategory = require("../controllers/service-subcategory.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service sub category
    router.post("/", ServiceSubcategory.create);
  
    // Retrieve all Service sub-categories
    router.get("/", ServiceSubcategory.findAll);
  
    // Retrieve all published Service sub-categories
    router.get("/published", ServiceSubcategory.findAllPublished);
  
    // Retrieve a single Service sub-category with id
    router.get("/:id", ServiceSubcategory.findOne);
  
    // Update a Service sub-category with id
    router.put("/:id", ServiceSubcategory.update);
  
    // Delete a Service sub-category with id
    router.delete("/:id", ServiceSubcategory.delete);
  
    // Delete all Service sub-categories
    router.delete("/", ServiceSubcategory.deleteAll);
  
    app.use('/api/servicesubcategory', router);
  };