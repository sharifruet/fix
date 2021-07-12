module.exports = app => {
    const userService = require("../controllers/userService.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/", userService.create);
  
  
    app.use('/api/user-service', router);
  };