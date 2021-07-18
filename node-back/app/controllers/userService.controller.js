const db = require("../models");
const UserServicesModel = db.UserServices;
const Op = db.Sequelize.Op;

const { QueryTypes } = require('sequelize');



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


exports.findAll = async (req, res) => {
    const data = await db.sequelize.query('select us.id as usId, us.*, ah.id as ahId, ah.title as ahTitle, ah.parentId as ahParentId, ah.hierarchyPath as ahHierarchyPath, ah.end as ahEnd, sh.id as shId, sh.* from userservices as us inner join servicehierarchies as sh on us.serviceId = sh.id inner join areahierarchies as ah on us.areaId = ah.id order by us.id desc', {
        type: QueryTypes.SELECT
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching the user services."
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



