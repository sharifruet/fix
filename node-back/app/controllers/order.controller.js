const db = require("../models");
const orderModel = db.Order;
const Op = db.Sequelize.Op;

// Create and Save a new Service
exports.create = (req, res) => {
	console.log();
    // Validate request
    if (!req.body.orderNumber) {
      res.status(400).send({
			status:1,
			message: "Order number can not be empty!",
			data:[]
      });
      return;
    }
    // Create a Service
  let order = {
    orderNumber: req.body.orderNumber,
    userId: req.body.userId,
	cartOrOrder: req.body.cartOrOrder,
	orderDate: req.body.orderDate,
    paymentType: req.body.paymentType,
	status: req.body.status? req.body.status : 0
  };
  
  addEntity(orderModel, order, (result) => {
    
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }

  });

}

// Retrieve all Service from the database.
exports.findAll = (req, res) => {
  var condition = {};

  orderModel.findAll({ where: condition })
  
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

  getById(orderModel, id, (result) => {
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
  
    updateEntity(orderModel, req.body,id, (result)=>{
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
  
	updateEntity(orderModel, {status:1}, id, (result)=>{
		if (result.status == 0) {
          res.send(result);
        } else {
          res.status(500).send(result);
        }
  });
 
};


// Find all isEnd Service
exports.findByFilter = (req, res) => {
  getByFilter(orderModel, req.body,(result)=>{
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });
};
