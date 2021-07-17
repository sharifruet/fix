module.exports = app => {
    const userService = require("../controllers/userService.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user service
    router.post("/", userService.create);
    // Get all user services
    router.get("/", userService.findAll);
    // Delete specefic user service
    router.delete("/:id", userService.delete);
  
  
    app.use('/api/user-service', router);
  };