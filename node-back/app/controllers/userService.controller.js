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
    const data = db.sequelize.query('SELECT * FROM userservices', {
        type: db.Sequelize.SELECT
    });

    return res.status(200).json(data)
}




