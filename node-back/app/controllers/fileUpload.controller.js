
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+'_'+file.originalname)
  }
});

var upload = multer({storage: storage}).array('mediafiles', 100);

exports.create = (req, res) => {
  upload(req, res, function(err){
    if(err instanceof multer.MulterError){
      return res.status(500).json(err);
    }else if(err){
      return res.status(500).json(err);
    }
    let uploadFiles = [];
    for(let item of req.files){
      uploadFiles.push({filename: item.originalname})
    }

    res.json({progress: 100, files: uploadFiles});

  })
}