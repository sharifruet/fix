module.exports = app => {
    const AreaHierarchy = require("../controllers/areaHierarchy.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service AreaHierarchy
    router.post("/", AreaHierarchy.create);
  
    // Retrieve all Service AreaHierarchy
    router.get("/", AreaHierarchy.findAll);
  
    // Retrieve all published Service AreaHierarchy
    router.get("/published", AreaHierarchy.findAllPublished);
  
    // Retrieve a single Service AreaHierarchy with id
    router.get("/:id", AreaHierarchy.findOne);
  
    // Update a Service AreaHierarchy with id
    router.put("/:id", AreaHierarchy.update);
  
    // Delete a Service AreaHierarchy with id
    router.delete("/:id", AreaHierarchy.delete);
  
    // Delete all Service AreaHierarchies
    router.delete("/", AreaHierarchy.deleteAll);
  
    app.use('/api/areahierarchy', router);
  };