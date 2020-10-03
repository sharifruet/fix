const db = require("../models");
const ServiceHierarchy = db.serviceHierarchy;
const Op = db.Sequelize.Op;

addEntity = (entity, cb) => {
  ServiceHierarchy.create(entity)
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
  ServiceHierarchy.update(entity, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        cb({
          status:0,
          message: "Added successfully",
          data: []
        });
      } else {
        cb({
          status:1,
          message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
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
    ServiceHierarchy.findByPk(id)
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
// Create and Save a new Service
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        status:2,
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Service
  serviceHierarchy = {
    title: req.body.title,
    description: req.body.description,
	  isPublished: req.body.isPublished ? req.body.isPublished : true,
	  parentId: req.body.parentId? req.body.parentId : -1,
	  isServiceLayer: req.body.isServiceLayer? req.body.isServiceLayer : false,
	  isEnd: req.body.isEnd? req.body.isEnd : false,
	  status: req.body.status? req.body.status : false
	
  };

  addEntity(serviceHierarchy, (result) => {
    if (result.status == 0) {
      serviceHierarchy = result.data;
      getById(serviceHierarchy.parentId, (parent)=>{
        console.log("--parent--");
        console.log(parent);
        
        console.log("==parent==");
        let hierarchyPath = '';
        if(parent.status == 0 && parent.data !=null){
          hierarchyPath = parent.data.hierarchyPath + '-' + serviceHierarchy.id + '-';
        } else{
          hierarchyPath = '-' + serviceHierarchy.id + '-';
        }
        updateEntity({hierarchyPath:hierarchyPath}, serviceHierarchy.id, (result)=>{
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
exports.findByFilter = (req, res) => {
  ServiceHierarchy.findAll({ where: req.body })
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
  

  

