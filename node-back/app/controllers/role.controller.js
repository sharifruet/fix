const { Privilege } = require("../models");
const db = require("../models");
const Role = db.Role;
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

  const privileges = req.body.roles?req.body.privileges:[];

  addEntity(Role, role, (result) => {
    if (result.status == 0) {

      let roleObj = result.data;
      privileges.forEach(privilege => {
        roleObj.addRole(privilege.id);
      });

      res.send(result);
    } else {
      res.status(500).send(result);
    }

  });
}

// Retrieve all roles from the database.
exports.findAll = (req, res) => {
  const filter = {};
  Role.findAll({ include: Privilege, where: filter })
    .then(data => {
      res.send({
        status:0,
        message:'Fetch successful',
        data:data});
    })
    .catch(err => {
      res.status(500).send( {
        status:1,
        message: err.message || "Some error occurred while creating the Service.",
      });
    });
}

// Find a single Service with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    getById (Role, id, (result) => {
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
  
    updateEntity(Role, req.body,id, (result)=>{
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
  
    Role.destroy({
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
  getByFilter(Role, req.body,(result)=>{
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });
};
  
