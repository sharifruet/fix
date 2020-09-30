const db = require("../models");
const AreaHierarchy = db.areaHierarchy;
const Op = db.Sequelize.Op;

// Create and Save a new Service AreaHierarchy
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Service AreaHierarchy
  const areaHierarchy = {
    title: req.body.title,
    areaType: req.body.areaType,
    parentId: req.body.parentId,
    hierarchyPath: req.body.hierarchyPath,
    status: req.body.status,
    published: req.body.published ? req.body.published : false
  };

  // Save Service AreaHierarchy in the database
  AreaHierarchy.create(areaHierarchy)
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

// Retrieve all Service AreaHierarchy from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    AreaHierarchy.findAll({ where: condition })
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

// Find a single Service AreaHierarchy with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    AreaHierarchy.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Service area hierarchy with id=" + id
        });
      });
  };

// Update a Service AreaHierarchy by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    AreaHierarchy.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service Area Hierarchy was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Service Area Hierarchy with id=${id}. Maybe Service was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Service Area Hierarchy with id=" + id
        });
      });
  };

// Delete a Service AreaHierarchy with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    AreaHierarchy.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service Area Hierarchy was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Service Area Hierarchy with id=${id}. Maybe Service was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Service Area Hierarchy with id=" + id
        });
      });
  };

// Delete all Service from the database.
exports.deleteAll = (req, res) => {
  AreaHierarchy.destroy({
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

// Find all published Service AreaHierarchy
exports.findAllPublished = (req, res) => {
  AreaHierarchy.findAll({ where: { published: true } })
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
