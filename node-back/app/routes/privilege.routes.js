module.exports = app => {
    const privilegeController = require("../controllers/privilege.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", privilegeController.create);

    router.post("/filter", privilegeController.findByFilter);
  
    // Retrieve all Services
    router.get("/", privilegeController.findAll);
    // Retrieve a single Service with id
    router.get("/:id", privilegeController.findOne);
  
    // Update a Service with id
    router.put("/:id", privilegeController.update);
  
    // Delete a Service with id
    router.delete("/:id", privilegeController.delete);
  
    app.use('/api/privilege', router);
  };