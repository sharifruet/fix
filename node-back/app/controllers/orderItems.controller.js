const db = require("../models");
const orderItemsModel = db.OrderItems;
const Op = db.Sequelize.Op;

// Create and Save a new Order Item
exports.create = (req, res) => {
  console.log();
  // Validate request
  if (!req.body.orderId) {
    res.status(400).send({
      status: 1,
      message: "Order Item number can not be empty!",
      data: []
    });
    return;
  }
  // Create a Service
  let orderItems = {
    orderId: req.body.orderId,
    serviceHierarchyId: req.body.serviceHierarchyId,
    quantity: req.body.quantity,
    orderStatus: req.body.orderStatus,
    deliveryDate: req.body.deliveryDate,
    price: req.body.price,
    serviceProviderId: req.body.serviceProviderId,
    areaHierarchyId: req.body.areaHierarchyId,
  };
  addEntity(orderItemsModel, orderItems, (result) => {

    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }

  });
}

// Retrieve all Order Item from the database.
exports.findAll = (req, res) => {
  var condition = {};
  orderItemsModel.findAll({ where: condition })
    .then(data => {
      res.send({
        status: 0,
        message: 'Fetch successful',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order Item."
      });
    });

};



// Find a single Service with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  getById(orderItemsModel, id, (result) => {
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

  orderItemsModel.update(req.body, {
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

  orderItemsModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order Item was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Order Item with id=${id}. Maybe Service was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Order Item with id=" + id
      });
    });
};

// Delete all Service from the database.
exports.deleteAll = (req, res) => {
  const id = req.params.id;

  orderItemsModel.destroy({
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

// Find all published Service
exports.findAllPublished = (req, res) => {
  orderItemsModel.findAll({ where: { ispublished: true } })
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
  orderItemsModel.findAll({ where: req.body })
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
