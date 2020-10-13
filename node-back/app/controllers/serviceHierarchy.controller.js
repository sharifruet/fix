const db = require("../models");
const serviceHierarchyDao = db.serviceHierarchyDao;
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
  let serviceHierarchy = {
   title: req.body.title,
    description: req.body.description,
	published: req.body.published ? req.body.published : false,
	hierarchyPath: req.body.hierarchyPath? req.body.hierarchyPath : false,
	  parentId: req.body.parentId? req.body.parentId : -1,
	  serviceLayer: req.body.serviceLayer? req.body.serviceLayer : false,
	  end: req.body.end? req.body.end : false,
	  status: req.body.status? req.body.status : false
	
  };
  


  addEntity(serviceHierarchyDao, serviceHierarchy, (result) => {
	  
    if (result.status == 0) {
      serviceHierarchy = result.data;
	  //console.log(serviceHierarchy);
      getById(serviceHierarchyDao, serviceHierarchy.parentId, (parent)=>{
        console.log("--parent--");
        console.log(parent);
        
        console.log("==parent==");
        let hierarchyPath = '';
        if(parent.status == 0 && parent.data !=null){
          hierarchyPath = parent.data.hierarchyPath + '-' + serviceHierarchy.id + '-';
        } else{
          hierarchyPath = '-' + serviceHierarchy.id + '-';
        }
        updateEntity(serviceHierarchyDao, {hierarchyPath:hierarchyPath}, serviceHierarchy.id, (result)=>{
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

    serviceHierarchyDao.findAll({ where: condition })
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
  
    getById (serviceHierarchyDao, id, (result) => {
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
  
    serviceHierarchyDao.update(req.body, {
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
  
    serviceHierarchyDao.destroy({
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
  serviceHierarchyDao.destroy({
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
/*exports.findAllPublished = (req, res) => {
  serviceHierarchyDao.findAll({ where: { ispublished: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };*/
  
  // Find all isEnd Service
exports.findByFilter = (req, res) => {
  serviceHierarchyDao.findAll({ where: req.body })
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

  

