const db = require("../models");
const orderItemsModel = db.OrderItems;
const orderModel = db.Order;
const Op = db.Sequelize.Op;

// Create and Save a new Order Item
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.orderId) {
  //   res.status(400).send({
  //     status: 1,
  //     message: "Order Id can not be empty!",
  //     data: []
  //   });
  //   return;
  // }

    const cartData = {"userId":req.body.userId, "cartOrOrder":req.body.cartOrOrder, "paymentType":req.body.paymentType};
    getByFilter(orderModel, cartData, (result) => {
      if(result.data.length){
        addItem(result.data[0]);
      }else{
        addEntity(orderModel, cartData, (result) => {
          if (result.status == 0) {
            addItem(result.data);
          }
        });
      }
    });
  
  // Create a order items
  function addItem(result){
    if(result.cartOrOrder == true){
      let orderItems = {
        orderId: result.id,
        serviceHierarchyId: req.body.serviceHierarchyId,
        quantity: req.body.quantity,
        orderStatus: req.body.orderStatus,
        deliveryDate: req.body.deliveryDate,
        price: req.body.price,
        serviceProviderId: req.body.serviceProviderId,
        areaHierarchyId: req.body.areaHierarchyId,
        status: req.body.status ? req.body.status : 0
      };
      const itemService = {"orderId":result.id, "serviceHierarchyId":req.body.serviceHierarchyId};
      getByFilter(orderItemsModel, itemService, (result) => {
        if(result.data.length){
          const upQty = {"quantity":result.data[0].quantity+1};
          updateEntity(orderItemsModel, upQty, result.data[0].id, (result) => {
            if (result.status == 0) {
              res.send(result);
            } else {
              res.status(500).send(result);
            }
          });
        }else{
          addEntity(orderItemsModel, orderItems, (result) => {
            if (result.status == 0) {
              res.send(result);
            } else {
              res.status(500).send(result);
            }
          });
        }
      });
    }else{
      let orderItems = {
        orderId: result.id,
        deliveryDate: req.body.deliveryDate,
        serviceProviderId: req.body.serviceProviderId,
        areaHierarchyId: req.body.areaHierarchyId,
        status: req.body.status ? req.body.status : 0
      };
      updateEntity(orderItemsModel, orderItems, req.body.itemId, (result) => {
        if (result.status == 0) {
          res.send(result);
        } else {
          res.status(500).send(result);
        }
      });
    }
    
  }


  
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


// Find a single order item with an id
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

// Update a order item by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  updateEntity(orderItemsModel, req.body, id, (result) => {
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });

}

// Delete a order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  orderItemsModel.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Cart item deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete cart with id=${id}. Maybe cart was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete cart with id=" + id
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
  getByFilter(orderItemsModel, req.body, (result) => {
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });
};
