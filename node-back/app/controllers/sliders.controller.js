const db = require("../models");
const SlidersModel = db.Sliders;
const Op = db.Sequelize.Op;


// Create and Save a new slider
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Slider
    let slider = {
        title: req.body.title,
        photo: req.body.photo,
        published: req.body.published ? req.body.published : false,
    };

    SlidersModel.create(slider)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the slider."
            });
        });
};

// Retrieve all slider from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    SlidersModel.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sliders."
            });
        });
};



// Find a single Service with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    getById(SlidersModel, id, (result) => {
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

    SlidersModel.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Slider was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update slider with id=${id}. Maybe slider was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating slider with id=" + id
            });
        });
};

// Delete a slider with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    SlidersModel.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Slider was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete slider with id=${id}. Maybe slider was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete slider with id=" + id
            });
        });
};

// Delete all slider from the database.
exports.deleteAll = (req, res) => {
    SlidersModel.destroy({
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

// Find all published slider
exports.findAllPublished = (req, res) => {
    SlidersModel.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sliders."
            });
        });
};


