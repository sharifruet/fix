const db = require("../models");
const ServiceHierarchy = db.serviceHierarchy;
const Op = db.Sequelize.Op;

// Create and Save a new Service
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Service
  const serviceHierarchy = {
    title: req.body.title,
    description: req.body.description,
	ispublished: req.body.ispublished ? req.body.ispublished : false,
	hierarchyPath: req.body.hierarchyPath? req.body.isEnd : false,
	isServiceLayer: req.body.isServiceLayer? req.body.isEnd : false,
	 isEnd: req.body.isEnd? req.body.isEnd : false,
	  Status: req.body.Status? req.body.Status : false
	
  };

  // Save Service in the database
  ServiceHierarchy.create(serviceHierarchy)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Service."
      });
    });
};

// Retrieve all Service from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    ServiceHierarchy.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Service."
        });
      });
  };

// Find a single Service with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ServiceHierarchy.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Service with id=" + id
        });
      });
  };

// Update a Service by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    ServiceHierarchy.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Service with id=" + id
        });
      });
  };

// Delete a Service with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ServiceHierarchy.destroy({
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

// Delete all Service from the database.
exports.deleteAll = (req, res) => {
  ServiceHierarchy.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

// Find all published Service
exports.findAllPublished = (req, res) => {
  ServiceHierarchy.findAll({ where: { ispublished: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  
  // Find all isEnd Service
exports.findAllisEnd = (req, res) => {
  ServiceHierarchy.findAll({ where: { isEnd: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  

  

