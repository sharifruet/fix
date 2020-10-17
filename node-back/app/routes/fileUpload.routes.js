module.exports = app => {
  const fileUpload = require("../controllers/fileUpload.controller.js");

  var router = require("express").Router();

  // Create a new Service
  router.post("/", fileUpload.create);


  app.use('/api/file-upload', router);
};