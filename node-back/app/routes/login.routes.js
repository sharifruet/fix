module.exports = app => {
    const loginController = require("../controllers/login.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Service
    router.post("/login", loginController.login);
    router.post("/authenticateToken", loginController.authenticateToken);
    router.post("/refresh-token", loginController.refreshToken);
    router.post("/logout", loginController.deleteToken);
    router.get("/posts", loginController.authenticateToken, loginController.posts);
    router.get("/otp-signup/:phone", loginController.signupOTP);
    router.post("/otp-verify", loginController.verifyOTP);
    
  
    app.use('/api/auth', router);
  };