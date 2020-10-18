module.exports = app => {
    const userController = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", userController.create);

    router.post("/filter", userController.findByFilter);
  
    // Retrieve all Services
    router.get("/", userController.findAll);
    // Retrieve a single Service with id
    router.get("/:id", userController.findOne);
  
    // Update a Service with id
    router.put("/:id", userController.update);
  
    // Delete a Service with id
    router.delete("/:id", userController.delete);
  
    app.use('/api/user', router);
  };