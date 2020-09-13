const db = require("../models");
const ServiceCategory = db.serviceCategory;
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
    // Create a Service category
  const serviceCategory = {
    title: req.body.title,
    icon: req.body.icon,
    published: req.body.published ? req.body.published : false
  };

  // Save Service category in the database
  ServiceCategory.create(serviceCategory)
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

// Retrieve all Service category from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    ServiceCategory.findAll({ where: condition })
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
  
    ServiceCategory.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Service category with id=" + id
        });
      });
  };

// Update a Service category by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    ServiceCategory.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service category was updated successfully."
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

// Delete a Service category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ServiceCategory.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Service category with id=${id}. Maybe Service catyegory was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Service category with id=" + id
        });
      });
  };

// Delete all Service from the database.
exports.deleteAll = (req, res) => {
  ServiceCategory.destroy({
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
  ServiceCategory.findAll({ where: { published: true } })
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
