const db = require("../models");
const fs = require('fs');
const FileUplaodModel = db.Fileupload;
const Op = db.Sequelize.Op;

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    const path = `./uploads/`
    fs.mkdirSync(path, { recursive: true })
    return cb(null, path)
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+'_'+file.originalname)
  }
});

var upload = multer({storage: storage}).array('mediafiles', 100);

exports.create = (req, res) => {

  upload(req, res, function(err){
    if(err instanceof multer.MulterError){
      res.status(500).send( {
        status:1,
        message: err.message || "Some error occurred while creating the Service.",
      });
    }else if(err){
      res.status(500).send( {
        status:1,
        message: err.message || "Some error occurred while creating the Service.",
      });
    }
    let uploadFiles = [];
    for(let item of req.files){
      uploadFiles.push({filename: item.originalname});

      const file = {
        name: item.filename,
        description: req.body.description ? req.body.description : '',
        originalName: item.originalname,
        type: req.body.type? req.body.type : '',
        status: req.body.status? req.body.status : 0,
      };
    
      addEntity(FileUplaodModel, file, (result) => {
        console.log(result);
        if (result.status == 0) {
          res.send(result);
        } else {
          res.status(500).send(result);
        }
      });

    }

    // res.send({
    //   progress: 100,
    //   status:0,
    //   message:'Insert successful',
    //   data:uploadFiles
    // });
    res.json({progress: 100, files: uploadFiles});
  });

}


// Retrieve all media from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  FileUplaodModel.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving media."
      });
    });
};



// Find a single media with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  getById(FileUplaodModel, id, (result) => {
    if (result.status == 0) {
      res.send(result);
    } else {
      res.status(500).send(result);
    }
  });
}

// Delete a media with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  FileUplaodModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Media was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete media with id=${id}. Maybe media was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete media with id=" + id
      });
    });
};

// Delete all media from the database.
exports.deleteAll = (req, res) => {
  FileUplaodModel.destroy({
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

// Find all published media
exports.findAllPublished = (req, res) => {
  FileUplaodModel.findAll({ where: { ispublished: true } })
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