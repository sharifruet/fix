const db = require("../models");
const orderItemPaymentModel = db.OrderItemPayment;
const Op = db.Sequelize.Op;

// Create and Save a new Service
exports.create = (req, res) => {
	console.log();
    // Validate request
    if (!req.body.orderItemId) {
      res.status(400).send({
			status:1,
			message: "Order number can not be empty!",
			data:[]
      });
      return;
    }
    // Create a Service
  let orderItemPayment = {
    orderItemId: req.body.orderItemId,
    amount: req.body.amount,
	paymentStatus : req.body.paymentStatus ,
	paymentDate: req.body.paymentDate,
    returnedDate: req.body.returnedDate
  };
  addEntity(orderItemPaymentModel, orderItemPayment, (result) => {
    
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }

  });
}

// Retrieve all Service from the database.
exports.findAll = (req, res) => {
  var condition =  {} ;

  orderItemPaymentModel.findAll({ where: condition })
  
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

  getById(orderItemPaymentModel, id, (result) => {
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
  
    updateEntity(orderItemPaymentModel, req.body,id, (result)=>{
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

  orderItemPaymentModel.destroy({
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


// Find all isEnd Service
exports.findByFilter = (req, res) => {
  orderItemPaymentModel.findAll({ where: req.body })
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
