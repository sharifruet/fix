module.exports = app => {
    const areaHierarchyController = require("../controllers/areaHierarchy.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service AreaHierarchy
    router.post("/", areaHierarchyController.create);
  
    // Retrieve all Service AreaHierarchy
    router.get("/", areaHierarchyController.findAll);
  
    // Retrieve all published Service AreaHierarchy
    router.get("/published", areaHierarchyController.findAllPublished);
  
    // Retrieve a single Service AreaHierarchy with id
    router.get("/:id", areaHierarchyController.findOne);
  
    // Update a Service AreaHierarchy with id
    router.put("/:id", areaHierarchyController.update);
  
    // Delete a Service AreaHierarchy with id
    router.delete("/:id", areaHierarchyController.delete);
  
    // Delete all Service AreaHierarchies
    router.delete("/", areaHierarchyController.deleteAll);
  
    app.use('/api/area-hierarchy', router);
  };