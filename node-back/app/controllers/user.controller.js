const db = require("../models");
const userDao = db.userDao;
const Op = db.Sequelize.Op;

// Create and Save a new Service
exports.create = (req, res) => {
  console.log('user');
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        status:2,
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Service
  const user = {
    name: req.body.name,
    email: req.body.email,
	  password: req.body.password ? req.body.password : '',
	  username: req.body.username,
	  phone: req.body.phone? req.body.phone : '',
	  address: req.body.address? req.body.address : '',
    district: req.body.district? req.body.district : '',
    upazila: req.body.upazila? req.body.upazila : '',
  };

  addEntity(userDao, user, (result) => {
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
    getByFilter(userDao, filter, (result) => {
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
  
    getById (userDao, id, (result) => {
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
  
    updateEntity(userDao, req.body,id, (result)=>{
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
	updateEntity(userDao, {status:1}, id, (result)=>{
		if (result.status == 0) {
          res.send(result);
        } else {
          res.status(500).send(result);
        }
  });

};

  
  // Find all isEnd Service
exports.findByFilter = (req, res) => {
  getByFilter(userDao, req.body,(result)=>{
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });
};
