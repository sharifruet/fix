const db = require("../models");
const userModel = db.User;
const roleModel = db.Role;
const Op = db.Sequelize.Op;


// Create and Save a new user
exports.create = (req, res) => {
  console.log('user');
  // Validate request
  if (!req.body.phone) {
    res.status(400).send({
      status: 2,
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a user
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password ? req.body.password : '',
    username: req.body.username,
    phone: req.body.phone ? req.body.phone : '',
    otp: req.body.otp ? req.body.otp : '',
    address: req.body.address ? req.body.address : '',
    district: req.body.district ? req.body.district : -1,
    upazila: req.body.upazila ? req.body.upazila : -1,
    status: req.body.status ? req.body.status : 0
  };

  const roles = req.body.roles ? req.body.roles : [];

  addEntity(userModel, user, (result) => {
    if (result.status == 0) {
      userObj = result.data;
      rolesJSON = JSON.parse(roles);
      rolesJSON.forEach(role => {
        userObj.addRole(role.id);
      });
      res.send(userObj);
    } else {
      res.status(500).send(result);
    }

  });
}

// Retrieve all user from the database.
exports.findAll = (req, res) => {
  const filter = {};
  userModel.findAll({ include: roleModel, where: filter })
    .then(data => {
      res.send({
        status: 0,
        message: 'Fetch successful',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        status: 1,
        message: err.message || "Some error occurred while creating the Service.",
      });
    });
}

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  userModel.findByPk(id, { include: roleModel })
    .then(data => {
      res.send({
        status: 0,
        message: "Fetch successfully",
        data: data
      });
    })
    .catch(err => {
      res.send({
        status: 1,
        message: err.message || "Some error occurred while creating the Service.",
      });
    });
}

// Update a user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  updateEntity(userModel, req.body, id, (result) => {
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });

}

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  userModel.destroy({
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


// filder a user
exports.findByFilter = (req, res) => {

  userModel.findAll({ include: roleModel, where: req.body })
    .then(data => {
      res.send({
        status: 0,
        message: 'Fetch successful',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        status: 1,
        message: err.message || "Some error occurred while creating the Service.",
      });
    });
};
