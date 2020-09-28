module.exports = app => {
    const loginController = require("../controllers/login.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/login", loginController.login);
	router.post("/authenticateToken", loginController.authenticateToken);
	router.get("/posts", loginController.authenticateToken, loginController.posts);
  
    app.use('/api/login', router);
  };