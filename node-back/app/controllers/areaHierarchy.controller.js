const db = require("../models");
const AreaHierarchy = db.AreaHierarchy;
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
  let areaHierarchy = {
    title: req.body.title,
    areaType: req.body.areaType,
    published: req.body.published ? req.body.published : false,
    hierarchyPath: req.body.hierarchyPath ? req.body.hierarchyPath : false,
    parentId: req.body.parentId ? req.body.parentId : -1,
    end: req.body.end ? req.body.end : false,
    status: req.body.status ? req.body.status : false

  };



  addEntity(AreaHierarchy, areaHierarchy, (result) => {

    if (result.status == 0) {
      areaHierarchy = result.data;
      //console.log(serviceHierarchy);
      getById(AreaHierarchy, areaHierarchy.parentId, (parent) => {
        console.log("--parent--");
        console.log(parent);

        console.log("==parent==");
        let hierarchyPath = '';
        if (parent.status == 0 && parent.data != null) {
          hierarchyPath = parent.data.hierarchyPath + '-' + areaHierarchy.id + '-';
        } else {
          hierarchyPath = '-' + areaHierarchy.id + '-';
        }
        updateEntity(AreaHierarchy, { hierarchyPath: hierarchyPath }, areaHierarchy.id, (result) => {
          if (result.status == 0) {
            res.send(result);
          } else {
            res.status(500).send(result);
          }
        });
      });
    } else {
      res.status(500).send(result);
    }

  });
};

// Retrieve all Service from the database.
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



// Find a single Service with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  getById(AreaHierarchy, id, (result) => {
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

  AreaHierarchy.update(req.body, {
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

  AreaHierarchy.destroy({
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

// Find all published Service
exports.findAllPublished = (req, res) => {
  AreaHierarchy.findAll({ where: { ispublished: true } })
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
exports.findByFilter = (req, res) => {
  AreaHierarchy.findAll({ where: req.body })
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


