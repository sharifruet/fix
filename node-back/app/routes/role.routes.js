module.exports = app => {
    const roleController = require("../controllers/role.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", roleController.create);

    router.post("/filter", roleController.findByFilter);
  
    // Retrieve all Services
    router.get("/", roleController.findAll);
    // Retrieve a single Service with id
    router.get("/:id", roleController.findOne);
  
    // Update a Service with id
    router.put("/:id", roleController.update);
  
    // Delete a Service with id
    router.delete("/:id", roleController.delete);
  
    app.use('/api/role', router);
  };