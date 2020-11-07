module.exports = app => {
  const fileUpload = require("../controllers/fileUpload.controller.js");

  var router = require("express").Router();

  // Create new media
  router.post("/", fileUpload.create);

  // Retrieve all media
  router.get("/", fileUpload.findAll);
  
  // Retrieve a single media with id
  router.get("/:id", fileUpload.findOne);
  
  // Delete a media with id
  router.delete("/:id", fileUpload.delete);

  // Delete all media
  router.delete("/", fileUpload.deleteAll);


  app.use('/api/file-upload', router);
};