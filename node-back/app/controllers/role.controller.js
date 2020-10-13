const db = require("../models");
const roleDao = db.roleDao;
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
  const role = {
    name: req.body.name,
    description: req.body.description,
	  status: req.body.status? req.body.status : 0,
  };

  addEntity(roleDao, role, (result) => {
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
    getByFilter(roleDao, filter, (result) => {
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
  
    getById (roleDao, id, (result) => {
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
  
    updateEntity(roleDao, req.body,id, (result)=>{
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
  
    roleDao.destroy({
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
  getByFilter(roleDao, req.body,(result)=>{
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });
};
