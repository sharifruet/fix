const db = require("../models");
const ServiceSubCategory = db.serviceSubCategory;
const Op = db.Sequelize.Op;

// Create and Save a new Service sub-category
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Service sub-category
  const serviceSubCategory = {
    title: req.body.title,
    icon: req.body.icon,
    description: req.body.description,
    serviceOverview: req.body.serviceOverview,
    faq: req.body.faq,
    details: req.body.details,
    published: req.body.published ? req.body.published : false
  };

  // Save Service sub-category in the database
  ServiceSubCategory.create(serviceSubCategory)
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

// Retrieve all Service sub-category from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    ServiceSubCategory.findAll({ where: condition })
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

// Find a single Service sub-category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ServiceSubCategory.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Service sub category with id=" + id
        });
      });
  };

// Update a Service sub-category by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    ServiceSubCategory.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service sub category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Service sub category with id=${id}. Maybe Service was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Service sub category with id=" + id
        });
      });
  };

// Delete a Service sub-category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ServiceSubCategory.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service sub category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Service sub category with id=${id}. Maybe Service was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Service sub category with id=" + id
        });
      });
  };

// Delete all Service from the database.
exports.deleteAll = (req, res) => {
  ServiceSubCategory.destroy({
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

// Find all published Service sub-category
exports.findAllPublished = (req, res) => {
  ServiceSubCategory.findAll({ where: { published: true } })
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
