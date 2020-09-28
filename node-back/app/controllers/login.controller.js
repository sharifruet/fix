const db = require("../models");
const jwt = require("jsonwebtoken");
const userDao = db.userDao;
const Op = db.Sequelize.Op;

// Create and Save a new Service
exports.login = (req, res) => {
	
    // Validate request
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
		  code: ERR001,
		  message: "Content can not be empty!"
      });
      return;
    }
    // Create a Service
  const username = req.body.username;
  const password = req.body.password;
  const user = {name:username};
  
  userDao.findAll({ where: {username} })
      .then(data => {
        console.log(data);
		const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
		res.json({accessToken:accessToken});
		//res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Service."
        });
      });
};

exports.authenticateToken = (req,res, next) =>{
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if(token == null) return res.sendStatus(401);
	
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
		if(err) return res.sendStatus(401);
		req.user = user;
		next();
	});
};


exports.posts = (req, res) =>{
	res.json(req.user);
};