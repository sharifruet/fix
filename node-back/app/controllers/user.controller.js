const db = require("../models");
const userDao = db.userDao;
const Op = db.Sequelize.Op;

addEntity = (entity, cb) => {
  userDao.create(entity)
    .then(data => {
      cb({
        status:0,
        message: "Added successfully",
        data: data
      });
      //res.send(data);
    })
    .catch(err => {
      console.log('ERROR @ INSERT');
      cb({
        status:1,
        message: err.message || "Some error occurred while creating the Service.",
      });
    });
}

updateEntity = (entity, id, cb) => {
  userDao.update(entity, {
    where: { id: id }
  })
    .then(num => {
      if (num >= 1) {
        cb({
          status:0,
          message: "Updated successfully",
          data: []
        });
      } else {
        cb({
          status:1,
          message: `Cannot update Service with id=${id}!`
        });
      }
    })
    .catch(err => {
      cb( {
        status:1,
        message: err.message || "Some error occurred while creating the Service.",
      });
    });
}

getById = (id, cb) => {
  userDao.findByPk(id)
      .then(data => {
        cb( {
          status:0,
          message: "Fetch successfully",
          data: data
        });
      })
      .catch(err => {
        cb( {
          status:1,
          message: err.message || "Some error occurred while creating the Service.",
        });
      });
}

getByFilter = (filter, cb) => {
  userDao.findAll({ where: filter })
      .then(data => {
        cb({
          status:0,
          message:'Fetch successful',
          data:data});
      })
      .catch(err => {
        cb( {
          status:1,
          message: err.message || "Some error occurred while creating the Service.",
        });
      });
}
// Create and Save a new Service
exports.create = (req, res) => {
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

  addEntity(user, (result) => {
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
    getByFilter(filter, (result) => {
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
  
    getById (id, (result) => {
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
  
    updateEntity(req.body,id, (result)=>{
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
	updateEntity({status:1}, id, (result)=>{
		if (result.status == 0) {
          res.send(result);
        } else {
          res.status(500).send(result);
        }
  });

};

  
  // Find all isEnd Service
exports.findByFilter = (req, res) => {
  getByFilter(req.body,(result)=>{
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });
};
