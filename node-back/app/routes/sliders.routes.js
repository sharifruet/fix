module.exports = app => {
    const sliders = require("../controllers/sliders.controller.js");
  
    var router = require("express").Router();
  
    // Create a new slider
    router.post("/", sliders.create);
  
    // Retrieve all sliders
    router.get("/", sliders.findAll);
  
    // Retrieve all published sliders
    router.get("/published", sliders.findAllPublished);
	
    // Retrieve a single slider with id
    router.get("/:id", sliders.findOne);
  
    // Update a slider with id
    router.put("/:id", sliders.update);
  
    // Delete a slider with id
    router.delete("/:id", sliders.delete);
  
    // Delete all sliders
    router.delete("/", sliders.deleteAll);
  
    app.use('/api/sliders', router);
  };