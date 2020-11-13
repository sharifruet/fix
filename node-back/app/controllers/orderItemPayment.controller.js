const db = require("../models");
const orderItemPaymentModel = db.OrderItemPayment;
const Op = db.Sequelize.Op;

// Create and Save a new Service
exports.create = (req, res) => {
  console.log();
  // Validate request
  if (!req.body.orderItemId) {
    res.status(400).send({
      status: 1,
      message: "Order item id can not be empty!",
      data: []
    });
    return;
  }
  // Create a Service
  let orderItemPayment = {
    orderItemId: req.body.orderItemId,
    amount: req.body.amount,
	paymentStatus : req.body.paymentStatus ,
	paymentDate: req.body.paymentDate,
    returnedDate: req.body.returnedDate,
	status: req.body.status? req.body.status : 0,
  };

  addEntity(orderItemPaymentModel, orderItemPayment, (result) => {

    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }

  });
}

// Retrieve all order item payment from the database.
exports.findAll = (req, res) => {
  var condition = {};

  orderItemPaymentModel.findAll({ where: condition })

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
          err.message || "Some error occurred while retrieving Order item payment."
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

// Update order item payment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  updateEntity(orderItemPaymentModel, req.body, id, (result) => {
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });

}
// Delete order item payment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
	updateEntity(orderItemPaymentModel, {status:1}, id, (result)=>{
		if (result.status == 0) {
          res.send(result);
        } else {
          res.status(500).send(result);
        }
  });
};


// Find all isEnd Service
exports.findByFilter = (req, res) => {
  orderItemPaymentModel.findAll({ where: req.body })
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
