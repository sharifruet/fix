const db = require("../models");
const UserServicesModel = db.UserServices;
const Op = db.Sequelize.Op;


// Create and Save a new user service
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a user service
    let userService = {
        userId: req.body.userId,
        serviceId: req.body.serviceId,
        areaId: req.body.areaId
    };

    UserServicesModel.create(userService)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user services."
            });
        });
};


exports.findAll = (req, res) => {
    var condition = {};

    UserServicesModel.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sliders."
            });
        });
}


// Delete a user service with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    UserServicesModel.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "User service was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete user service with id=${id}. Maybe user service was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete slider with id=" + id
        });
    });
};



