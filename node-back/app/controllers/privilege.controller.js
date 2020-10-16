const db = require("../models");
const privilegeModel = db.Privilege;
const Op = db.Sequelize.Op;

// Create and Save a new Service
exports.create = (req, res) => {

  console.log('Role');
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        status:2,
        message: "'name' can not be empty!"
      });
      return;
    }
    // Create a Service
  const privilege = {
    name: req.body.name,
    description: req.body.description? req.body.description : '',
	status: req.body.status? req.body.status : 0,
	menu: req.body.menu? req.body.menu : null,
  };

  addEntity(privilegeModel, privilege, (result) => {
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }

  });
}

// Retrieve all Service from the database.
exports.findAll = (req, res) => {
    const filter = {};
    getByFilter(privilegeModel, filter, (result) => {
      if (result.status == 0) {
        res.send(result);
      } else {
        res.status(500).send(result);
      }
    });
  }

// Find a single Service with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    getById (privilegeModel, id, (result) => {
      if (result.status == 0) {
        res.send(result);
      } else {
        res.status(500).send(result);
      }
    });
  }

// Update a Service by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    updateEntity(privilegeModel, req.body,id, (result)=>{
      if (result.status == 0) {
        res.send(result);
      } else {
        res.status(500).send(result);
      }
    });
     
  }

// Delete a Service with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    privilegeModel.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Service with id=" + id
        });
      });
  };


  
  // Find all isEnd Service
exports.findByFilter = (req, res) => {
  getByFilter(privilegeModel, req.body,(result)=>{
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });
};
